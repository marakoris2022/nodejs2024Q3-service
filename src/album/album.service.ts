import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { Album } from './album.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAllAlbums(): Promise<AlbumEntity[]> {
    return this.albumRepository.find();
  }

  async getAlbumById(id: string): Promise<AlbumEntity> {
    if (!this.isValidUuid(id)) {
      throw new BadRequestException('Invalid album ID');
    }

    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async createAlbum(album: Album): Promise<AlbumEntity> {
    if (!album.name || typeof album.name !== 'string') {
      throw new BadRequestException('Name is required and should be a string');
    }

    const newAlbum = this.albumRepository.create({
      ...album,
      id: uuidv4(),
    });

    return this.albumRepository.save(newAlbum);
  }

  async updateAlbum(id: string, album: Album): Promise<AlbumEntity> {
    if (!this.isValidUuid(id)) {
      throw new BadRequestException('Invalid album ID');
    }

    if (!album.name || typeof album.name !== 'string') {
      throw new BadRequestException('Name is required and should be a string');
    }

    const existingAlbum = await this.albumRepository.findOne({ where: { id } });
    if (!existingAlbum) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = this.albumRepository.merge(existingAlbum, album);
    return this.albumRepository.save(updatedAlbum);
  }

  async deleteAlbum(id: string): Promise<void> {
    if (!this.isValidUuid(id)) {
      throw new BadRequestException('Invalid album ID');
    }

    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.albumRepository.remove(album);
  }

  private isValidUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
