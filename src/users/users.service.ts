import { forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService) {}

  async create(dto: CreateUserDto){
    const user = this.usersRepository.create(dto);
    return await this.usersRepository.save(user);
  }

  async getOneById(userId: number){
    const user = await this.usersRepository.findOne({where: { id: userId }})
    if(!user)
      throw new HttpException(`User with id ${userId} not found`, HttpStatus.BAD_REQUEST);
    return user;
  }

  async getOneByEmail(email: string){
    return await this.usersRepository.findOne({where: {email}})
  }

  async update(userId: number, dto: CreateUserDto){
    const hashedPassword = await bcrypt.hash(dto.password, 5);
    const result = await this.usersRepository.update(userId, {...dto, password: hashedPassword});
    if(result.affected === 0)
      throw new HttpException(`User with id ${userId} not found`, HttpStatus.BAD_REQUEST);
    return this.authService.login(dto);
  }

  async delete(userId: number){
    const result = await this.usersRepository.delete(userId);
    if(result.affected === 0)
      throw new HttpException(`User with id ${userId} not found`, HttpStatus.BAD_REQUEST);
    return result;
  }
}
