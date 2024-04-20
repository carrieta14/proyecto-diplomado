import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from "class-validator"

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, { message: 'La contraseña debe tener al menos una letra mayúscula, una minúscula y un número' })
    password: string

}