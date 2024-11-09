import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdatePasswordDto, UserDto } from './user.dto';

@Injectable()
export class UserService {
  private user: UserDto[] = [];

  findAll() {
    return this.user.map(({ password, ...user }) => user);
  }

  findOne(id: string) {
    const user = this.user.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
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

    const { password, ...resUser } = newUser;

    return resUser;
  }

  update(id: string, updatedUser: UpdatePasswordDto) {
    const user = this.user.find((user) => user.id === id);

    if (!this.isValidUuid(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.password !== updatedUser.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = updatedUser.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    const { password, ...resUser } = user;

    return resUser;
  }

  delete(id: string) {
    this.findOne(id);

    this.user = this.user.filter((user) => user.id !== id);
  }

  private isValidUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
