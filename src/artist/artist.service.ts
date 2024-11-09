import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Artist } from './artist.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist {
    if (!this.isValidUuid(id)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  createArtist(artist: Artist): Artist {
    if (!artist.name || typeof artist.name !== 'string') {
      throw new BadRequestException('Name is required and should be a string');
    }

    const newArtist = {
      ...artist,
      id: uuidv4(),
    };

    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, artist: Artist): Artist {
    if (!this.isValidUuid(id)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.artists[index] = { ...this.artists[index], ...artist };
    return this.artists[index];
  }

  deleteArtist(id: string): void {
    if (!this.isValidUuid(id)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.artists.splice(index, 1);
  }

  private isValidUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
