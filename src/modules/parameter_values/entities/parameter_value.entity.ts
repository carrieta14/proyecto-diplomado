import { Parameter } from "../../parameters/entities/parameter.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('parameter_values')
export class ParameterValue {

    @PrimaryGeneratedColumn('increment')
    id_parameter: number;

    @Column()
    name: string;

    @Column({nullable:true})
    short: string;

    @Column()
    state: number;
    
    @ManyToOne(()=>Parameter, parameter=>parameter.parameter_value, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    parameter: Parameter;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}