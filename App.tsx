
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';
import HomePage from './pages/HomePage';
import PlaylistView from './pages/PlaylistView';
import SearchView from './pages/SearchView';
import { Song, Playlist, Album } from './types';
import { mockSongs, mockPlaylists, mockAlbums } from './constants';
import { ChevronLeftIcon, ChevronRightIcon } from './components/icons';


const App: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Song | null>(mockSongs[0] || null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null); // For context or future use

  const navigate = useNavigate();
  const location = useLocation();

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const playSong = useCallback((song: Song) => {
    setCurrentTrack(song);
    setIsPlaying(true);
  }, []);
  
  const playItem = useCallback((item: Album | Playlist | Song) => {
    let songToPlay: Song | undefined;
    if ('songs' in item) { // Album or Playlist
        songToPlay = item.songs[0];
        if ('owner' in item) setCurrentPlaylist(item as Playlist); // It's a playlist
        else setCurrentPlaylist(null); // It's an album
    } else { // Song
        songToPlay = item as Song;
        // Try to find which album/playlist this song belongs to for context
        const parentAlbum = mockAlbums.find(a => a.songs.some(s => s.id === songToPlay!.id));
        const parentPlaylist = mockPlaylists.find(p => p.songs.some(s => s.id === songToPlay!.id));
        if (parentPlaylist) setCurrentPlaylist(parentPlaylist);
        else setCurrentPlaylist(null);
    }

    if (songToPlay) {
        playSong(songToPlay);
    }
  }, [playSong]);

  const playPlaylist = useCallback((playlist: Playlist) => {
    if (playlist.songs.length > 0) {
      setCurrentPlaylist(playlist);
      playSong(playlist.songs[0]);
    }
  }, [playSong]);

  const findCurrentTrackIndex = useCallback(() => {
    const sourceList = currentPlaylist?.songs || currentTrack?.album ? mockSongs.filter(s => s.album === currentTrack?.album) : mockSongs;
    return sourceList.findIndex(s => s.id === currentTrack?.id);
  }, [currentTrack, currentPlaylist]);


  const handleNext = useCallback(() => {
    const sourceList = currentPlaylist?.songs || (currentTrack ? mockSongs.filter(s => s.album === currentTrack.album) : mockSongs);
    if (!currentTrack || sourceList.length === 0) return;
    
    let currentIndex = sourceList.findIndex(s => s.id === currentTrack.id);
    if (currentIndex === -1 && currentTrack?.album) { // If track not in playlist, try finding in its album context
        const albumSongs = mockSongs.filter(s => s.album === currentTrack.album);
        currentIndex = albumSongs.findIndex(s => s.id === currentTrack.id);
        if (currentIndex !== -1 && currentIndex < albumSongs.length - 1) {
            playSong(albumSongs[currentIndex + 1]);
        } else if (currentIndex !== -1 && currentIndex === albumSongs.length - 1) {
             playSong(albumSongs[0]); // Loop album
        }
        return;
    }

    if (currentIndex < sourceList.length - 1) {
      playSong(sourceList[currentIndex + 1]);
    } else {
      playSong(sourceList[0]); // Loop to start of current list (playlist or album)
    }
  }, [currentTrack, playSong, currentPlaylist]);

  const handlePrev = useCallback(() => {
    const sourceList = currentPlaylist?.songs || (currentTrack ? mockSongs.filter(s => s.album === currentTrack.album) : mockSongs);
    if (!currentTrack || sourceList.length === 0) return;

    let currentIndex = sourceList.findIndex(s => s.id === currentTrack.id);
     if (currentIndex === -1 && currentTrack?.album) { // If track not in playlist, try finding in its album context
        const albumSongs = mockSongs.filter(s => s.album === currentTrack.album);
        currentIndex = albumSongs.findIndex(s => s.id === currentTrack.id);
        if (currentIndex !== -1 && currentIndex > 0) {
            playSong(albumSongs[currentIndex - 1]);
        } else if (currentIndex !== -1 && currentIndex === 0) {
             playSong(albumSongs[albumSongs.length-1]); // Loop album to end
        }
        return;
    }

    if (currentIndex > 0) {
      playSong(sourceList[currentIndex - 1]);
    } else {
      playSong(sourceList[sourceList.length - 1]); // Loop to end
    }
  }, [currentTrack, playSong, currentPlaylist]);

  // Handle color change for main view based on playlist cover (simplified)
  const [mainViewBgColor, setMainViewBgColor] = useState('bg-neutral-900');

  useEffect(() => {
    if (location.pathname.startsWith('/playlist/')) {
        const playlistId = location.pathname.split('/').pop();
        const pl = mockPlaylists.find(p => p.id === playlistId);
        // This is a very basic way to get a color, real Spotify uses dominant color extraction
        if (pl) {
            const colors = ['from-purple-800', 'from-blue-800', 'from-green-800', 'from-red-800', 'from-yellow-800'];
            setMainViewBgColor(colors[playlistId ? playlistId.charCodeAt(playlistId.length - 1) % colors.length : 0]);
        } else {
            setMainViewBgColor('from-neutral-800');
        }
    } else {
        setMainViewBgColor('from-neutral-800');
    }
  }, [location.pathname]);


  return (
    <div className="h-screen flex flex-col bg-black text-white selection:bg-green-500 selection:text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar playlists={mockPlaylists} />
        <main className={`flex-1 overflow-y-auto bg-gradient-to-b ${mainViewBgColor} to-neutral-900 pb-24`}>
          {/* Top bar for navigation arrows */}
           <div className="sticky top-0 z-10 p-4 flex items-center space-x-3 bg-black/30 backdrop-blur-md">
                <button onClick={() => navigate(-1)} className="p-1.5 bg-black/50 rounded-full hover:bg-black/70">
                    <ChevronLeftIcon size={22} />
                </button>
                <button onClick={() => navigate(1)} className="p-1.5 bg-black/50 rounded-full hover:bg-black/70">
                    <ChevronRightIcon size={22} />
                </button>
                {/* Potentially add search bar here for some views */}
                 {location.pathname.startsWith('/search') && (
                    <div className="flex-grow"> {/* Search input might be duplicated or moved here based on design */} </div>
                )}
            </div>
          <Routes>
            <Route path="/" element={<HomePage onPlayItem={playItem} />} />
            <Route path="/search" element={<SearchView onPlayItem={playItem} currentTrack={currentTrack} isPlaying={isPlaying} />} />
            <Route path="/library" element={<HomePage onPlayItem={playItem} />} /> {/* Placeholder for Library */}
            <Route path="/playlist/:playlistId" element={<PlaylistView onPlaySong={playSong} onPlayPlaylist={playPlaylist} currentTrack={currentTrack} isPlaying={isPlaying}/>} />
            <Route path="/album/:albumId" element={<PlaylistView onPlaySong={playSong} onPlayPlaylist={playPlaylist} currentTrack={currentTrack} isPlaying={isPlaying}/>} /> {/* Use PlaylistView for albums too for simplicity */}

          </Routes>
        </main>
      </div>
      <PlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default App;
