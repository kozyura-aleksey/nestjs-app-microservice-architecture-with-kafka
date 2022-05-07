import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserDto } from './dto/user.dto';
import { IUser } from './interfaces/users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @MessagePattern('create.user')
  createUser(@Body() dto: UserDto): Promise<IUser> {
    const user = this.userService.createUser(dto);
    return user;
  }

  @MessagePattern('get.user')
  getUser(id: string): Promise<IUser> {
    const user = this.userService.getUserById(id);
    console.log(user);
    return user;
  }

  @MessagePattern('get.users')
  getUsers(): Promise<IUser[]> {
    const users = this.userService.getUsers();
    return users;
  }

  @MessagePattern('update.user')
  updateUser(id: string, @Body() dto: UserDto): Promise<IUser> {
    const user = this.userService.updateUser(id, dto);
    return user;
  }

  @MessagePattern('delete.user')
  deleteUser(id: string): Promise<IUser> {
    const user = this.userService.deleteUser(id);
    return user;
  }
}
