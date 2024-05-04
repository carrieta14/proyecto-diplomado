import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    
    @IsString()
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    name?: string;

    @IsString()
    @MaxLength(255)
    description?: string;

    state?: number;
}
