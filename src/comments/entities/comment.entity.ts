import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Task } from "../../tasks/entities/task.entity";

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'task done', description: 'comment content'})
  @Column()
  content: string;

  @ManyToOne(() => Task, task => task.comments, {onDelete : 'CASCADE' })
  task: Task;
}