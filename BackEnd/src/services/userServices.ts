// ../services/userServices.ts

import ICreateUserDto from "../dto/CreateUser.Dto";
import IUser from "../interfaces/IUser";
import { createcredentials, validateCredentials} from "./credentialsServices";
import CredentialsDto from "../dto/Credentials.Dto";
import { User } from "../entities/User";
import ICredentials from "../interfaces/ICredentials";
import { Credentials } from "../entities/Credentials";
import IAppointment from "../interfaces/IAppointments";
import { Appointments } from "../entities/Appointments";
import { getAppointmentByIdServices } from "./appointmentsServices";
import { credentialRepository, userRepository } from "../repositorys/indexrepository";


export const createUserServices = async (userData: ICreateUserDto) => {
    const { name, email, birthdate, nDni, username, password } = userData;
    const userValidate = await userRepository.findOneBy({ email });
    if(userValidate) throw Error(`El Usuario ya esta registrado con el email ${email}`);

    const newCredentials: Credentials = await createcredentials({
        username,
        password
    });
    const newUser: User = userRepository.create({
        name,
        email,
        birthdate,
        nDni
    })
    newUser.credential = newCredentials;
    await userRepository.save(newUser);
    
    return newUser;
};

export const getUsersServices = async (): Promise<User[]> => { 
    const allUsers: User[] | undefined = await userRepository.find({
        relations: ["appointments"],
    });
    return allUsers;
};

export const idUserServices = async (id: number): Promise<User> => {
    const userId: User | null = await userRepository.findOne({
        where: {id},
        relations: ["appointments"],
    });
    if(!userId) throw Error("Usuario no encontrado");
    
    return userId;
};

export const findUsercredentialsId = async (credentialsId: number): Promise<User> => {
    const user: User | null = await userRepository.findOneBy({
        credential: {id: credentialsId},
    })
    if(!user) throw new Error(`Usuario no encontrado. No se encontraron las Credenciales ${credentialsId}`);
    return user;
}