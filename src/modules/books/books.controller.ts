import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards, Query, } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { jwtProfileGuard } from '../auth/guard/jwt-profile.guard';
import { Profiles } from '../auth/decorators/profile.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { Book } from './entities/book.entity';
import { response } from 'express';


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

  @UseGuards(AuthGuard())
  @Get('/show')
  findAll(@Res() response) {
    return this.booksService.findAll().then((books) => {
      response.status(HttpStatus.CREATED).json({data: books, code: 201, message: 'Libros encontrados'});
  }).catch((error)=> {
      response.status(HttpStatus.BAD_REQUEST).json({message: error.message, code: '400'});
    })
  }

  @UseGuards(AuthGuard())
  @Get('/detail/:id')
  findOne(@Query('id') id: string, @Res() response) {
    return this.booksService.findOne(id).then((book) => {
      response.status(HttpStatus.CREATED).json({data: book, code: 201, message: 'Libro encontrado'});
  }).catch((error)=> {
      response.status(HttpStatus.BAD_REQUEST).json({message: error.message, code: '400'});
    });
  }


  @UseGuards(AuthGuard())
  @Post('/addFavorite/:id')
  addFavorite(@Res() response, @Query('userId') userId: string, @Query('bookId') bookId: string) {
    return this.booksService.addFavorite(userId, bookId).then((addFavorite) => {
      response.status(HttpStatus.CREATED).json({ data: addFavorite, code: 201, message: 'Libro asignado en favorito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(AuthGuard())
  @Delete('/removeFavorite/:id')
  removeFavorite(@Res() response, @Query('user') user: Auth, @Query('book') book: Book) {
    return this.booksService.removeFavorite(user, book).then((addFavorite) => {
      response.status(HttpStatus.CREATED).json({ data: addFavorite, code: 201, message: 'Libro Eliminado en favorito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(AuthGuard())
  @Get('/getUserFavorites/')
  getUserFavorites(@Res() response, @Query('user') user: Auth) {
    return this.booksService.getUserFavorites(user).then((addFavorite) => {
      response.status(HttpStatus.CREATED).json({ data: addFavorite, code: 201, message: 'Lista de libros favoritos' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }


  @UseGuards(AuthGuard(),jwtProfileGuard)
  @Profiles(1001)
  @Patch('/update_book/:id')
  update(@Query('id') id: string, @Body() updateBookDto: UpdateBookDto, @Res() response) {
    return this.booksService.updateBook(id, updateBookDto).then((book) => {
      response.status(HttpStatus.CREATED).json({ data: book, code: 201, message: 'Libro Eliminado en favorito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }


}
