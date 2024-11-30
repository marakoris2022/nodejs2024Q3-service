import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { Artist } from './artist/artist.entity';
import { Track } from './track/track.entity';
import { AlbumEntity } from './album/album.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres_container',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nodejs2024q3',
  entities: [User, Artist, Track, AlbumEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
