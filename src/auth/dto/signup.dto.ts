import { IsString, MinLength, MaxLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  login: string;

  @IsString()
  @MinLength(6)
  password: string;
}
