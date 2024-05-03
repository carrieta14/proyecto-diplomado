import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) { }

  @UseGuards(AuthGuard())
  @Post('/create/')
  create(@Body() createLoanDto: CreateLoanDto, @Res() response, @Query('userId') userId: string) {
    return this.loansService.create(createLoanDto, userId).then((loan) => {
      response.status(HttpStatus.CREATED).json({ data: loan, code: 201, message: 'prestamo realizado con exito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(AuthGuard())
  @Get('/show')
  show(@Res() response) {
    return this.loansService.show().then((loan) => {
      response.status(HttpStatus.OK).json({ data: loan, code: 201, message: 'Listado de prestamos activos' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(AuthGuard())
  @Get('/detail/:id')
  detail(@Param('id') id: string, @Res() response) {
    return this.loansService.detail(id).then((loan) => {
      response.status(HttpStatus.OK).json({ data: loan, code: 201, message: 'Prestamo encontrado' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(AuthGuard())
  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto, @Res() response) {
    return this.loansService.update(id, updateLoanDto).then((loan) => {
      response.status(HttpStatus.OK).json({ data: loan, code: 201, message: 'Prestamo Actualizado' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }
  
  @UseGuards(AuthGuard())
  @Post('/assing/')
  assing(@Res() response, @Query('loanId') loanId: string, @Query('bookId') bookId: string) {
    return this.loansService.AssingBook(loanId, bookId).then((loan) => {
      response.status(HttpStatus.CREATED).json({ data: loan, code: 201, message: 'Asignacion realizada con exito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(AuthGuard())
  @Get('/borrowedbook')
  borrowedbook(@Query('id') id: string, @Res() response){
    return this.loansService.borrowedbooks(id).then((books) => {
      response.status(HttpStatus.CREATED).json({ data: books, code: 201, message: 'Listado de prestamos del usuario' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    })
  }
}

