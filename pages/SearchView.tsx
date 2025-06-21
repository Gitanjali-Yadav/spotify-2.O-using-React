
import React, { useState } from 'react';
import AlbumCard from '../components/AlbumCard';
import SongRow from '../components/SongRow';
import { mockAlbums, mockPlaylists, mockSongs } from '../constants';
import { SearchIcon } from '../components/icons';
import { Album, Playlist, Song } from '../types';

interface SearchViewProps {
  onPlayItem: (item: Album | Playlist | Song) => void;
  currentTrack: Song | null;
  isPlaying: boolean;
}

const SearchView: React.FC<SearchViewProps> = ({ onPlayItem, currentTrack, isPlaying }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handlePlaySong = (song: Song) => {
    onPlayItem(song);
  };

  // Filtered results (simple frontend filter)
  const filteredAlbums = mockAlbums.filter(album => 
    album.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    album.artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPlaylists = mockPlaylists.filter(playlist => 
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredSongs = mockSongs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const browseCategories = [
    { name: 'Podcasts', color: 'bg-emerald-600', id: 'cat-podcasts' },
    { name: 'Made For You', color: 'bg-sky-600', id: 'cat-madeforyou' },
    { name: 'Charts', color: 'bg-purple-600', id: 'cat-charts' },
    { name: 'New Releases', color: 'bg-rose-600', id: 'cat-newreleases' },
    { name: 'Discover', color: 'bg-orange-600', id: 'cat-discover' },
    { name: 'Live Events', color: 'bg-red-700', id: 'cat-live' },
    { name: 'Pop', color: 'bg-pink-500', id: 'cat-pop' },
    { name: 'Hip-Hop', color: 'bg-amber-600', id: 'cat-hiphop' },
  ];

  return (
    <div className="p-6 space-y-8 text-white">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20}/>
        <input 
          type="text"
          placeholder="What do you want to listen to?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 bg-neutral-700 text-white placeholder-neutral-400 rounded-full py-3 pl-10 pr-4 focus:ring-1 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {searchTerm ? (
        <>
          {filteredSongs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Songs</h2>
              <div className="space-y-1">
                {filteredSongs.slice(0, 5).map((song, index) => (
                   <SongRow 
                    key={song.id} 
                    song={song} 
                    index={index} 
                    onPlaySong={handlePlaySong}
                    isCurrentSong={currentTrack?.id === song.id}
                    isPlaying={isPlaying && currentTrack?.id === song.id}
                  />
                ))}
              </div>
            </section>
          )}

          {filteredAlbums.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Albums</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredAlbums.map(album => (
                  <AlbumCard key={album.id} item={album} type="album" onPlay={() => onPlayItem(album)} />
                ))}
              </div>
            </section>
          )}

          {filteredPlaylists.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredPlaylists.map(playlist => (
                  <AlbumCard key={playlist.id} item={playlist} type="playlist" onPlay={() => onPlayItem(playlist)} />
                ))}
              </div>
            </section>
          )}
           {filteredSongs.length === 0 && filteredAlbums.length === 0 && filteredPlaylists.length === 0 && (
            <p className="text-neutral-400">No results found for "{searchTerm}". Try a different search.</p>
           )}
        </>
      ) : (
        <section>
          <h2 className="text-2xl font-bold mb-4">Browse all</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {browseCategories.map(category => (
              <div key={category.id} className={`${category.color} aspect-square rounded-lg p-4 flex flex-col justify-between overflow-hidden relative cursor-pointer group`}>
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                <img src={`https://picsum.photos/seed/${category.id}/100/100`} alt={category.name} className="absolute -bottom-4 -right-4 w-20 h-20 transform rotate-[25deg] transition-transform duration-300 group-hover:scale-110"/>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SearchView;
