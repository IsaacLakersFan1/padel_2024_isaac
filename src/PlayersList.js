import React, { useState, useEffect, useRef } from 'react';

function PlayersList({ players, togglePlayerActive }) {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-md mx-auto relative" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Search players..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      {showDropdown && (
        <ul className="absolute z-10 w-full mt-2 border border-gray-300 rounded-lg bg-white max-h-60 overflow-auto">
          {filteredPlayers.map(player => (
            <li key={player.id} onClick={() => {togglePlayerActive(player.id); setShowDropdown(false);}} className="cursor-pointer p-2 hover:bg-gray-100">
              {player.name}
            </li>
          ))}
        </ul>
      )}
      <h2 className="mt-4 font-bold text-center">Active Players</h2>
      <ul>
        {players.filter(player => player.active).map(player => (
          <li key={player.id} className="flex items-center justify-between p-2">
            <div className="flex items-center">
              <img src={`/images/${player.name}.jpeg`} alt={player.name} className="w-10 h-10 rounded-full mr-3" onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/images/default.jpeg`}/>
              <span>{player.name}</span>
            </div>
            <button onClick={() => togglePlayerActive(player.id)} className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayersList;
