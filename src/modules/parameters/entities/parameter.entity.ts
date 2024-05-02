import { ParameterValue } from "../../parameter_values/entities/parameter_value.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('parameters')
export class Parameter {

    @PrimaryGeneratedColumn('increment')
    ID: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({default:1})
    state: number;

    @OneToMany(() => ParameterValue, parameter_value => parameter_value.parameter)
    parameter_value: ParameterValue[];
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}