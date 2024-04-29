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

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db-diplomado',
    entities: [__dirname + '/modules/**/entities/*.entity.js'],
    synchronize: false,
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
