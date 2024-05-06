import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { jwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Profiles } from '../auth/decorators/profile.decorator';
import { jwtProfileGuard } from '../auth/guard/jwt-profile.guard';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) { }

  // @UseGuards(jwtAuthGuard)
  @Post('/create/')
  create(@Body() createLoanDto: CreateLoanDto, @Res() response, @Query('userId') userId: string) {
    return this.loansService.create(createLoanDto, userId).then((loan) => {
      response.status(HttpStatus.CREATED).json({ data: loan, code: 201, message: 'prestamo realizado con exito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(jwtAuthGuard)
  @Get('/show')
  show(@Res() response) {
    return this.loansService.show().then((loan) => {
      response.status(HttpStatus.OK).json({ data: loan, code: 200, message: 'Listado de prestamos activos' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(jwtAuthGuard)
  @Get('/detail/:id')
  detail(@Param('id') id: string, @Res() response) {
    return this.loansService.detail(id).then((loan) => {
      response.status(HttpStatus.OK).json({ data: loan, code: 201, message: 'Prestamo encontrado' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(jwtAuthGuard)
  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto, @Res() response) {
    return this.loansService.update(id, updateLoanDto).then((loan) => {
      response.status(HttpStatus.OK).json({ data: loan, code: 200, message: 'Prestamo Actualizado' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }
  
  // @UseGuards(jwtAuthGuard)
  @Post('/assing/')
  assing(@Res() response, @Query('loanId') loanId: string, @Query('bookId') bookId: string) {
    return this.loansService.AssingBook(loanId, bookId).then((loan) => {
      response.status(HttpStatus.CREATED).json({ data: loan, code: 200, message: 'Asignacion realizada con exito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(jwtAuthGuard)
  @Get('/borrowedbook')
  borrowedbook(@Query('userId') id: string, @Res() response){
    return this.loansService.borrowedbooks(id).then((books) => {
      response.status(HttpStatus.CREATED).json({ data: books, code: 200, message: 'Listado de prestamos del usuario' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    })
  }
}

