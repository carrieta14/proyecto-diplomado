import { Module } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametersController } from './parameters.controller';
import { Auth } from '../auth/entities/auth.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Parameter } from './entities/parameter.entity';

@Module({
  controllers: [ParametersController],
  providers: [ParametersService,JwtStrategy],
  imports:[
    TypeOrmModule.forFeature([Auth, Profile, Parameter]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ]
})
export class ParametersModule {}
