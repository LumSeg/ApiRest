import { Request, Response, NextFunction } from "express";
import ICreateUserDto from "../dto/CreateUser.Dto";

const userValidate = (req: Request<{}, {}, ICreateUserDto>, res: Response, next: NextFunction) => {
    const { name, email, birthdate, nDni, username, password } = req.body;

    try {
        // Validacion de name
        if (!name) throw new Error("El nombre es requerido");
        if (typeof name !== "string") throw new Error("El nombre debe ser un string");
        if (name.length < 3) throw new Error("El nombre debe tener al menos tres caracteres");
        if (name.length > 58) throw new Error("El nombre no debe exceder los 58 caracteres");
        if (/[^a-zA-Z\s]/.test(name)) throw new Error("El nombre solo debe contener letras y espacios");

        // Validacion de email
        if (!email) throw new Error("El correo electrónico es requerido");
        if (typeof email !== "string") throw new Error("El correo electrónico debe ser un string");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) throw new Error("El formato del correo electrónico es inválido");
        if (email.length > 100) throw new Error("El correo electrónico no debe exceder los 100 caracteres");

        // Validacion de birthdate
        if (!birthdate) throw new Error("La fecha de nacimiento es requerida");
        const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/; // Formato: YYYY-MM-DD
        if (!birthdateRegex.test(birthdate)) throw new Error("El formato de la fecha de nacimiento es inválido");
        const birthDate = new Date(birthdate);
        const today = new Date();
        if (birthDate > today) throw new Error("La fecha de nacimiento no puede ser futura");
        if (today.getFullYear() - birthDate.getFullYear() < 18) throw new Error("Debe ser mayor de 18 años");

        // Validacion de nDni
        if (nDni === undefined || nDni === null) throw new Error("El número de DNI es requerido");
        if (typeof nDni !== "number") throw new Error("El número de DNI debe ser un número");
        if (!Number.isInteger(nDni)) throw new Error("El número de DNI debe ser un número entero");
        if (nDni.toString().length !== 8) throw new Error("El número de DNI debe tener exactamente 8 dígitos");

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

export default userValidate;
