import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateColumnDto } from "./dto/create-column.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Column } from "./entities/column.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class ColumnsService {
  constructor(@InjectRepository(Column)
              private readonly columnsRepository: Repository<Column>,
              private readonly usersService: UsersService) {}

  async create(dto: CreateColumnDto, userId: number){
    const user = await this.usersService.getOneById(userId);
    const column = this.columnsRepository.create({...dto, user: user});
    return await this.columnsRepository.save(column);
  }

  async getAll(userId: number){
    const user = await this.usersService.getOneById(userId);
    return await this.columnsRepository.find({ where: { user } } )
  }

  async getOneById(columnId: number){
    const column = await this.columnsRepository.findOne({where: { id: columnId }})
    if(!column)
      throw new HttpException(`Column with id ${columnId} not found`, HttpStatus.BAD_REQUEST);
    return column;
  }

  async update(columnId: number, dto: CreateColumnDto) {
    const result = await this.columnsRepository.update(columnId, dto);
    if(result.affected === 0)
      throw new HttpException(`Column with id ${columnId} not found`, HttpStatus.BAD_REQUEST);
    return result;
  }

  async delete(columnId: number){
    const result= await this.columnsRepository.delete(columnId);
    if(result.affected === 0)
      throw new HttpException(`Column with id ${columnId} not found`, HttpStatus.BAD_REQUEST);
    return result;
  }
}
