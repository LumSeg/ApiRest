export enum AppoinmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled"
}

export default interface IAppointment {
    id: number;
    date: string; 
    time: string;
    userId: number;
    status: AppoinmentStatus;
    description: string;
}
