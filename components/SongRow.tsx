
import React, { useState } from 'react';
import { Song } from '../types';
import { PlayIcon, HeartIcon, PauseIcon } from './icons'; // Assuming PauseIcon exists

interface SongRowProps {
  song: Song;
  index: number;
  onPlaySong: (song: Song) => void;
  isCurrentSong: boolean;
  isPlaying: boolean;
}

const SongRow: React.FC<SongRowProps> = ({ song, index, onPlaySong, isCurrentSong, isPlaying }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(Math.random() > 0.3); // Randomly like some songs

  const handlePlayClick = () => {
    onPlaySong(song);
  };

  return (
    <div 
      className={`grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 items-center p-3 rounded-md hover:bg-neutral-800/70 group ${isCurrentSong ? 'bg-neutral-700/50 text-green-400' : 'text-neutral-400'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={handlePlayClick}
    >
      <div className="w-8 text-right text-sm">
        {isHovered ? (
          <button onClick={handlePlayClick} className="text-white">
            {isCurrentSong && isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
          </button>
        ) : (
          isCurrentSong && isPlaying ? <PauseIcon size={16} className="text-green-400 animate-pulse" /> : <span>{index + 1}</span>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <img src={song.albumArtUrl} alt={song.album} className="w-10 h-10 rounded" />
        <div>
          <p className={`font-medium truncate ${isCurrentSong ? 'text-green-400' : 'text-white group-hover:text-green-300'}`}>{song.title}</p>
          <p className="text-xs truncate group-hover:text-neutral-300">{song.artist.name}</p>
        </div>
      </div>
      <div className="text-sm truncate hidden md:block group-hover:text-neutral-300">{song.album}</div>
      <div className="text-sm truncate hidden lg:block group-hover:text-neutral-300">Added 2 weeks ago</div> {/* Placeholder */}
      <div className="flex items-center space-x-3">
        <button onClick={() => setIsLiked(!isLiked)} className={`${isLiked ? 'text-green-500' : 'text-neutral-500 opacity-0 group-hover:opacity-100'} hover:text-green-400`}>
          <HeartIcon filled={isLiked} size={18} />
        </button>
        <span className="text-sm w-10 text-right">{song.duration}</span>
      </div>
    </div>
  );
};

export default SongRow;
