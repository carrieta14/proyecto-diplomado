import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

<<<<<<< Updated upstream
  @Get()
  findAll() {
    return this.booksService.findAll();
=======
  // @UseGuards(jwtAuthGuard)
  @Get('/show')
  show(@Res() response) {
    return this.booksService.findAll().then((books) => {
      response.status(HttpStatus.OK).json({ data: books, code: 200, message: 'Listado de libros existentes' });
    }).catch(() => {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron libros existentes' });
    });
>>>>>>> Stashed changes
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
