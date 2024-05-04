import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { Loan } from './entities/loan.entity';
import { UserBook } from '../auth/entities/authbooks.entity';
import { Auth } from '../auth/entities/auth.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Book } from '../books/entities/book.entity';



@Module({
  controllers: [LoansController],
  providers: [LoansService,JwtStrategy],
  imports:[
    TypeOrmModule.forFeature([Auth, Profile, Loan, UserBook, Book]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  exports: [
    TypeOrmModule,
    LoansService]
})
export class LoansModule { }
