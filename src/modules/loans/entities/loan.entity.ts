import { Book } from "../../books/entities/book.entity";
import { Auth } from "../../auth/entities/auth.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';


@Entity('loans')
export class Loan {
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @BeforeInsert()
    generateUUID() {
        this.ID = uuidv4();
    }

    @Column('datetime')
    loan_date: Date;

    @Column('datetime')
    return_date: Date;

    @Column('datetime')
    expected_return_date: Date;

    @Column()
    state: number;

    @ManyToOne(() => Auth, user => user.loans, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: Auth;

    @ManyToMany(() => Book, book => book.loans)
    books: Book[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
