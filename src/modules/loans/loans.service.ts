import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Repository } from 'typeorm';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class LoansService {

  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) { }

  async create(rol: string, createLoanDto: CreateLoanDto) { 
    const perfil = await this.profileRepository.findOne({where:{ID:+rol}});
    if (perfil.name !== 'admin' && perfil.name !=='adviser') {
      throw new UnauthorizedException('No tienes permisos para realizar esta acción');
    }
    const new_loan = this.loanRepository.create(createLoanDto);
    console.log(new_loan);
    await this.loanRepository.save(new_loan);
    return { ...new_loan};
  }

  async findAll(rol: string) {
    const perfil = await this.profileRepository.findOne({where:{ID:+rol}});
    if (perfil.name !== 'admin' && perfil.name !=='adviser') {
      throw new UnauthorizedException('No tienes permisos para realizar esta acción');
    }
    const loans = this.loanRepository.find({where:{state:1}});
    return loans;
  }

  async findOne(id: string, rol: string) {
    const perfil = await this.profileRepository.findOne({where:{ID:+rol}});
    if (perfil.name !== 'admin' && perfil.name !=='adviser') {
      throw new UnauthorizedException('No tienes permisos para realizar esta acción');
    }
    const loan = this.loanRepository.findOne({where:{ID: id}});
    return loan;
  }

  async update(id: string, rol:string, updateLoanDto: UpdateLoanDto) {
    const perfil = await this.profileRepository.findOne({where:{ID:+rol}});
    if (perfil.name !== 'admin' && perfil.name !=='adviser') {
      throw new UnauthorizedException('No tienes permisos para realizar esta acción');
    }
    const loan = await this.loanRepository.findOne({where:{ID:id}});
    if(!loan) {
      throw new NotFoundException(`Este registro no existe`);
    }

    loan.loan_date = updateLoanDto.loan_date;
    loan.return_date = updateLoanDto.return_date;
    loan.expected_return_date = updateLoanDto.expected_return_date;

    return this.loanRepository.save(loan);
  }

 async remove(id: string, rol: string, updateLoanDto: UpdateLoanDto) {
    const loan = this.loanRepository.findOne({where:{ID:id}});
    if(!loan) {
      throw new NotFoundException(`Este registro no existe`);
    }
    const perfil = await this.profileRepository.findOne({where:{ID:+rol}});
    if (perfil.name !== 'admin') {
      throw new UnauthorizedException('No tienes permisos para realizar esta acción');
    }
    updateLoanDto.state = 0;
    
    return this.loanRepository.update(id,updateLoanDto);
  }
}
