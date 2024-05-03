import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards } from '@nestjs/common';
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
  @Post('/create')
  create(@Body() createBookDto: CreateBookDto, @Res() response) {
    return this.booksService.createBook(createBookDto).then((book) => {
      response.status(HttpStatus.CREATED).json({data: book, code: 201, message: 'Libro creado con exito'});
  }).catch((error)=> {
      response.status(HttpStatus.BAD_REQUEST).json({message: error.message, code: '400'});
  });
  }

  @Get('/show')
  findAll() {
    return this.booksService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @UseGuards(AuthGuard(),jwtProfileGuard)
  @Profiles(1001)
  @Patch('/update_book/:id/:rol')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, updateBookDto);
  }
}
