import { Request, Response } from "express";
import { AuthRepository, CustomError, LoginUser, LoginUserDTO, RegisterUser, RegisterUserDTO } from "../../domain";
import { UserModel } from "../../data/mongodb";

export class AuthController{

    // Inyeccion de dependencias
    constructor(
        private readonly authRepository: AuthRepository
    ) {
        
    }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'})
    }


    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDTO] = RegisterUserDTO.create(req.body)

        if (error) return res.status(400).json({ error })

        new RegisterUser(this.authRepository)
            .execute(registerUserDTO!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDTO] = LoginUserDTO.create(req.body)

        if (error) return res.status(400).json({ error })

        new LoginUser(this.authRepository)
            .execute(loginUserDTO!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find()
            .then(users => res.json({
                users,
                token: req.body.user
            }))
            .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
    }
}