import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { jwtProfileGuard } from '../auth/guard/jwt-profile.guard';
import { Profiles } from '../auth/decorators/profile.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard(),jwtProfileGuard)
  @Profiles(1001)
  @Post('/create_book/:rol')
  create(@Param('rol') rol: string,@Body() createBookDto: CreateBookDto): Promise<{ ID: string; title: string; author: string; description: string; availablity: boolean; amount: number; amountA: number; year: Date; state: number; userBooks: import("c:/Users/DHHG1/Desktop/Ing. Danny/React Clases/Proyecto/proyecto-diplomado/src/modules/auth/entities/authbooks.entity").UserBook[]; loans: import("c:/Users/DHHG1/Desktop/Ing. Danny/React Clases/Proyecto/proyecto-diplomado/src/modules/loans/entities/loan.entity").Loan[]; createdAt: Date; updatedAt: Date; }> {
    return this.booksService.createBook(rol, createBookDto);
  }

  @UseGuards(AuthGuard(),jwtProfileGuard)
  @Profiles(1001)
  @Get(':rol')
  findAll(@Param('rol') rol: string) {
    return this.booksService.findAll(rol);
  }

  @UseGuards(AuthGuard(),jwtProfileGuard)
  @Profiles(1001)
  @Get(':id/:rol')
  findOne(@Param('id') id: string, @Param('rol') rol: string) {
    return this.booksService.findOne(id, rol);
  }

  @UseGuards(AuthGuard(),jwtProfileGuard)
  @Profiles(1001)
  @Patch('/update_book/:id/:rol')
  update(@Param('id') id: string, @Param('rol') rol: string ,@Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, rol,updateBookDto);
  }
}
