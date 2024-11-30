import {
  IsUUID,
  IsInt,
  Min,
  IsNumber,
  IsString,
  Matches,
  IsOptional,
} from 'class-validator';

export class UserResponseDto {
  @IsUUID('4', { message: 'Invalid userId format. It must be a UUID v4.' })
  id: string;

  @IsString()
  login: string;

  @IsInt()
  @Min(1, { message: 'Version must be at least 1.' })
  version: number;

  @IsNumber()
  createdAt: number;

  @IsNumber()
  updatedAt: number;
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

  @IsString()
  password: string;
}

export class UserDto {
  @IsUUID('4')
  id: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsInt()
  @Min(1)
  version: number;

  @IsInt()
  createdAt: number;

  @IsInt()
  updatedAt: number;
}
