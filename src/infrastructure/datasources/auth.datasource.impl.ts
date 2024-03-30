import { UserMapper } from "..";
import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDTO, UserEntity } from "../../domain";
import { LoginUserDTO } from "../../domain/dtos/auth/login-user.dto";


type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


export class AuthDatasourceImpl implements AuthDatasource{

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) {
        
    }

    async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
        
        const { name, email, password } = registerUserDTO;

        try {

            // 1. Verificar si el correo existe
            const exists = await UserModel.findOne({ email: email })
            
            if (exists) throw CustomError.badRequest('User already exists')

            // 2. Hash de contraseña
            const user = await UserModel.create({
                name: name, 
                email: email,
                password: this.hashPassword(password)
            })
            await user.save()

            // 3. Mapear la respuesta a nuestra entidad

            return UserMapper.userEntityFromObject(user)
            
        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }
            throw CustomError.internalServer();
        }

    }

    async login(loginUserDTO: LoginUserDTO): Promise<UserEntity>{
        const { email, password } = loginUserDTO;

        try {

            const user = await UserModel.findOne({ email });
            if (!user) throw CustomError.badRequest('User does not exist - email')
            
            const isMatching = this.comparePassword(password, user.password);
            if (!isMatching) throw CustomError.badRequest('Password is not valid')
            
            return UserMapper.userEntityFromObject(user)
            
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer()
        }
        
    }
    
}