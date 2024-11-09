import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdatePasswordDto, UserDto } from './user.dto';

@Injectable()
export class UserService {
  private user: UserDto[] = [];

  findAll() {
    return this.user;
  }

  findOne(id: string) {
    const user = this.user.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  create(user: CreateUserDto) {
    const newId = uuidv4();
    const newUser = {
      id: newId,
      version: 1,
      ...user,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.user.push(newUser);

    return newUser;
  }

  update(id: string, updatedUser: UpdatePasswordDto) {
    const user = this.findOne(id);
    if (user.password !== updatedUser.oldPassword) {
      throw new BadRequestException('Old password is incorrect');
    }

    user.password = updatedUser.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    return user;
  }

  delete(id: string) {
    const user = this.findOne(id);

    this.user = this.user.filter((user) => user.id !== id);

    return user;
  }
}
