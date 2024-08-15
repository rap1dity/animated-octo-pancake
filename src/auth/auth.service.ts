import { forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { User } from "../users/entities/users.entity";

@Injectable()
export class AuthService {
  constructor(@Inject(forwardRef(() => UsersService))
              private readonly userService: UsersService,
              private readonly jwtService: JwtService) {}

  async login(dto: CreateUserDto){
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async register(dto: CreateUserDto){
    const candidate = await this.userService.getOneByEmail(dto.email);
    if(candidate)
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    const hashedPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.create({...dto, password: hashedPassword})
    return this.generateToken(user);
  }

  private async generateToken(user: User){
    const payload = {id: user.id, email: user.email, password: user.password}
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(dto: CreateUserDto){
    const user = await this.userService.getOneByEmail(dto.email);
    if(!user)
      throw new UnauthorizedException({message: 'Incorrect username or password'});
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if(user && passwordEquals)
      return user;
    throw new UnauthorizedException({message: 'Incorrect username or password'});
  }
}
