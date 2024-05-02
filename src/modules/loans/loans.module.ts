import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { Auth } from '../auth/entities/auth.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  controllers: [LoansController],
  providers: [LoansService,JwtStrategy],
  imports:[
    TypeOrmModule.forFeature([Auth, Profile]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ]
})
export class LoansModule {}
