import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { AppoinmentStatus } from "../interfaces/IAppointments"
import { User } from "./User";

export enum AppointmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled",
}

@Entity({
    name: "appointments"
})

export class Appointments {
    
    @PrimaryGeneratedColumn()
        id: number;
    
    @Column()
        date: string;
    
    @Column()
        time: string;
    
    @Column({
        default: AppoinmentStatus.ACTIVE,
    })
    status: string

    @Column()
    description: string;
    
    @ManyToOne(() => User, user => user.appointments)
    @JoinColumn({ name: "user_id" })
    user: User;
}