import CredentialsDto from "../dto/Credentials.Dto";
import { Credentials } from "../entities/Credentials";
import ICredentials from "../interfaces/ICredentials";
import { credentialRepository } from "../repositorys/indexrepository";
import { getAppointmentByIdServices } from "./appointmentsServices";


export const createcredentials = async (datacredentials: CredentialsDto): Promise<ICredentials> => {
    const { username, password } = datacredentials;

    const credentiansValidate: Credentials | null = await credentialRepository.findOneBy({ username }); 
    if (credentiansValidate) throw  Error("Credenciales existentes. Elige otras credenciales");

    const newCredentials: Credentials = credentialRepository.create({
        username,
        password,
    });
    await credentialRepository.save(newCredentials);
    return newCredentials;
};

export const validateCredentials = async (dataValidateCredentialsDto: CredentialsDto): Promise<Credentials> => {
    const { username, password } = dataValidateCredentialsDto;

    const foundCredentials: Credentials | null = await credentialRepository.findOneBy({ username });
   
    if(!foundCredentials) throw Error("No existen las credenciales del usuario");
    
    if(password != foundCredentials.password) throw Error("Credenciales incorrectas")
    
    return foundCredentials;
};







