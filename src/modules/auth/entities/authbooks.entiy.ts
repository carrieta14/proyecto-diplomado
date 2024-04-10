import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { Auth } from "./auth.entity";
// import { Book } from "../../books/entities/book.entity";

@Entity('favorites')
export class UserBook {
    @PrimaryGeneratedColumn('increment')
    ID: number

    //Relacion a tabla User
    // @ManyToOne(() => Auth, user => user.userBooks)
    // @JoinColumn({ name: 'userId'})
    // user: Auth;

    //Relacion a tabla Book
    // @ManyToOne(() => Book, book => book.userBooks)
    // @JoinColumn({name: 'bookId'})
    // book: Book;

    @Column('datetime')
    date_stamp: Date;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}