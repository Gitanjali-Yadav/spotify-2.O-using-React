
import React, { useState, useEffect, useRef } from 'react';
import { Song } from '../types';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, VolumeHighIcon, VolumeMuteIcon, HeartIcon } from './icons';

interface PlayerBarProps {
  currentTrack: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  // These would be used if actual audio was playing
  // currentTime: number; 
  // duration: number;
  // onSeek: (time: number) => void;
  // onVolumeChange: (volume: number) => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
}) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying && currentTrack) {
      // Simulate progress for a 3:00 minute song (180 seconds)
      const simulatedDuration = 180; 
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          const nextProgress = prev + (100 / simulatedDuration); // Increment progress
          if (nextProgress >= 100) {
            clearInterval(intervalRef.current!);
            // Potentially call onNext() here or handle song end
            return 100;
          }
          return nextProgress;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    // Reset progress if track changes
    if (!isPlaying || !currentTrack) {
        setProgress(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    // Reset progress when a new track is selected, even if it was already playing
    setProgress(0);
    setIsLiked(Math.random() > 0.5); // Randomly like a song
  }, [currentTrack]);


  const formatTime = (percentage: number) => {
    if (!currentTrack) return "0:00";
    // Simulate time based on percentage of a 3:00 track
    const totalSeconds = 180 * (percentage / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.75); // Restore to a default volume
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-neutral-900 border-t border-neutral-800 p-4 flex items-center justify-center text-neutral-500">
        No song selected.
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-neutral-900 border-t border-neutral-800 p-4 grid grid-cols-3 items-center text-white">
      {/* Left: Song Info */}
      <div className="flex items-center space-x-3">
        <img src={currentTrack.albumArtUrl} alt={currentTrack.album} className="w-14 h-14 rounded" />
        <div>
          <h3 className="text-sm font-semibold truncate">{currentTrack.title}</h3>
          <p className="text-xs text-neutral-400 truncate">{currentTrack.artist.name}</p>
        </div>
        <button onClick={() => setIsLiked(!isLiked)} className="text-neutral-400 hover:text-white">
            <HeartIcon filled={isLiked} className={isLiked ? 'text-green-500' : ''} size={18}/>
        </button>
      </div>

      {/* Center: Playback Controls & Progress */}
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-4 mb-1">
          <button onClick={onPrev} className="text-neutral-400 hover:text-white transition-colors">
            <SkipBackIcon size={20} />
          </button>
          <button 
            onClick={onPlayPause} 
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
          >
            {isPlaying ? <PauseIcon size={20} filled/> : <PlayIcon size={20} filled/>}
          </button>
          <button onClick={onNext} className="text-neutral-400 hover:text-white transition-colors">
            <SkipForwardIcon size={20} />
          </button>
        </div>
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-xs text-neutral-400">{formatTime(progress)}</span>
          <div className="w-full h-1 bg-neutral-600 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-1000 ease-linear" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-neutral-400">{currentTrack.duration}</span>
        </div>
      </div>

      {/* Right: Volume Control */}
      <div className="flex items-center justify-end space-x-3">
        <button onClick={toggleMute} className="text-neutral-400 hover:text-white">
            {isMuted || volume === 0 ? <VolumeMuteIcon size={20}/> : <VolumeHighIcon size={20}/>}
        </button>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 accent-green-500 bg-neutral-600 rounded-full appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PlayerBar;
