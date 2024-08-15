import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateTaskDto {
  @ApiProperty({ example: 'serialization bug', description: 'task title'})
  @IsString({message: 'must be string'})
  @Length(3, 32, {message: 'must be at least 3 characters'})
  readonly title: string;

  @ApiProperty({ example: 'codes sometimes scanning twice', description: 'task title'})
  @IsString({message: 'must be string'})
  @Length(1, 128, {message: "can't be empty"})
  readonly description: string;
}