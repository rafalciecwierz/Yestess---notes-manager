import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateArticleDTO{

    @IsString()
    title: string;

    @IsString()
    text: string;
}

export class UpdateArticleDTO{

    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    text: string;
}

export class DeleteArticleDTO {
    id: number;
}