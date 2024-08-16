import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ValidationPipe } from "../pipes/validation.pipe";
import { Comment } from "./entities/comment.entity";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { AccessGuard } from "../guards/access.guard";

@ApiTags('Comments')
@UseGuards(JwtAuthGuard, AccessGuard)
@Controller('users/:userId/columns/:columnId/tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({summary: 'Create comment'})
  @ApiResponse({status: 200, type: Comment})
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() dto: CreateCommentDto,
               @Param('taskId', ParseIntPipe) taskId: number) {
    return await this.commentsService.create(dto, taskId);
  }

  @ApiOperation({summary: 'Get all user comments in task'})
  @ApiResponse({status: 200, type: Comment})
  @Get()
  async getAll(@Param('taskId', ParseIntPipe) taskId: number) {
    return await this.commentsService.getAll(taskId);
  }

  @ApiOperation({summary: 'Get user comment by id'})
  @ApiResponse({status: 200, type: Comment})
  @Get(':commentId')
  async getOneById(@Param('commentId', ParseIntPipe) commentId: number){
    return await this.commentsService.getOneById(commentId);
  }

  @ApiOperation({summary: 'Update existing user comment in task'})
  @ApiResponse({status: 200, type: Comment})
  @UsePipes(ValidationPipe)
  @Put(':commentId')
  async update(@Param('commentId', ParseIntPipe) commentId: number,
               @Body() dto: CreateCommentDto){
    return await this.commentsService.update(commentId, dto);
  }

  @ApiOperation({summary: 'Delete existing user comment in task'})
  @ApiResponse({status: 200, type: Comment})
  @Delete(':commentId')
  async delete(@Param('commentId', ParseIntPipe) commentId: number){
    return await this.commentsService.delete(commentId);
  }
}
