import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength} from "class-validator";

export class CreateProfileDto {

    @IsString()
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MaxLength(255)
    description?: string;

    @IsNumber()
    state: number;
}
