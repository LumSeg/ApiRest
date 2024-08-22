import { Response, Request } from "express";
import IAppointmentDto from "../dto/Appointments.Dto";
import IAppointment from "../interfaces/IAppointments";
import { cancelAppointmentServices, createAppointmentServices, getAppointmentByIdServices, getAppointmentsServices } from "../services/appointmentsServices";
import { Appointments } from "../entities/Appointments";


export const getAppointmentsControllers = async (req: Request, res: Response) => {   
    try {
        const newAppointment: Appointments[] = await getAppointmentsServices();
        res.status(200).json(newAppointment);       
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
    
export const createAppointmentControllers = async (req: Request<{}, {}, IAppointmentDto>, res: Response) => {
    const { date, time, status, description, user_id } = req.body;

    try {
        const newAppointments: Appointments = await createAppointmentServices({date, time, status, description, user_id});
        res.status(201).json({ message: "Cita creada correctamente" });
    } catch (error: any) {
        res.status(400).json({ menssage: error.message });
    }
};

export const getAppointmentByIdControllers = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    
    try {
        const idAppointment = await getAppointmentByIdServices(Number(id));
        res.status(200).json(idAppointment);
    } catch (error: any) {
        res.status(404).json({ menssage: "Usuario no encontrado" });
    }
};

export const cancelAppointmentControllers = async (req: Request<{ id: string }, {}, {}>, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const cancelledAppointment = await cancelAppointmentServices(Number(id));
        res.status(200).json({ menssage: "Cita cancelada" });
    } catch (error: any) {
        res.status(404).json({ menssage: error.message });
    }
};
 



