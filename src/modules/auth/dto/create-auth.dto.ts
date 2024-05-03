import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength,Matches,Min,Max} from "class-validator";

export class CreateAuthDto {

    @IsString()
    @MaxLength(15)
    @MinLength(1)
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @MaxLength(15)
    @MinLength(1)
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNumber()
    @IsNotEmpty()
    document_type: number;

    @IsNumber()
    @Min(10000000,{message:'La cedula no puede ser menor de 8 digitos'})
    @Max(9999999999,{message:'La cedula no puede ser mayor de 10 digitos'})
    @IsPositive()
    @IsNotEmpty()
    document: number
    
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_+=])(?=.*[a-zA-Z]).{8,}$/, { message: 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un caracter especial y un número' })
    password: string;
    
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    profile: number|any;

    state: number;
    
}
