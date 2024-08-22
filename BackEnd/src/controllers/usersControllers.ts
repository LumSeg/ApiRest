import { Response, Request } from "express";
import IUser from "../interfaces/IUser";
import { createUserServices, findUsercredentialsId, getUsersServices, idUserServices } from "../services/userServices";
import ICreateUserDto from "../dto/CreateUser.Dto";
import CredentialsDto from "../dto/Credentials.Dto";
import ICredentials from "../interfaces/ICredentials";
import { validateCredentials } from "../services/credentialsServices";
import { User } from "../entities/User";
import { Credentials } from "../entities/Credentials";

export const createUserControllers = async (req: Request<{}, {}, ICreateUserDto>, res: Response) => {
    const { name, email, birthdate, nDni, username, password } = req.body;
    
    try {
        const newUser: User = await createUserServices({ name, email, birthdate, nDni, username, password });
        res.status(201).json({ message: "Usuario registrado correctamente"});        
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export const getUsersControllers = async (req: Request, res: Response): Promise<void> => {
    
    try {
        const users: User[] = await getUsersServices();
        res.status(200).json(users)  
    } catch (error: any) {
        res.status(404).json({ message: error.message});
    }
};

export const idUserControllers = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    try {
        const user = await idUserServices(Number(id));
        res.status(200).json(user);       
    } catch (error: any) {
        res.status(404).json({ message: error.message});
    }
};

export const loginUserControllers = async (req: Request<{}, {}, CredentialsDto>, res: Response) => {
    const { username, password } = req.body;

    try {
        const credentials: Credentials = await validateCredentials({
            username,
            password
        });
        
        const user = await findUsercredentialsId(credentials.id);
        
        res.status(200).json({
            login: true,
            user,
        })
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};








