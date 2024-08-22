import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./env";
import { User } from "../entities/User";
import { Credentials } from "../entities/Credentials";
import { Appointments } from "../entities/Appointments";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    dropSchema: false,
    logging: false,
    entities: [User, Credentials, Appointments],
    subscribers: [],
    migrations: [],
})

export const UserModel = AppDataSource.getRepository(User);
export const CredentialsModel = AppDataSource.getRepository(Credentials);
export const AppointmentsModel = AppDataSource.getRepository(Appointments);
