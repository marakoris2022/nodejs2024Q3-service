import {
  IsUUID,
  IsInt,
  Min,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @Length(4, 20, { message: 'Login must be between 4 and 20 characters.' })
  login: string;

  @IsString()
  @Length(8, 50, { message: 'Password must be between 8 and 50 characters.' })
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @Length(8, 50, {
    message: 'Old password must be between 8 and 50 characters.',
  })
  oldPassword: string;

  @IsString()
  @Length(8, 50, {
    message: 'New password must be between 8 and 50 characters.',
  })
  newPassword: string;
}

export class UserDto {
  @IsUUID('4', { message: 'Invalid userId format. It must be a UUID v4.' })
  id: string;

  @IsString()
  @Length(4, 20, { message: 'Login must be between 4 and 20 characters.' })
  login: string;

  @IsString()
  @Length(8, 50, { message: 'Password must be between 8 and 50 characters.' })
  password: string;

  @IsInt()
  @Min(1, { message: 'Version must be at least 1.' })
  version: number;

  @IsNumber()
  createdAt: number; // Timestamp of creation

  @IsNumber()
  updatedAt: number; // Timestamp of last update
}
