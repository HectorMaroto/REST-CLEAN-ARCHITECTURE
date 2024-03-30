import { LoginUserDTO } from "../";
import { RegisterUserDTO } from "../";
import { UserEntity } from "../entities/user.entity";


// Creamos la clase abstracta porque no queremos crear instancias de ésta
// Solo definir reglas de negocio
export abstract class AuthDatasource{
    
    abstract login(loginUserDto: LoginUserDTO): Promise<UserEntity>

    // Va a devolver una instancia de la clase UserEntity
    abstract register(registerUserDTO: RegisterUserDTO): Promise<UserEntity>


}