// ../services/appointmentsServices.ts

import IAppointmentDto, { AppoinmentStatus } from "../dto/Appointments.Dto";
import IAppointment from "../interfaces/IAppointments";
import { idUserServices } from './userServices';
import { Appointments } from '../entities/Appointments';
import IUser from "../interfaces/IUser";
import { appointmentsRepository, userRepository } from "../repositorys/indexrepository";


export const createAppointmentServices = async (dataAppointment: IAppointmentDto) => {
    const { date, time, status, description, user_id } = dataAppointment;
    const user = await userRepository.findOne({ where: { id: user_id } });
    if(!user) throw Error("Usuario con ID inexistente");

     // Verificar si ya existe una cita con la misma fecha y hora para el mismo usuario
     const existingAppointment = await appointmentsRepository.findOne({
        where: { date, time, user: { id: user_id } },
    });

    if (existingAppointment) {
        throw new Error("Ya tienes una cita programada en esta fecha y hora.");
    }

    const newAppointment: Appointments = appointmentsRepository.create({
        date,
        time,
        status,
        description,
    }); 
    newAppointment.user = user; 
    await appointmentsRepository.save(newAppointment)
    return newAppointment;

};

export const getAppointmentsServices = async (): Promise<Appointments[]> => {
    const allAppointments: Appointments[] | undefined = await appointmentsRepository.find();
    return allAppointments;

};

export const getAppointmentByIdServices = async (id: number): Promise<Appointments> => {
    const appointmentsId: Appointments | null = await appointmentsRepository.findOne({
        where: { id },
    })
    if(!appointmentsId) throw Error("Usuario no identificado"); 
    return appointmentsId;
};

export const cancelAppointmentServices = async (id: number): Promise<void> => {

    const appointment: Appointments | null = await appointmentsRepository.findOneBy({
        id,
    });

    // Verificar si la cita existe
    if (!appointment) throw Error("La cita no existe");

    appointment.status = AppoinmentStatus.CANCELLED;
    await appointmentsRepository.save(appointment);
    return;
};



