import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Res, UseGuards, Query, } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { jwtProfileGuard } from '../auth/guard/jwt-profile.guard';
import { Profiles } from '../auth/decorators/profile.decorator';
import { jwtAuthGuard } from '../auth/guard/jwt-auth.guard';



@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001,1002)
  @Post('/create')
  create(@Body() createBookDto: CreateBookDto, @Res() response) {
    return this.booksService.createBook(createBookDto).then((book) => {
      response.status(HttpStatus.CREATED).json({ data: book, code: 201, message: 'Libro creado con exito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(jwtAuthGuard)
  @Get('/show')
  show(@Res() response) {
    return this.booksService.findAll().then((books) => {
      response.status(HttpStatus.OK).json({ data: books, code: 200, message: 'Listado de libros existentes' });
    }).catch(() => {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron libros existentes' });
    });
  }

  @UseGuards(jwtAuthGuard)
  @Get('/detail/')
  findOne(@Query('id') id: string, @Res() response) {
    return this.booksService.findOne(id).then((book) => {
      response.status(HttpStatus.CREATED).json({data: book, code: 200, message: 'Libro encontrado'});
  }).catch((error)=> {
      response.status(HttpStatus.BAD_REQUEST).json({message: error.message, code: '400'});
    });
  }


  // @UseGuards(jwtAuthGuard)
  @Post('/addFavorite/')
  addFavorite(@Res() response, @Query('userId') userId: string, @Query('bookId') bookId: string) {
    return this.booksService.addFavorite(userId, bookId).then((addFavorite) => {
      response.status(HttpStatus.CREATED).json({ data: addFavorite, code: 201, message: 'Libro asignado en favorito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }


  @UseGuards(jwtAuthGuard)
  @Delete('/removeFavorite/')
  removeFavorite(@Res() response, @Query('userId') user: string, @Query('bookId') book: string) {
    return this.booksService.removeFavorite(user, book).then((addFavorite) => {
      response.status(HttpStatus.CREATED).json({ data: addFavorite, code: 200, message: 'Libro Eliminado en favorito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }


  @UseGuards(jwtAuthGuard, jwtProfileGuard)
  @Profiles(1003)
  @Get('/getUserFavorites/')
  getUserFavorites(@Res() response, @Query('userId') userId: string) {
    return this.booksService.getUserFavorites(userId).then((addFavorite) => {
      response.status(HttpStatus.CREATED).json({ data: addFavorite, code: 200, message: 'Lista de libros favoritos' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(jwtAuthGuard)
  @Put('/update/')
  update(@Query('id') id: string, @Body() updateBookDto: UpdateBookDto, @Res() response) {
    return this.booksService.updateBook(id, updateBookDto).then((parameter) => {
      response.status(HttpStatus.OK).json({ data: parameter, code: 200, message: 'libro actualizado con exito' });
    }).catch(() => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo actualizar' });
    });
  }

  @Get('/check/')
  async checkFavorite(
    @Query('userId') userId: string,
    @Query('bookId') bookId: string
  ): Promise<{ isFavorite: boolean }> {
    const isFavorite = await this.booksService.checkFavorite(userId, bookId);
    return { isFavorite };
  }
}
