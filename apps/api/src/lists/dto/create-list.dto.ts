import { IsString, IsOptional, IsEnum, MaxLength, MinLength } from 'class-validator';
import { Privacy } from '@zirroo/types';

export class CreateListDto {
    @IsString()
    @MinLength(1)
    @MaxLength(200)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description?: string;

    @IsOptional()
    @IsString()
    coverImage?: string;

    @IsOptional()
    @IsEnum(Privacy)
    privacy?: Privacy;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    category?: string;
}
