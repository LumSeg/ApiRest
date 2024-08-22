import { AppDataSource } from "../config/data-source";
import { Appointments } from "../entities/Appointments";
import { Credentials } from "../entities/Credentials";
import { User } from "../entities/User";

export const credentialRepository = AppDataSource.getRepository(Credentials);
export const userRepository = AppDataSource.getRepository(User);
export const appointmentsRepository = AppDataSource.getRepository(Appointments);