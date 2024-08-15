import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateCommentDto {
  @ApiProperty({ example: 'task done', description: 'comment content'})
  @IsString({message: 'must be string'})
  @Length(1, 128, {message: "can't be empty"})
  readonly content: string;
}