import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto, UpdateTrackDto, TrackDto } from './track.dto';

@Injectable()
export class TrackService {
  private tracks: TrackDto[] = [];

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  create(track: CreateTrackDto) {
    const newId = uuidv4();
    const newTrack = {
      id: newId,
      ...track,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  update(id: string, updatedTrack: UpdateTrackDto) {
    this.tracks = this.tracks.map((track) => {
      if (track.id === id) {
        return {
          ...track,
          ...updatedTrack,
        };
      }
      return track;
    });

    return this.findOne(id);
  }

  delete(id: string) {
    const removedTrack = this.findOne(id);

    this.tracks = this.tracks.filter((track) => track.id !== id);

    return removedTrack;
  }
}
