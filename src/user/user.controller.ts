import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    try {
      return await this.userService.create(user);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userUpdate: UpdatePasswordDto) {
    try {
      return await this.userService.update(id, userUpdate);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      await this.userService.delete(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
