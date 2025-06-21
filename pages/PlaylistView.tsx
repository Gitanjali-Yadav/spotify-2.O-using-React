
import React from 'react';
import { useParams } from 'react-router-dom';
import { Song, Playlist } from '../types';
import { findPlaylistById } from '../constants'; // Make sure this exists and works
import SongRow from '../components/SongRow';
import { PlayIcon, HeartIcon, ClockIcon } from '../components/icons';

interface PlaylistViewProps {
  onPlaySong: (song: Song) => void;
  onPlayPlaylist: (playlist: Playlist) => void;
  currentTrack: Song | null;
  isPlaying: boolean;
}

const PlaylistView: React.FC<PlaylistViewProps> = ({ onPlaySong, onPlayPlaylist, currentTrack, isPlaying }) => {
  const { playlistId } = useParams<{ playlistId: string }>();
  
  // In a real app, you'd fetch this. Using mock data for now.
  const playlist = playlistId ? findPlaylistById(playlistId) : undefined;

  if (!playlist) {
    return <div className="p-6 text-white">Playlist not found.</div>;
  }
  
  const totalDurationMinutes = playlist.songs.reduce((acc, song) => {
    const parts = song.duration.split(':');
    return acc + parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }, 0) / 60;


  return (
    <div className="text-white">
      {/* Playlist Header */}
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 bg-gradient-to-b from-purple-700 via-purple-800 to-neutral-900">
        <img 
          src={playlist.coverArtUrl} 
          alt={playlist.name} 
          className="w-48 h-48 md:w-56 md:h-56 object-cover rounded shadow-2xl"
        />
        <div className="flex flex-col space-y-2 text-center md:text-left">
          <span className="text-xs font-semibold uppercase">Playlist</span>
          <h1 className="text-4xl md:text-6xl font-extrabold break-words">{playlist.name}</h1>
          {playlist.description && <p className="text-neutral-300 text-sm">{playlist.description}</p>}
          <div className="flex items-center space-x-2 text-xs text-neutral-300 justify-center md:justify-start">
            <span>{playlist.owner || 'Spotify'}</span>
            <span>•</span>
            <span>{playlist.songs.length} songs,</span>
            <span>about {Math.round(totalDurationMinutes / 60)} hr {Math.round(totalDurationMinutes % 60)} min</span>
          </div>
        </div>
      </div>

      {/* Action Buttons & Song List */}
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <button 
            onClick={() => onPlayPlaylist(playlist)}
            className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform focus:outline-none"
            aria-label={`Play ${playlist.name}`}
          >
            <PlayIcon size={28} filled />
          </button>
          <button className="text-neutral-400 hover:text-white">
            <HeartIcon size={32} />
          </button>
          {/* More actions can go here, e.g., three-dot menu */}
        </div>

        {/* Song List Header */}
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 items-center px-3 py-2 border-b border-neutral-700 text-neutral-400 text-xs uppercase tracking-wider mb-2">
          <span className="w-8 text-right">#</span>
          <span>Title</span>
          <span className="hidden md:block">Album</span>
          <span className="hidden lg:block">Date Added</span>
          <span className="flex justify-end"><ClockIcon size={16}/></span>
        </div>

        {/* Songs */}
        <div className="space-y-1">
          {playlist.songs.map((song, index) => (
            <SongRow 
              key={song.id} 
              song={song} 
              index={index} 
              onPlaySong={onPlaySong}
              isCurrentSong={currentTrack?.id === song.id}
              isPlaying={isPlaying && currentTrack?.id === song.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;
