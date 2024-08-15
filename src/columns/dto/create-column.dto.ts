import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateColumnDto {
  @ApiProperty({ example: 'TO DO', description: 'column title'})
  @IsString({message: 'must be string'})
  @Length(3, 32, {message: 'must be at least 3 characters'})
  readonly title: string;
}