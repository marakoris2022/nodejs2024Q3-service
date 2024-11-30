import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsBoolean, IsString, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsBoolean()
  grammy: boolean;

  constructor(name: string, grammy = false) {
    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;
  }
}
