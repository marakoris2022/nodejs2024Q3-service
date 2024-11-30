import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Artist } from './artist/artist.entity';
import { Track } from './track/track.entity';
import { AlbumEntity } from './album/album.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ArtistController } from './artist/artist.controller';
import { TrackController } from './track/track.controller';
import { AlbumController } from './album/album.controller';
import { ArtistService } from './artist/artist.service';
import { UserService } from './user/user.service';
import { TrackService } from './track/track.service';
import { AlbumService } from './album/album.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_container',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nodejs2024q3',
      entities: [User, Artist, Track, AlbumEntity],
      synchronize: false,
      migrations: ['dist/migrations/*.js'],
    }),
    TypeOrmModule.forFeature([User, Artist, Track, AlbumEntity]),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    AppController,
    UserController,
    ArtistController,
    TrackController,
    AlbumController,
  ],
  providers: [
    AppService,
    ArtistService,
    UserService,
    TrackService,
    AlbumService,
  ],
})
export class AppModule {}
