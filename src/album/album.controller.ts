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
import { AlbumService } from './album.service';
import { Album } from './album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string) {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  createAlbum(@Body() album: Album) {
    return this.albumService.createAlbum(album);
  }

  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() album: Album) {
    return this.albumService.updateAlbum(id, album);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    this.albumService.deleteAlbum(id);
  }
}
