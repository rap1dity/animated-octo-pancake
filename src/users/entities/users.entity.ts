import { Column as ColumnDecorator, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Column } from "../../columns/entities/column.entity";


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'timeworstseal@gmail.com', description: 'email'})
  @ColumnDecorator()
  email: string;

  @ApiProperty({example: 'pass123', description: 'password'})
  @ColumnDecorator()
  password: string;

  @OneToMany( () => Column, column => column.user)
  columns: Column[];
}