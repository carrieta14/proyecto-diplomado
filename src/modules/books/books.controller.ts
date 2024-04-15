import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/create_book/:rol')
  create(@Param('rol') rol: string,@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(rol, createBookDto);
  }

  @Get(':rol')
  findAll(@Param('rol') rol: string) {
    return this.booksService.findAll(rol);
  }

  @Get(':id/:rol')
  findOne(@Param('id') id: string, @Param('rol') rol: string) {
    return this.booksService.findOne(id, rol);
  }

  @Patch('/update_book/:id/:rol')
  update(@Param('id') id: string, @Param('rol') rol: string ,@Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, rol,updateBookDto);
  }

  @Patch('/delete_book/:id/:rol')
  remove(@Param('id') id: string, @Param('rol') rol: string ,@Body() updateBookDto: UpdateBookDto) {
    return this.booksService.remove(id, rol, updateBookDto);
  }
}
