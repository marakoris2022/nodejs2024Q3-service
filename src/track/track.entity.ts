import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsUUID, IsInt, Min, IsOptional } from 'class-validator';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4', { message: 'Invalid trackId format. It must be a UUID v4.' })
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsUUID('4', { message: 'Invalid artistId format. It must be a UUID v4.' })
  @IsOptional()
  artistId: string | null;

  @Column({ nullable: true })
  @IsUUID('4', { message: 'Invalid albumId format. It must be a UUID v4.' })
  @IsOptional()
  albumId: string | null;

  @Column()
  @IsInt()
  @Min(1, { message: 'Duration must be a positive integer.' })
  duration: number;
}
