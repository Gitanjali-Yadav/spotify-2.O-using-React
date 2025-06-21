
import { Artist, Song, Album, Playlist } from './types';

const genericArtist: Artist = { id: 'artist1', name: 'The Midnight' };
const artist2: Artist = { id: 'artist2', name: 'FM-84' };
const artist3: Artist = { id: 'artist3', name: 'Gunship' };

export const mockSongs: Song[] = [
  { id: 'song1', title: 'Sunset', artist: genericArtist, album: 'Endless Summer', duration: '5:18', albumArtUrl: 'https://picsum.photos/seed/sunset/300/300' },
  { id: 'song2', title: 'Vampires', artist: genericArtist, album: 'Nocturnal', duration: '4:30', albumArtUrl: 'https://picsum.photos/seed/vampires/300/300' },
  { id: 'song3', title: 'Lost Boy', artist: genericArtist, album: 'Kids', duration: '3:55', albumArtUrl: 'https://picsum.photos/seed/lostboy/300/300' },
  { id: 'song4', title: 'Running in the Night', artist: artist2, album: 'Atlas', duration: '4:20', albumArtUrl: 'https://picsum.photos/seed/atlasfm/300/300' },
  { id: 'song5', title: 'Tech Noir', artist: artist3, album: 'GUNSHIP', duration: '4:50', albumArtUrl: 'https://picsum.photos/seed/technoir/300/300' },
  { id: 'song6', title: 'Days of Thunder', artist: genericArtist, album: 'Days of Thunder', duration: '5:25', albumArtUrl: 'https://picsum.photos/seed/daysofthunder/300/300' },
  { id: 'song7', title: 'Jason', artist: genericArtist, album: 'Endless Summer', duration: '5:30', albumArtUrl: 'https://picsum.photos/seed/jason/300/300' },
  { id: 'song8', title: 'Shadows', artist: genericArtist, album: 'Monsters', duration: '6:11', albumArtUrl: 'https://picsum.photos/seed/shadows/300/300' },
  { id: 'song9', title: 'Wild Heart', artist: artist2, album: 'Atlas', duration: '3:58', albumArtUrl: 'https://picsum.photos/seed/wildheart/300/300' },
  { id: 'song10', title: 'When You Grow Up, Your Heart Dies', artist: artist3, album: 'Dark All Day', duration: '5:48', albumArtUrl: 'https://picsum.photos/seed/darkallday/300/300' },
];

export const mockAlbums: Album[] = [
  { id: 'album1', name: 'Endless Summer', artist: genericArtist, coverArtUrl: 'https://picsum.photos/seed/album1/300/300', songs: [mockSongs[0], mockSongs[6]] },
  { id: 'album2', name: 'Nocturnal', artist: genericArtist, coverArtUrl: 'https://picsum.photos/seed/album2/300/300', songs: [mockSongs[1]] },
  { id: 'album3', name: 'Atlas', artist: artist2, coverArtUrl: 'https://picsum.photos/seed/album3/300/300', songs: [mockSongs[3], mockSongs[8]] },
  { id: 'album4', name: 'GUNSHIP', artist: artist3, coverArtUrl: 'https://picsum.photos/seed/album4/300/300', songs: [mockSongs[4]] },
  { id: 'album5', name: 'Monsters', artist: genericArtist, coverArtUrl: 'https://picsum.photos/seed/album5/300/300', songs: [mockSongs[7]] },
];

export const mockPlaylists: Playlist[] = [
  { id: 'playlist1', name: 'Synthwave Dreams', description: 'Retro waves for late night drives.', coverArtUrl: 'https://picsum.photos/seed/playlist1/300/300', songs: [mockSongs[0], mockSongs[1], mockSongs[3], mockSongs[4]], owner: 'Spotify' },
  { id: 'playlist2', name: 'Chill Vibes', description: 'Relax and unwind with these tunes.', coverArtUrl: 'https://picsum.photos/seed/playlist2/300/300', songs: [mockSongs[2], mockSongs[5], mockSongs[8]], owner: 'User123' },
  { id: 'playlist3', name: 'Liked Songs', description: 'Your favorite tracks.', coverArtUrl: 'https://picsum.photos/seed/liked/300/300', songs: [mockSongs[0], mockSongs[4], mockSongs[7], mockSongs[9]] },
  { id: 'playlist4', name: 'Focus Flow', description: 'Instrumental synth to concentrate.', coverArtUrl: 'https://picsum.photos/seed/focus/300/300', songs: [mockSongs[0], mockSongs[6]] },
  { id: 'playlist5', name: 'Workout Beats', description: 'High energy tracks for your workout.', coverArtUrl: 'https://picsum.photos/seed/workout/300/300', songs: [mockSongs[1], mockSongs[4], mockSongs[9]] },
];

export const mockCategories = [
    { id: 'cat1', name: 'Focus', playlists: [mockPlaylists[3]]},
    { id: 'cat2', name: 'Chill', playlists: [mockPlaylists[1]]},
    { id: 'cat3', name: 'Made For You', playlists: [mockPlaylists[0], mockPlaylists[4]] },
    { id: 'cat4', name: 'Recently Played', playlists: [mockPlaylists[2], mockAlbums[0], mockAlbums[2]]}
]

// Add a helper to find a playlist by ID, used in PlaylistView
export const findPlaylistById = (id: string): Playlist | undefined => {
    return mockPlaylists.find(p => p.id === id);
};
