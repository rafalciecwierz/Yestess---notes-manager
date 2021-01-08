import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateCommentDTO{

    @IsNumber()
    articleId: number;

    @IsString()
    text: string;
}

export class UpdateCommentDTO{

    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    text: string;
}

export class DeleteCommentDTO {
    id: number;
}