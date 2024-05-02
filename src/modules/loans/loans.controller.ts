import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) { }

  @Post('/create')
  create(@Body() createLoanDto: CreateLoanDto,  @Param('userID') userID:string) {
    return this.loansService.create(createLoanDto, userID);
  }

  @Get('')
  findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string,  @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(id, updateLoanDto);
  }
}
