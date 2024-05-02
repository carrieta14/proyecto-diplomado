import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany,
         OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Loan } from "../../loans/entities/loan.entity";
import { UserBook } from "../../auth/entities/authbooks.entity";

@Entity({ name: 'books' })
export class Book {
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    description: string;

    @Column()
    availablity: boolean;

    @Column()
    amount: number

    @Column()
    amountA: number

    @Column('datetime')
    year: Date;

    @Column()
    amount: number;

    @Column()
    amountA: number;

    @Column()
    state: number;

    // Relacion a tabla intermedia UserBook
    @OneToMany(() => UserBook, userBook => userBook.book)
    userBooks: UserBook[];

    @ManyToMany(() => Loan, loan => loan.books)
    @JoinTable({ name: 'book_loans' })
    loans: Loan[];

    @BeforeInsert()
    generateUUID() {
        this.ID = uuidv4();
    }

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}