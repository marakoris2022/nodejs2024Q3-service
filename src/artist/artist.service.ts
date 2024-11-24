import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async getAllArtists(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async getArtistById(id: string): Promise<Artist> {
    return await this.artistRepository.findOne({ where: { id } });
  }

  async createArtist(artist: Artist): Promise<Artist> {
    return await this.artistRepository.save(artist);
  }

  async updateArtist(id: string, artist: Artist): Promise<Artist> {
    await this.artistRepository.update(id, artist);
    return this.artistRepository.findOne({ where: { id } });
  }

  async deleteArtist(id: string): Promise<void> {
    await this.artistRepository.delete(id);
  }
}
