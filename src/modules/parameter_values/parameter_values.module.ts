import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParameterValuesService } from './parameter_values.service';
import { ParameterValuesController } from './parameter_values.controller';
import { Auth } from '../auth/entities/auth.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Parameter } from '../parameters/entities/parameter.entity';
import { ParameterValue } from './entities/parameter_value.entity';

@Module({
  controllers: [ParameterValuesController],
  providers: [ParameterValuesService,JwtStrategy],
  imports:[
    TypeOrmModule.forFeature([Auth, Profile, Parameter, ParameterValue]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  exports: [
    ParameterValuesService,
    TypeOrmModule
  ]
  
})
export class ParameterValuesModule {}
