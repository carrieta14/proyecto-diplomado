import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { Loan } from './entities/loan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBook } from '../auth/entities/authbooks.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [LoansController],
  imports: [TypeOrmModule.forFeature([Loan, UserBook]),
    AuthModule
  ],
  providers: [LoansService],
  exports: [
    TypeOrmModule,
    LoansService
  ]
})
export class LoansModule { }
