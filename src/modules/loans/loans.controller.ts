import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) { }

  @Post('/create_loan/:rol')
  create(@Body() createLoanDto: CreateLoanDto, @Param('rol') rol: string) {
    return this.loansService.create(rol, createLoanDto);
  }

  @Get('/findAll_loans/:rol')
  findAll(@Param('rol') rol: string) {
    return this.loansService.findAll(rol);
  }

  @Get('/findone_loan/:id/:rol')
  findOne(@Param('id') id: string, @Param('rol') rol: string) {
    return this.loansService.findOne(id, rol);
  }

  @Patch('/update_loan/:id/:rol')
  update(@Param('id') id: string, @Param('rol') rol: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(id, rol, updateLoanDto);
  }

  @Patch('/delete_loan/:id/:rol')
  remove(@Param('id') id: string, @Param('rol') rol: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.remove(id, rol, updateLoanDto);
  }
}
