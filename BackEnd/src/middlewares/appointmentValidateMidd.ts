import { Request, Response, NextFunction } from "express";
import IAppointmentDto from "../dto/Appointments.Dto";
import moment from "moment";
import { appointmentsRepository } from "../repositorys/indexrepository";

const appointmentValidate = (req: Request<{}, {}, IAppointmentDto>, res: Response, next: NextFunction) => {
    const { date, time, description } = req.body;

    try {
        if(!date) throw new Error("El dia es requerido");
        const appointmentDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const in14Days = new Date(today);
        in14Days.setDate(in14Days.getDate() + 14);

        if(appointmentDate < tomorrow || appointmentDate > in14Days) {
            throw new Error("La fecha debe estar entre mañana y dentro de 14 días");
        }
        
        // Función para ajustar la fecha al horario de Argentina (UTC-3)
        function ajustarFechaArgentina(fecha: Date): Date {
            // Calcular la diferencia de horas con UTC (JavaScript Date se basa en UTC)
            const diferenciaUtcArgentina = -3; // UTC-3 para Argentina
            const fechaUtc = fecha.getTime() + (fecha.getTimezoneOffset() * 60000); // Fecha ajustada a UTC
            const fechaArgentina = new Date(fechaUtc + (diferenciaUtcArgentina * 3600000)); // Ajustar a UTC-3
            return fechaArgentina;
        }

        // Validar que las citas sean de lunes a viernes
        const appointmentTime = new Date(time);

        // Ajustar la fecha de la cita al horario de Argentina
        const fechaArgentina = ajustarFechaArgentina(appointmentDate);
        const dayOfWeek = fechaArgentina.getUTCDay(); // Obtener el día de la semana en UTC ajustado

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new Error("Las citas solo se pueden programar de lunes a viernes.");
        }

        if(!time) throw new Error("El campo time es requerido");
        const ValidateTimes = [
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30"
        ];
        if(!ValidateTimes.includes(time)) {
            throw new Error("El campo time debe estar entre las 09:00 AM y 17:30 PM en intervalos de 30 minutos");
        };


        if(description.length < 4 || description.length > 50) {
            throw new Error("el campo descriptions debe tener entre 4 y 50 caracteres");
        };

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
    next();
};

export default appointmentValidate;