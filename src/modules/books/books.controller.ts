import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards, Query, } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { jwtProfileGuard } from '../auth/guard/jwt-profile.guard';
import { Profiles } from '../auth/decorators/profile.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { Book } from './entities/book.entity';
import { jwtAuthGuard } from '../auth/guard/jwt-auth.guard';



@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Post('/create')
  create(@Body() createBookDto: CreateBookDto, @Res() response) {
    return this.booksService.createBook(createBookDto).then((book) => {
      response.status(HttpStatus.CREATED).json({data: book, code: 201, message: 'Libro creado con exito'});
  }).catch((error)=> {
      response.status(HttpStatus.BAD_REQUEST).json({message: error.message, code: '400'});
  });
  }

  @UseGuards(jwtAuthGuard)
  @Get('/show')
  findAll(@Res() response) {
    return this.booksService.findAll().then((books) => {
      response.status(HttpStatus.CREATED).json({data: books, code: 201, message: 'Libros encontrados'});
  }).catch((error)=> {
      response.status(HttpStatus.BAD_REQUEST).json({message: error.message, code: '400'});
    })
  }

  @UseGuards(jwtAuthGuard)
  @Get('/detail/:id')
  findOne(@Query('id') id: string, @Res() response) {
    return this.booksService.findOne(id).then((book) => {
      response.status(HttpStatus.CREATED).json({data: book, code: 201, message: 'Libro encontrado'});
  }).catch((error)=> {
      response.status(HttpStatus.BAD_REQUEST).json({message: error.message, code: '400'});
    });
  }


  @UseGuards(jwtAuthGuard)
  @Post('/addFavorite/:id')
  addFavorite(@Res() response, @Query('userId') userId: string, @Query('bookId') bookId: string) {
    return this.booksService.addFavorite(userId, bookId).then((addFavorite) => {
      response.status(HttpStatus.CREATED).json({ data: addFavorite, code: 201, message: 'Libro asignado en favorito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(jwtAuthGuard)
  @Delete('/removeFavorite/:id')
  removeFavorite(@Res() response, @Query('user') user: Auth, @Query('book') book: Book) {
    return this.booksService.removeFavorite(user, book).then((addFavorite) => {
      response.status(HttpStatus.CREATED).json({ data: addFavorite, code: 201, message: 'Libro Eliminado en favorito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(jwtAuthGuard)
  @Get('/getUserFavorites/')
  getUserFavorites(@Res() response, @Query('user') user: Auth) {
    return this.booksService.getUserFavorites(user).then((addFavorite) => {
      response.status(HttpStatus.CREATED).json({ data: addFavorite, code: 201, message: 'Lista de libros favoritos' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }


  @UseGuards(jwtAuthGuard,jwtProfileGuard)
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
