import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ColumnsService } from "./columns.service";
import { Column } from "./entities/column.entity";
import { CreateColumnDto } from "./dto/create-column.dto";
import { AccessGuard } from "../guards/access.guard";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Columns')
@UseGuards(JwtAuthGuard, AccessGuard)
@Controller('users/:userId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({summary: 'Create column'})
  @ApiResponse({status: 200, type: Column})
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() dto: CreateColumnDto,
               @Param('userId', ParseIntPipe) userId: number){
    return await this.columnsService.create(dto, userId);
  }

  @ApiOperation({summary: 'Get all user columns'})
  @ApiResponse({status: 200, type: Column})
  @Get()
  async getAll(@Param('userId', ParseIntPipe) userId: number){
    return await this.columnsService.getAll(userId);
  }

  @ApiOperation({summary: 'Get user column by id'})
  @ApiResponse({status: 200, type: Column})
  @Get(':columnId')
  async getOneById(@Param('columnId', ParseIntPipe) columnId: number){
    return await this.columnsService.getOneById(columnId);
  }

  @ApiOperation({summary: 'Update existing user column'})
  @ApiResponse({status: 200, type: Column})
  @UsePipes(ValidationPipe)
  @Put(':columnId')
  async update(@Param('columnId', ParseIntPipe) columnId: number,
               @Body() dto: CreateColumnDto){
    return await this.columnsService.update(columnId, dto);
  }

  @ApiOperation({summary: 'Delete existing user column'})
  @ApiResponse({status: 200})
  @Delete(':columnId')
  async delete(@Param('columnId', ParseIntPipe) columnId: number){
    return await this.columnsService.delete(columnId);
  }
}
