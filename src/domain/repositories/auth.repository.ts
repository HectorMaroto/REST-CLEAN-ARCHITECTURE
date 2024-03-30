import { LoginUserDTO } from "../dtos/auth/login-user.dto";
import { RegisterUserDTO } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";


// Creamos la clase abstracta porque no queremos crear instancias de ésta
// Solo definir reglas de negocio
export abstract class AuthRepository{
    
    abstract login(loginUserDto: LoginUserDTO): Promise<UserEntity>

    // Va a devolver una instancia de la clase UserEntity
    abstract register(registerUserDTO: RegisterUserDTO): Promise<UserEntity>


}

// Nos permitirá modificar el datasource 1, 2, 3... sin tener que hacer cambios en BBDD o en los casos de uso
// new AuthRepository(datasource)