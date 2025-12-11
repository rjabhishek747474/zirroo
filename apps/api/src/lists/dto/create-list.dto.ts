import { IsString, IsOptional, IsEnum, MaxLength, MinLength } from 'class-validator';
import { Prisma } from '@prisma/client';

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
    @IsEnum(Prisma.Privacy)
    privacy?: Prisma.Privacy;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    category?: string;
}
