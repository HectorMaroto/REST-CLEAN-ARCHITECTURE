import { JwtAdapter } from "../../../config";
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


interface RegisterUserUseCase{
    execute(registerUserDTO: RegisterUserDTO): Promise<UserToken>
}


export class RegisterUser implements RegisterUserUseCase{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken // Valor de funcion por defecto
    ) {
        
    }

    async execute(registerUserDTO: RegisterUserDTO): Promise<UserToken> {
        // Crear usuario
        const user = await this.authRepository.register(registerUserDTO)
        // Firmar Token
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