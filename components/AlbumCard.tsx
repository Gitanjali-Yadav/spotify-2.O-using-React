
import React from 'react';
import { Link } from 'react-router-dom';
import { Album, Playlist } from '../types';
import { PlayIcon } from './icons';

interface AlbumCardProps {
  item: Album | Playlist;
  type: 'album' | 'playlist';
  onPlay?: (item: Album | Playlist) => void; // Optional: To play the first song of the album/playlist
}

const AlbumCard: React.FC<AlbumCardProps> = ({ item, type, onPlay }) => {
  const linkTo = type === 'album' ? `/album/${item.id}` : `/playlist/${item.id}`;
  const subtitle = type === 'album' ? (item as Album).artist.name : (item as Playlist).owner || (item as Playlist).description;

  return (
    <Link to={linkTo} className="block group bg-neutral-800 hover:bg-neutral-700 p-4 rounded-lg shadow-md transition-all duration-300 relative">
      <div className="relative mb-3">
        <img 
          src={item.coverArtUrl} 
          alt={item.name} 
          className="w-full h-auto aspect-square object-cover rounded shadow-lg transition-transform duration-300 group-hover:shadow-xl"
        />
        {onPlay && (
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPlay(item); }}
            className="absolute bottom-2 right-2 bg-green-500 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-300 transform hover:scale-110 focus:outline-none"
            aria-label={`Play ${item.name}`}
          >
            <PlayIcon size={24} filled/>
          </button>
        )}
      </div>
      <h3 className="text-base font-semibold text-white truncate group-hover:text-green-400">{item.name}</h3>
      <p className="text-xs text-neutral-400 truncate">{subtitle}</p>
    </Link>
  );
};

export default AlbumCard;
