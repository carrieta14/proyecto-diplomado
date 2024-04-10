export const jwtConstants = () => ({
    secret: process.env.JWT_SECRET,
    expireIn: process.env.EXPIRE_IN,
});