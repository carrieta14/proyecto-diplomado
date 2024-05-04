import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Repository } from 'typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { Book } from '../books/entities/book.entity';
import { isEmpty, isNotEmpty } from 'class-validator';

@Injectable()
export class LoansService {

  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    @InjectRepository(Auth)
    private userRepository: Repository<Auth>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
  ) { }

  async create(createLoanDto: CreateLoanDto, userID: string): Promise<Loan> {
    const user = await this.userRepository.findOne({ where: { ID: userID } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Asegurar que el libro exista
    const book = await this.bookRepository.findOne({ where: { ID: createLoanDto.bookId } });
    if (!book) {
      throw new NotFoundException('Libro no encontrado');
    }

    // Verificar si el usuario ya tiene un préstamo activo para el libro
    const existingLoan = await this.loanRepository.createQueryBuilder('loan')
      .innerJoin('loan.books', 'book', 'book.ID = :bookId', { bookId: createLoanDto.bookId })
      .andWhere('loan.user.ID = :userId', { userId: userID })
      .andWhere('loan.return_date IS NULL')
      .getOne();

    if (existingLoan) {
      throw new BadRequestException(`Ya has prestado el libro: ${book.title} y no ha sido devuelto aún.`);
    }
    delete createLoanDto.bookId;
    const newLoan = this.loanRepository.create({
      ...createLoanDto,
      user: user
    });
    await this.loanRepository.save(newLoan);
    return newLoan;
  }


  async show() {
    const loans = this.loanRepository.find({ relations:["books"]});
    return loans;
  }

  async detail(id: string) {
    const loan = this.loanRepository.findOne({where:{ID: id}});
    return loan;
  }

  async update(id: string, updateLoanDto: UpdateLoanDto) {
    const loan = await this.loanRepository.findOne({where:{ID:id}});
    if(!loan) {
      throw new NotFoundException(`Este registro no existe`);
    }

    loan.loan_date = updateLoanDto.loan_date;
    loan.return_date = updateLoanDto.return_date;
    loan.expected_return_date = updateLoanDto.expected_return_date;

    return this.loanRepository.save(loan);
  }

  async AssingBook(loanId: string, bookId: string): Promise<Loan> {
    const loan = await this.loanRepository.findOne({ where: { ID: loanId } });
    const books = await this.bookRepository.find({ where: { ID: bookId } });
    loan.books = books;
    return this.loanRepository.save(loan);
  }

  async borrowedbooks(id: string){

    const user = await this.userRepository.findOne({where:{ID:id}});
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    
    const bookloans = await this.loanRepository.find({where: { user: { ID: id }, state: 1 }, relations:["books"]})
    
    if (bookloans.length === 0) {
      throw new NotFoundException('No hay préstamos encontrados');
  }

    return bookloans;
  }
}
