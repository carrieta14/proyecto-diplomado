import { DataSource } from "typeorm";

export default new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db-diplomado',
    entities: [__dirname + '/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js']
});