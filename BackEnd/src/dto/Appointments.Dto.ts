export enum AppoinmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled"
}

export default interface IAppointmentDto {

    date: string; 
    time: string;
    user_id: number;
    status: AppoinmentStatus;
    description: string;
    
}