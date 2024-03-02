import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PlayersList from './PlayersList';
import CreateTeam from './CreateTeam';
import './index.css';

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Isaac', active: false },
    { id: 2, name: 'Esteban', active: false },
    { id: 3, name: 'Fer', active: false },
    { id: 4, name: 'Bobby', active: false },
    { id: 5, name: 'Andres', active: false },
    { id: 6, name: 'Daniel', active: false },
    { id: 7, name: 'Diego', active: false },
    { id: 8, name: 'Evgany', active: false },
    { id: 9, name: 'Gio', active: false },
    { id: 10, name: 'Javi', active: false },
    { id: 11, name: 'Juan', active: false },
    { id: 12, name: 'Judio', active: false },
    { id: 13, name: 'Luis', active: false },
    { id: 14, name: 'Mau', active: false },
    { id: 15, name: 'Memo', active: false },
    { id: 16, name: 'Papa1', active: false },
    { id: 17, name: 'Papa2', active: false },
    { id: 18, name: 'Papa3', active: false },
    { id: 19, name: 'Papa4', active: false },
    { id: 20, name: 'Quique', active: false },
    { id: 21, name: 'Willy', active: false },
    
    // Add more players as needed
  ]);
  // Function to toggle player active status
  const togglePlayerActive = (id) => {
    const updatedPlayers = players.map(player =>
      player.id === id ? { ...player, active: !player.active } : player
    );
    setPlayers(updatedPlayers);
  };

  // Filter for active players to pass to the CreateTeam component
  const activePlayers = players.filter(player => player.active);

  return (
    <BrowserRouter>
      <nav className="flex justify-between bg-blue-500 text-white p-4">
        <Link to="/" className="mr-4 hover:text-blue-200">Players List</Link>
        <Link to="/create-team" className="hover:text-blue-200">Create Team</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PlayersList players={players} togglePlayerActive={togglePlayerActive} />} />
        <Route path="/create-team" element={<CreateTeam activePlayers={activePlayers} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
