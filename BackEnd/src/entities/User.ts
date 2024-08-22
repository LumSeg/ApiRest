import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credentials } from "./Credentials"
import { Appointments } from "./Appointments"

@Entity({
    name: "users"
})

export class User {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @Column()
    email: string

    @Column()
    birthdate: string

    @Column()   
    nDni: number

    @OneToOne(() => Credentials)
    @JoinColumn({ name: "credential_id" })
    credential: Credentials;

    @OneToMany(() => Appointments, appointment => appointment.user)
    appointments: Appointments[] 
}
