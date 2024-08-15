import { Column as ColumnDecorator, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Column } from "../../columns/entities/column.entity";
import { Comment } from "../../comments/entities/comment.entity";

@Entity('tasks')
export class Task{
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'serialization bug', description: 'title'})
  @ColumnDecorator()
  title: string;

  @ApiProperty({example: 'codes sometimes scanning twice', description: 'description'})
  @ColumnDecorator()
  description: string;

  @ManyToOne(() => Column, column => column.tasks , { onDelete: 'CASCADE' })
  column: Column;

  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[];
}