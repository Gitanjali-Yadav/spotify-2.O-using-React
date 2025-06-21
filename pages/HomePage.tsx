
import React from 'react';
import AlbumCard from '../components/AlbumCard';
import { mockCategories, mockAlbums, mockPlaylists } from '../constants';
import { Album, Playlist } from '../types';

interface HomePageProps {
  onPlayItem: (item: Album | Playlist) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPlayItem }) => {
  // Combine albums and playlists for "Recently Played" or generic sections if needed
  const allContentItems = [...mockAlbums, ...mockPlaylists];

  return (
    <div className="p-6 space-y-8 text-white">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold">Good morning</h1> {/* Or Good afternoon/evening */}
      </div>

      {/* Quick Picks / Featured Playlists */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
         {mockPlaylists.slice(0, 3).map(item => (
            <div key={item.id} className="bg-neutral-800/50 hover:bg-neutral-700/80 rounded-md flex items-center transition-colors cursor-pointer" onClick={() => onPlayItem(item)}>
                <img src={item.coverArtUrl} alt={item.name} className="w-16 h-16 rounded-l-md object-cover"/>
                <span className="font-semibold p-4 text-sm">{item.name}</span>
            </div>
         ))}
         {mockAlbums.slice(0, 3).map(item => (
            <div key={item.id} className="bg-neutral-800/50 hover:bg-neutral-700/80 rounded-md flex items-center transition-colors cursor-pointer" onClick={() => onPlayItem(item)}>
                <img src={item.coverArtUrl} alt={item.name} className="w-16 h-16 rounded-l-md object-cover"/>
                <span className="font-semibold p-4 text-sm">{item.name}</span>
            </div>
         ))}
      </div>
      

      {mockCategories.map(category => (
        <section key={category.id}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold hover:underline cursor-pointer">{category.name}</h2>
            <a href="#" className="text-sm font-semibold text-neutral-400 hover:underline">Show all</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {category.playlists.slice(0,6).map(item => {
              // Determine if item is Album or Playlist. For mockCategories, they are playlists.
              // If categories could contain albums, you'd need a type guard or check.
              const isAlbum = 'artist' in item && 'songs' in item && !('owner' in item);
              return (
                <AlbumCard 
                  key={item.id} 
                  item={item} 
                  type={isAlbum ? 'album' : 'playlist'} 
                  onPlay={onPlayItem}
                />
              );
            })}
          </div>
        </section>
      ))}

       <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold hover:underline cursor-pointer">Popular Albums</h2>
            <a href="#" className="text-sm font-semibold text-neutral-400 hover:underline">Show all</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {mockAlbums.slice(0,6).map(album => (
              <AlbumCard key={album.id} item={album} type="album" onPlay={onPlayItem} />
            ))}
          </div>
        </section>

    </div>
  );
};

export default HomePage;
