import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Album } from './album.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    if (!this.isValidUuid(id)) {
      throw new BadRequestException('Invalid album ID');
    }

    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  createAlbum(album: Album): Album {
    if (!album.name || typeof album.name !== 'string') {
      throw new BadRequestException('Name is required and should be a string');
    }

    const newAlbum = {
      ...album,
      id: uuidv4(),
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, album: Album): Album {
    if (!this.isValidUuid(id)) {
      throw new BadRequestException('Invalid album ID');
    }

    if (!album.name || typeof album.name !== 'string') {
      throw new BadRequestException('Name is required and should be a string');
    }

    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.albums[index] = { ...this.albums[index], ...album };
    return this.albums[index];
  }

  deleteAlbum(id: string): void {
    if (!this.isValidUuid(id)) {
      throw new BadRequestException('Invalid album ID');
    }

    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.albums.splice(index, 1);
  }

  private isValidUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
