import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'timeworstseal@gmail.com', description: 'email'})
  @IsEmail({}, { message: 'incorrect email' })
  @IsString({message: 'must be string'})
  @Length(4, 32, {message: 'must be at least 5 characters'})
  readonly email: string;

  @ApiProperty({ example: 'pass123', description: 'password'})
  @IsString({message: 'must be string'})
  @Length(4, 16, {message: 'must be 5-16 characters long'})
  readonly password: string;
}