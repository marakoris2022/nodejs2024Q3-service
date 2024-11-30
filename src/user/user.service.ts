import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(login: string, hashedPassword: string, version = 1) {
    const user = this.userRepository.create({
      login,
      password: hashedPassword,
      version,
    });

    return await this.userRepository.save(user);
  }

  async create(user: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { login: user.login },
    });
    if (existingUser) {
      throw new ConflictException('User with this login already exists');
    }
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, userUpdate: UpdatePasswordDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = userUpdate.password;
    user.version += 1;
    return await this.userRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.remove(user);
  }

  async findByLogin(login: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { login } });
  }
}
