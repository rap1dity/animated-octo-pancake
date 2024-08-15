import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { AccessGuard } from "../guards/access.guard";
import { Task } from "./entities/task.entity";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Tasks')
@UseGuards(JwtAuthGuard, AccessGuard)
@Controller('users/:userId/columns/:columnId/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @ApiOperation({summary: 'Create task'})
  @ApiResponse({status: 200, type: Task})
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() dto: CreateTaskDto,
               @Param('columnId', ParseIntPipe) columnId: number) {
    return await this.taskService.create(dto, columnId);
  }

  @ApiOperation({summary: 'Get all user tasks'})
  @ApiResponse({status: 200, type: Task})
  @Get()
  async getAll(@Param('columnId', ParseIntPipe) columnId: number) {
    return await this.taskService.getAll(columnId);
  }

  @ApiOperation({summary: 'Get user task by id'})
  @ApiResponse({status: 200, type: Task})
  @Get(':taskId')
  async getOneById(@Param('taskId', ParseIntPipe) taskId: number) {
    return await this.taskService.getOneById(taskId);
  }

  @ApiOperation({summary: 'Update existing user task'})
  @ApiResponse({status: 200, type: Task})
  @UsePipes(ValidationPipe)
  @Put(':taskId')
  async update(@Param('taskId', ParseIntPipe) taskId: number,
               @Body() dto: CreateTaskDto) {
    return await this.taskService.update(taskId, dto);
  }

  @ApiOperation({summary: 'Delete existing user task'})
  @ApiResponse({status: 200, type: Task})
  @Delete(':taskId')
  async delete(@Param('taskId', ParseIntPipe) taskId: number) {
    return await this.taskService.delete(taskId);
  }
}
