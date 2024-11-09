import { IsString, IsUUID, IsInt, Min, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsUUID('4', { message: 'Invalid artistId format. It must be a UUID v4.' })
  @IsOptional()
  artistId: string | null;

  @IsUUID('4', { message: 'Invalid albumId format. It must be a UUID v4.' })
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @Min(1, { message: 'Duration must be a positive integer.' })
  duration: number;
}

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsUUID('4', { message: 'Invalid artistId format. It must be a UUID v4.' })
  @IsOptional()
  artistId?: string | null;

  @IsUUID('4', { message: 'Invalid albumId format. It must be a UUID v4.' })
  @IsOptional()
  albumId?: string | null;

  @IsInt()
  @Min(1, { message: 'Duration must be a positive integer.' })
  @IsOptional()
  duration?: number;
}

export class TrackDto {
  @IsUUID('4', { message: 'Invalid trackId format. It must be a UUID v4.' })
  id: string;

  @IsString()
  name: string;

  @IsUUID('4', { message: 'Invalid artistId format. It must be a UUID v4.' })
  @IsOptional()
  artistId: string | null;

  @IsUUID('4', { message: 'Invalid albumId format. It must be a UUID v4.' })
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @Min(1, { message: 'Duration must be a positive integer.' })
  duration: number;
}
