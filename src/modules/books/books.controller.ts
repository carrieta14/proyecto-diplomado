import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Res, UseGuards, Query, } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { jwtProfileGuard } from '../auth/guard/jwt-profile.guard';
import { Profiles } from '../auth/decorators/profile.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { Book } from './entities/book.entity';



@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @UseGuards(AuthGuard(), jwtProfileGuard)
  @Profiles(1001)
  @Post('/create')
  create(@Body() createBookDto: CreateBookDto, @Res() response) {
    return this.booksService.createBook(createBookDto).then((book) => {
      response.status(HttpStatus.CREATED).json({ data: book, code: 201, message: 'Libro creado con exito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(AuthGuard())
  @Get('/show')
  show(@Res() response) {
    return this.booksService.findAll().then((books) => {
      response.status(HttpStatus.OK).json({ data: books, code: 200, message: 'Listado de libros existentes' });
    }).catch(() => {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron libros existentes' });
    });
  }

  @UseGuards(AuthGuard())
  @Get('/detail/')
  findOne(@Query('id') id: string, @Res() response) {
    return this.booksService.findOne(id).then((book) => {
      response.status(HttpStatus.CREATED).json({data: book, code: 200, message: 'Libro encontrado'});
  }).catch((error)=> {
      response.status(HttpStatus.BAD_REQUEST).json({message: error.message, code: '400'});
    });
  }

  @UseGuards(AuthGuard())
  @Post('/addFavorite/')
  addFavorite(@Res() response, @Query('userId') userId: string, @Query('bookId') bookId: string) {
    return this.booksService.addFavorite(userId, bookId).then((addFavorite) => {
      response.status(HttpStatus.CREATED).json({ data: addFavorite, code: 201, message: 'Libro asignado en favorito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(AuthGuard())
  @Delete('/removeFavorite/')
  removeFavorite(@Res() response, @Query('user') user: Auth, @Query('book') book: Book) {
    return this.booksService.removeFavorite(user, book).then((addFavorite) => {
      response.status(HttpStatus.CREATED).json({ data: addFavorite, code: 200, message: 'Libro Eliminado en favorito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(AuthGuard())
  @Get('/getUserFavorites/')
  getUserFavorites(@Res() response, @Query('id') user: Auth) {
    return this.booksService.getUserFavorites(user).then((addFavorite) => {
      response.status(HttpStatus.CREATED).json({ data: addFavorite, code: 200, message: 'Lista de libros favoritos' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(AuthGuard(), jwtProfileGuard)
  @Profiles(1001)
  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @Res() response) {
    return this.booksService.updateBook(id, updateBookDto).then((parameter) => {
      response.status(HttpStatus.OK).json({ data: parameter, code: 200, message: 'parametro actualizado con exito' });
    }).catch(() => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo actualizar' });
    });
  }
}
