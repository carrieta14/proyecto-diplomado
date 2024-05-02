import { Auth } from "../../auth/entities/auth.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('profiles')
export class Profile {

    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    ID: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('tinyint',{default:1})
    state: number;

    @OneToMany(() => Auth, user => user.profile)
    users: Auth[];

    @CreateDateColumn({type: 'timestamp'})
    createAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updateAt: Date;
}