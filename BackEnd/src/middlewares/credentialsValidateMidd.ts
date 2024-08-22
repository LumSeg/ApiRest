import { Request, Response, NextFunction } from "express";
import CredentialsDto from "../dto/Credentials.Dto";

const credentialsValidate = (req: Request<{}, {}, CredentialsDto>, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
        // Validacion de username
        if (!username) throw new Error("El nombre de usuario es requerido");
        if (typeof username !== "string") throw new Error("El nombre de usuario debe ser un string");
        if (username.length < 3) throw new Error("El nombre de usuario debe tener al menos tres caracteres");
        if (username.length > 50) throw new Error("El nombre de usuario no debe exceder los 50 caracteres");
        if (/[^a-zA-Z0-9_]/.test(username)) throw new Error("El nombre de usuario solo debe contener letras, números y guiones bajos");

        // Validacion de password
        if (!password) throw new Error("La contraseña es requerida");
        if (typeof password !== "string") throw new Error("La contraseña debe ser un string");
        if (password.length < 6) throw new Error("La contraseña debe tener al menos seis caracteres");
        if (password.length > 128) throw new Error("La contraseña no debe exceder los 128 caracteres");

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
    next();
};

export default credentialsValidate;