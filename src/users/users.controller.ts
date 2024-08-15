import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { User } from "./entities/users.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: 'Get concrete user'})
  @ApiResponse({status: 200, type: User})
  @Get(':userId')
  async getOneById(@Param('userId', ParseIntPipe) userId: number){
    return await this.usersService.getOneById(userId);
  }

  @ApiOperation({summary: 'Update user'})
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Put(':userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: CreateUserDto){
    return await this.usersService.update(userId, dto);
  }


  @ApiOperation({summary: 'Delete user'})
  @ApiResponse({status: 200, type: User})
  @Delete(':userId')
  async delete(
    @Param('userId', ParseIntPipe) userId: number){
    return await this.usersService.delete(userId);
  }

}
