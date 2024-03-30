import { JwtAdapter } from "../../../config";
import { LoginUserDTO } from "../../dtos/auth/login-user.dto";
import { RegisterUserDTO } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken{
    token: string;
    user: {
        id: string;
        name: string;
        email: string
    }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>


interface LoginUserUseCase{
    execute(loginUserDTO: LoginUserDTO): Promise<UserToken>
}


export class LoginUser implements LoginUserUseCase{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken // Valor de funcion por defecto
    ) {
        
    }

    async execute(loginUserDTO: LoginUserDTO): Promise<UserToken> {
        // Crear usuario
        const user = await this.authRepository.login(loginUserDTO)
        // Token
        const token = await this.signToken({ id: user.id }, '2h')

        if (!token) throw CustomError.internalServer('Error generating token')

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }

        
    }
    
}