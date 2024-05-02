import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) { }

  async createBook(rol: string,createBookDto: CreateBookDto) {
    const perfil = await this.profileRepository.findOne({ where: { ID: +rol } });
    if (perfil.name !== 'admin') {
      throw new UnauthorizedException('No tienes permisos para realizar esta acción');
    }
    const book = await this.bookRepository.findOne({ where: { title: createBookDto.title } });
    if (book && book.title.toLocaleLowerCase() === createBookDto.title.toLocaleLowerCase()) {
      throw new ConflictException('Este Libro ya existe');
    }
    console.log(createBookDto);

    const new_book = this.bookRepository.create(createBookDto);
    await this.bookRepository.save(new_book);
    console.log(new_book);

    return { ...new_book };
  }

  async findAll(rol: string) {
    const perfil = await this.profileRepository.findOne({ where: { ID: +rol } });
    if (!perfil) {
      throw new UnauthorizedException('No tienes permisos para realizar esta acción');
    }
    const books = await this.bookRepository.find();
    return books;
  }

  async findOne(id: string, rol: string) {
    const book = await this.bookRepository.findOne({ where: { ID: id } });
    return book;
  }

  async updateBook(id: string, rol: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ where: { ID: id } });
    if (!book) {
      throw new NotFoundException('No se encontró el libro');
    }
    const perfil = await this.profileRepository.findOne({ where: { ID: +rol } });
    if ( perfil.name !== 'admin') {
      throw new UnauthorizedException('No tienes permisos para realizar esta acción');
    }

    book.title = updateBookDto.title;
    book.author = updateBookDto.author;
    book.description = updateBookDto.description;
    book.availablity = updateBookDto.availablity;
    book.year = updateBookDto.year;

    return this.bookRepository.save(book);
  }


  async remove(id: string, rol: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ where: { ID: id } });
    if (!book) {
      throw new NotFoundException('No se encontró el libro');
    }
    const perfil = await this.profileRepository.findOne({ where: { ID: +rol } });
    if (perfil.name !== 'admin') {
      throw new UnauthorizedException('No tienes permisos para realizar esta acción');
    }

    book.state = updateBookDto.state;

    return this.bookRepository.save(book);
  }
}