import { compareSync, hashSync } from "bcrypt";
import { Profile } from "../../profiles/entities/profile.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Loan } from "../../loans/entities/loan.entity";
import { UserBook } from "./authbooks.entity";

@Entity({ name: 'users' })
export class Auth {
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    document_type: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    state: number;

    @ManyToOne(() => Profile, profile => profile.users)
    profile: Profile;

    // Relacion Tabla intermedia UserBook
    @OneToMany(() => UserBook, userBook => userBook.user)
    userBooks: UserBook[];

    @OneToMany(() => Loan, loan => loan.user)
    loans: Loan[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    generateUUID() {
        this.ID = uuidv4();
    }

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            this.password = hashSync(this.password, 10);
        }
    }

    validatePassoword(password: string): boolean {
        return compareSync(password, this.password);
    }

    @BeforeInsert()
    @BeforeUpdate()
    checkEmailBefore() {
        this.email = this.email.toLowerCase().trim();
    }
}
