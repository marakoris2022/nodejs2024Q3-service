import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from 'src/interface/interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private user: User[] = [];

  findAll() {
    return this.user;
  }

  findOne(id: string) {
    const user = this.user.find((user) => user.id === id);

    return user;
  }

  create(user: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      version: 1,
      ...user,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.user.push(newUser);

    return newUser;
  }

  update(id: string, updatedUser: UpdatePasswordDto) {
    this.user = this.user.map((user) => {
      if (user.id === id && user.password === updatedUser.oldPassword) {
        return {
          ...user,
          password: updatedUser.newPassword,
          updatedAt: Date.now(),
          version: user.version + 1,
        };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: string) {
    const removedUser = this.findOne(id);

    this.user = this.user.filter((user) => user.id !== id);

    return removedUser;
  }
}
