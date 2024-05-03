import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBook } from '../auth/entities/authbooks.entity';
import { Auth } from '../auth/entities/auth.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(UserBook)
    private favoriteRepository: Repository<UserBook>
  ) { }

  async createBook( createBookDto: CreateBookDto) {
    const book = await this.bookRepository.findOne({ where: { title: createBookDto.title } });
    if (book && book.title.toLocaleLowerCase() === createBookDto.title.toLocaleLowerCase()) {
      throw new ConflictException('Este Libro ya existe');
    }

    const new_book = this.bookRepository.create(createBookDto);
    new_book.availablity = true;
    new_book.state = 1;
    await this.bookRepository.save(new_book);
    return { ...new_book};
  }

  async findAll() {
    const books = await this.bookRepository.find({where:{state:1}});
    return books;
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne({ where: { ID: id } });
    return book;
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ where: { ID: id } });
    if (!book) {
      throw new NotFoundException('No se encontró el libro');
    }

    book.title = updateBookDto.title;
    book.author = updateBookDto.author;
    book.description = updateBookDto.description;
    book.availablity = updateBookDto.availablity;
    book.year = updateBookDto.year;
    book.amount = updateBookDto.amount;
    book.amountA = updateBookDto.amountA;

    return this.bookRepository.save(book);
  }

  async addFavorite(userID: string, bookId: string): Promise<UserBook> {
    const favorite = new UserBook();
    favorite.user.ID = userID;
    favorite.book.ID = bookId;
    return this.favoriteRepository.save(favorite);
  }

  async removeFavorite(user: Auth, book: Book): Promise<void> {
    await this.favoriteRepository.delete({ user, book });
  }

  async getUserFavorites(user: Auth): Promise<Book[]> {
    const favorites = await this.favoriteRepository.find({
      where: { user },
      relations: ['book'],
    });
    return favorites.map(favorite => favorite.book);
  }
}
