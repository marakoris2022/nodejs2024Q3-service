import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    const track = this.trackRepository.create(createTrackDto);
    return this.trackRepository.save(track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);
    const updatedTrack = Object.assign(track, updateTrackDto);
    return this.trackRepository.save(updatedTrack);
  }

  async delete(id: string) {
    const track = await this.findOne(id);
    return this.trackRepository.remove(track);
  }
}
