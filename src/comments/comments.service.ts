import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Repository } from "typeorm";
import { TasksService } from "../tasks/tasks.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment)
              private readonly commentRepository: Repository<Comment>,
              private readonly tasksService: TasksService) {}

  async create(dto: CreateCommentDto, taskId: number){
    const task = await this.tasksService.getOneById(taskId);
    const comment = this.commentRepository.create({...dto, task});
    return await this.commentRepository.save(comment);
  }

  async getAll(taskId: number){
    const task = await this.tasksService.getOneById(taskId);
    return await this.commentRepository.find({where: {task} })
  }

  async getOneById(commentId: number){
    const task = await this.commentRepository.findOne({where: {id : commentId}})
    if(!task)
      throw new HttpException(`Comment with id ${commentId} not found`, HttpStatus.BAD_REQUEST);
    return task;
  }

  async update(commentId: number, dto: CreateCommentDto) {
    const result = await this.commentRepository.update(commentId, dto);
    if(result.affected === 0)
      throw new HttpException(`commentId with id ${commentId} not found`, HttpStatus.BAD_REQUEST);
    return result;
  }

  async delete(commentId: number){
    const result= await this.commentRepository.delete(commentId);
    if(result.affected === 0)
      throw new HttpException(`commentId with id ${commentId} not found`, HttpStatus.BAD_REQUEST);
    return result;
  }
}
