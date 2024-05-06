export const dbConstants = () => ({
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD
});