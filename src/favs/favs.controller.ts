import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favs.service';
import { Track, Album, Artist } from './favorites.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  removeTrackFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id') id: string) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  removeAlbumFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  @HttpCode(204)
  addArtistToFavorites(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  removeArtistFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }
}
