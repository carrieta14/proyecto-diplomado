import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoansService {

  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>
  ) { }

  async create(createLoanDto: CreateLoanDto) {  
    const new_loan = this.loanRepository.create(createLoanDto);
    console.log(new_loan);
    await this.loanRepository.save(new_loan);
    return { ...new_loan};
  }

  findAll() {
    const loans = this.loanRepository.find({where:{state:1}});
    return loans;
  }

  findOne(id: string) {
    const loan = this.loanRepository.findOne({where:{ID: id}});
    return loan;
  }

  async update(id: string, updateLoanDto: UpdateLoanDto) {
    const loan = await this.loanRepository.findOne({where:{ID:id}});

    loan.loan_date = updateLoanDto.loan_date;
    loan.return_date = updateLoanDto.return_date;
    loan.expected_return_date = updateLoanDto.expected_return_date;

    return this.loanRepository.save(loan);
  }

  remove(id: string, updateLoanDto: UpdateLoanDto) {
    const loan = this.loanRepository.findOne({where:{ID:id}});
    if(!loan) {
      throw new NotFoundException(`Este registro no existe`);
    }
    updateLoanDto.state = 0;
    
    return this.loanRepository.update(id,updateLoanDto);
  }
}
