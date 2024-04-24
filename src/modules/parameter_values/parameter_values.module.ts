import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParameterValuesService } from './parameter_values.service';
import { ParameterValuesController } from './parameter_values.controller';
import { Auth } from '../auth/entities/auth.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  controllers: [ParameterValuesController],
  providers: [ParameterValuesService,JwtStrategy],
  imports:[
    TypeOrmModule.forFeature([Auth, Profile]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ]
  
})
export class ParameterValuesModule {}
