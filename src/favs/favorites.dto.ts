export interface Track {
  id: string;
  name: string;
}

export interface Album {
  id: string;
  name: string;
}

export interface Artist {
  id: string;
  name: string;
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
