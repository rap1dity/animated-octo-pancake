import { Body, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { ColumnsService } from "../columns/columns.service";
import { CreateColumnDto } from "../columns/dto/create-column.dto";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly columnsService: ColumnsService) {}

  async create(dto: CreateTaskDto, columnId: number) {
    const column = await this.columnsService.getOneById(columnId);
    const task =  this.taskRepository.create({...dto, column})
    return await this.taskRepository.save(task);
  }

  async getAll(columnId: number){
    const column = await this.columnsService.getOneById(columnId);
    return await this.taskRepository.find({where: {column} })
  }

  async getOneById(taskId: number){
    const task = await this.taskRepository.findOne({where: {id : taskId}})
    if(!task)
      throw new HttpException(`Task with id ${taskId} not found`, HttpStatus.BAD_REQUEST);
    return task;
  }

  async update(taskId: number, dto: CreateColumnDto) {
    const result = await this.taskRepository.update(taskId, dto);
    if(result.affected === 0)
      throw new HttpException(`Task with id ${taskId} not found`, HttpStatus.BAD_REQUEST);
    return result;
  }

  async delete(taskId: number){
    const result= await this.taskRepository.delete(taskId);
    if(result.affected === 0)
      throw new HttpException(`Task with id ${taskId} not found`, HttpStatus.BAD_REQUEST);
    return result;
  }
}
