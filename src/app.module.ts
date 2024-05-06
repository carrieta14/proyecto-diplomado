import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ParametersModule } from './modules/parameters/parameters.module';
import { ParameterValuesModule } from './modules/parameter_values/parameter_values.module';
import { BooksModule } from './modules/books/books.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { LoansModule } from './modules/loans/loans.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import 'dotenv/config';
import { dbConstants } from './config/db.constants';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: dbConstants().host,
    port: dbConstants().port,
    username: dbConstants().user,
    password: dbConstants().password,
    database: dbConstants().database,
    entities: [__dirname + '/modules/**/entities/*.entity.js'],
    synchronize: true,
    migrations: [__dirname + '/**/database/migrations/*.js '],
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: join(__dirname, '..', '.env'),
  }),AuthModule, ParametersModule, ParameterValuesModule, BooksModule, ProfilesModule, LoansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
