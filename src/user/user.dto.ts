import { IsUUID, IsInt, Min, IsNumber, IsString } from 'class-validator';

export class UserResponseDto {
  @IsUUID('4', { message: 'Invalid userId format. It must be a UUID v4.' })
  id: string;

  @IsString()
  login: string;

  @IsInt()
  @Min(1, { message: 'Version must be at least 1.' })
  version: number;

  @IsNumber()
  createdAt: number; // Timestamp of creation

  @IsNumber()
  updatedAt: number; // Timestamp of last update
}

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}

export class UserDto {
  @IsUUID('4', { message: 'Invalid userId format. It must be a UUID v4.' })
  id: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsInt()
  @Min(1, { message: 'Version must be at least 1.' })
  version: number;

  @IsNumber()
  createdAt: number; // Timestamp of creation

  @IsNumber()
  updatedAt: number; // Timestamp of last update
}
