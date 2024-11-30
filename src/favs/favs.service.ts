import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Track, Album, Artist } from './favorites.dto';

@Injectable()
export class FavoritesService {
  private favoriteTracks: Track[] = [];
  private favoriteAlbums: Album[] = [];
  private favoriteArtists: Artist[] = [];

  getAllFavorites() {
    return {
      artists: this.favoriteArtists,
      albums: this.favoriteAlbums,
      tracks: this.favoriteTracks,
    };
  }

  addTrackToFavorites(trackId: string) {
    if (!this.isValidUuid(trackId)) {
      throw new BadRequestException('Invalid track ID');
    }
    const trackExists = true;

    if (!trackExists) {
      throw new NotFoundException('Track not found');
    }

    const track = { id: trackId, name: 'Track Name' };
    this.favoriteTracks.push(track);

    return { message: 'Track added to favorites', track };
  }

  removeTrackFromFavorites(trackId: string) {
    if (!this.isValidUuid(trackId)) {
      throw new BadRequestException('Invalid track ID');
    }

    const trackIndex = this.favoriteTracks.findIndex(
      (track) => track.id === trackId,
    );

    if (trackIndex === -1) {
      throw new NotFoundException('Track not found in favorites');
    }

    this.favoriteTracks.splice(trackIndex, 1);
    return { message: 'Track removed from favorites' };
  }

  addAlbumToFavorites(albumId: string) {
    if (!this.isValidUuid(albumId)) {
      throw new BadRequestException('Invalid album ID');
    }

    const albumExists = true;

    if (!albumExists) {
      throw new NotFoundException('Album not found');
    }

    const album = { id: albumId, name: 'Album Name' };
    this.favoriteAlbums.push(album);

    return { message: 'Album added to favorites', album };
  }

  removeAlbumFromFavorites(albumId: string) {
    if (!this.isValidUuid(albumId)) {
      throw new BadRequestException('Invalid album ID');
    }

    const albumIndex = this.favoriteAlbums.findIndex(
      (album) => album.id === albumId,
    );

    if (albumIndex === -1) {
      throw new NotFoundException('Album not found in favorites');
    }

    this.favoriteAlbums.splice(albumIndex, 1);
    return { message: 'Album removed from favorites' };
  }

  addArtistToFavorites(artistId: string) {
    if (!this.isValidUuid(artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const artistExists = true;

    if (!artistExists) {
      throw new NotFoundException('Artist not found');
    }

    const artist = { id: artistId, name: 'Artist Name' };
    this.favoriteArtists.push(artist);

    return { message: 'Artist added to favorites', artist };
  }

  removeArtistFromFavorites(artistId: string) {
    if (!this.isValidUuid(artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const artistIndex = this.favoriteArtists.findIndex(
      (artist) => artist.id === artistId,
    );

    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }

    this.favoriteArtists.splice(artistIndex, 1);
    return { message: 'Artist removed from favorites' };
  }

  private isValidUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
