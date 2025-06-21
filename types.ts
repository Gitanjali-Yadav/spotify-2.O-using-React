
export interface Artist {
  id: string;
  name: string;
}

export interface Song {
  id: string;
  title: string;
  artist: Artist;
  album: string; // Album name
  duration: string; // e.g., "3:45"
  albumArtUrl: string; // URL to album art
  audioSrc?: string; // Optional: actual audio file URL for future extension
}

export interface Album {
  id: string;
  name: string;
  artist: Artist;
  coverArtUrl: string;
  songs: Song[];
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverArtUrl: string;
  songs: Song[];
  owner?: string;
}

export enum ViewType {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  PLAYLIST = 'PLAYLIST',
  ALBUM = 'ALBUM',
  LIBRARY = 'LIBRARY'
}
