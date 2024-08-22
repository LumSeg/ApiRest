import { Router } from "express";
import router from ".";
import  appointmentValidate  from "../middlewares/appointmentValidateMidd"
import { getAppointmentsControllers, getAppointmentByIdControllers, createAppointmentControllers, cancelAppointmentControllers } from "../controllers/appointmentsControllers";

const appointmentsRouter = Router();

appointmentsRouter.get('/', getAppointmentsControllers);
appointmentsRouter.get('/:id', getAppointmentByIdControllers);
appointmentsRouter.post('/schedule', appointmentValidate, createAppointmentControllers);
appointmentsRouter.put('/cancel/:id', cancelAppointmentControllers);

export default appointmentsRouter;