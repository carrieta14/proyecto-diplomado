import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Book } from './entities/book.entity';
import { UserBook } from '../auth/entities/authbooks.entity';
import { Auth } from '../auth/entities/auth.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';


@Module({
  controllers: [BooksController],
  imports: [
    TypeOrmModule.forFeature([Book, UserBook,Auth, Profile]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    AuthModule,
  ],
  providers: [BooksService,JwtStrategy],
  exports: [
    TypeOrmModule,
    BooksService
  ]
})
export class BooksModule {}
