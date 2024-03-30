import { NextFunction, Response, Request } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

export class AuthMiddleware {
  static validateJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header("Authorization");

    if (!authorization)
      return res.status(401).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer"))
      return res.status(401).json({ error: "Invalid Bearer Token" });

    const token = authorization.split(" ").at(1) || "";

    try {
        const payload = await JwtAdapter.validateToken<{ id: string }>(token);

        if (!payload) return res.status(401).json({ error: "Invalid token" });

        const user = await UserModel.findById(payload.id); // Obtenemos el usuario a través del id del token decodificado asignado a un usuario

        // Debería ser un error 500: este caso de error sería por si el backend firma un jwt de un usuario anteriormente existente
        // Pero que fue eliminado y por eso no se encontró o cambió el id
        if (!user) return res.status(500).json({ error: 'Invalid token - user not found' })

        req.body.user = user;
      
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
  };
}
