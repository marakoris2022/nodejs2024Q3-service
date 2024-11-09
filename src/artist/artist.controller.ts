import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  createArtist(@Body() artist: Artist) {
    return this.artistService.createArtist(artist);
  }

  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() artist: Artist) {
    return this.artistService.updateArtist(id, artist);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
