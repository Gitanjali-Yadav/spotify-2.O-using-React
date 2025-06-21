
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, SearchIcon, LibraryIcon, PlusIcon, HeartIcon } from './icons';
import { Playlist } from '../types';
import { mockPlaylists } from '../constants';

interface SidebarProps {
  playlists?: Playlist[]; // Made optional, defaults to mockPlaylists
}

const NavLink: React.FC<{ to: string; icon: React.ReactNode; label: string; }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to === "/" && location.pathname.startsWith("/#")) || location.pathname.startsWith(`${to}/`) || location.hash === `#${to}`;


  return (
    <Link to={to} className={`flex items-center space-x-3 px-4 py-2 rounded hover:bg-neutral-700 transition-colors ${isActive ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white'}`}>
      {icon}
      <span className="font-semibold">{label}</span>
    </Link>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ playlists = mockPlaylists }) => {
  return (
    <div className="w-64 bg-black text-neutral-300 p-2 flex flex-col space-y-4 fixed top-0 left-0 h-full md:relative">
      {/* Logo Placeholder */}
      <div className="px-4 py-2">
        <h1 className="text-2xl font-bold text-white">Spotify Clone</h1>
      </div>

      <nav className="space-y-1 px-2">
        <NavLink to="/" icon={<HomeIcon />} label="Home" />
        <NavLink to="/search" icon={<SearchIcon />} label="Search" />
        <NavLink to="/library" icon={<LibraryIcon />} label="Your Library" />
      </nav>

      <div className="px-2 mt-4 space-y-2">
         <button className="flex items-center space-x-3 px-4 py-2 rounded text-neutral-400 hover:text-white hover:bg-neutral-700 w-full transition-colors">
            <div className="bg-neutral-200 p-1 rounded-sm"><PlusIcon className="text-black" size={16}/></div>
            <span className="font-semibold">Create Playlist</span>
        </button>
        <Link to="/playlist/playlist3" className={`flex items-center space-x-3 px-4 py-2 rounded text-neutral-400 hover:text-white hover:bg-neutral-700 w-full transition-colors ${location.hash === '#/playlist/playlist3' ? 'text-white bg-neutral-800' : ''}`}>
            <div className="bg-gradient-to-br from-purple-600 to-indigo-800 p-1 rounded-sm"><HeartIcon className="text-white" size={16} filled/></div>
            <span className="font-semibold">Liked Songs</span>
        </Link>
      </div>
      
      <hr className="border-neutral-800 mx-4 my-2" />

      <div className="flex-grow overflow-y-auto space-y-1 px-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        {playlists.map((playlist) => (
          <Link
            key={playlist.id}
            to={`/playlist/${playlist.id}`}
            className={`block text-sm py-1.5 px-2 rounded hover:bg-neutral-800 truncate ${location.hash === `#/playlist/${playlist.id}` ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            {playlist.name}
          </Link>
        ))}
      </div>

      {/* User Profile Placeholder */}
      <div className="p-4 mt-auto border-t border-neutral-800">
        <div className="flex items-center space-x-3">
          <img src="https://picsum.photos/seed/user/40/40" alt="User" className="w-8 h-8 rounded-full" />
          <span className="text-sm font-medium">User Name</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
