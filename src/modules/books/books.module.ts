import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { UserBook } from '../auth/entities/authbooks.entiy';

@Module({
  controllers: [BooksController],
  imports: [
    TypeOrmModule.forFeature([Book, UserBook]),
    AuthModule,
  ],
  providers: [BooksService],
  exports: [
    TypeOrmModule,
    BooksService
  ]
})
export class BooksModule {}
