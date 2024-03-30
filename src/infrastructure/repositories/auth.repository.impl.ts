import { AuthDatasource, AuthRepository, LoginUserDTO, RegisterUserDTO, UserEntity } from "../../domain";


export class AuthRepositoryImpl implements AuthRepository{

    constructor(
        private readonly authDatasource: AuthDatasource
    ){}
    login(loginUserDto: LoginUserDTO): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto)
    }

    register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDTO)
    }
    
}