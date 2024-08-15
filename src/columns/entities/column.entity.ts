import { Entity, PrimaryGeneratedColumn, Column as ColumnDecorator, ManyToOne, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/users.entity";
import { Task } from "../../tasks/entities/task.entity";

@Entity('columns')
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'TO DO', description: 'column title'})
  @ColumnDecorator()
  title: string;

  @ManyToOne(() => User, user => user.columns, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Task, task => task.column)
  tasks: Task[];
}