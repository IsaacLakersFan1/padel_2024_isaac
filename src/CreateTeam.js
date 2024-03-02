import React, { useState } from 'react';

function CreateTeam({ activePlayers }) {
  const [teams, setTeams] = useState([]);
  const [benchedPlayer, setBenchedPlayer] = useState(null); // Added state for benched player

  const handleCreateTeams = () => {
    if (!Array.isArray(activePlayers) || activePlayers.length === 0) {
      console.log('No active players or activePlayers is not an array');
      return;
    }
  
    // Shuffle the active players first
    let players = shuffleArray([...activePlayers]);
    let tempBenchedPlayer = null;
  
    // If there's an odd number of players, the last one will be benched
    if (players.length % 2 !== 0) {
      tempBenchedPlayer = players.pop(); // This player is now randomly selected
    }
  
    let createdTeams = [];
    while (players.length >= 2) {
      let randomIndices = [];
      while (randomIndices.length < 2) {
        let r = Math.floor(Math.random() * players.length);
        if (randomIndices.indexOf(r) === -1) randomIndices.push(r);
      }
      const team = randomIndices.map(index => players[index]);
      createdTeams.push(team);
      players = players.filter((_, index) => !randomIndices.includes(index));
    }
  
    setTeams(createdTeams);
    setBenchedPlayer(tempBenchedPlayer); // Update the state with the benched player
  };
  

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // ES6 array destructuring syntax to swap elements
    }
    return array;
  }
 

  const handleBenchPlayer = () => {
    // Ensure there's a benched player to start this process
    if (!benchedPlayer) {
      alert("There's no benched player to form a team with.");
      return;
    }
  
    // This example uses a prompt to select a player, for simplicity.
    // A more user-friendly approach would involve a UI component allowing the user to click a player's name.
    const playerName = prompt('Enter the name of the player to team up with the benched player:');
  
    if (!playerName) return; // Exits if no player name is entered
  
    // Find the selected player in the teams
    let selectedPlayer = null;
    let selectedTeamIndex = -1;
    for (let i = 0; i < teams.length; i++) {
      const index = teams[i].findIndex(player => player.name === playerName);
      if (index !== -1) {
        selectedPlayer = teams[i][index];
        selectedTeamIndex = i;
        break;
      }
    }
  
    if (!selectedPlayer) {
      alert("Player not found or invalid name entered.");
      return;
    }
  
    // Remove the selected player's team
    const updatedTeams = teams.filter((_, index) => index !== selectedTeamIndex);
  
    // Form a new team with the benched player and the selected player
    const newTeam = [benchedPlayer, selectedPlayer];
  
    // Find the player in the removed team who wasn't selected and update the benched player
    const newBenchedPlayer = teams[selectedTeamIndex].find(player => player !== selectedPlayer);
  
    // Update states
    setTeams([...updatedTeams, newTeam]); // Add the new team to the updated list of teams
    setBenchedPlayer(newBenchedPlayer); // Update the benched player
  };
  

  return (
    <div className="p-4">
      <button onClick={handleCreateTeams} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Teams
      </button>
        <button onClick={handleBenchPlayer} className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Bench Player
        </button>
      <div className="flex flex-wrap justify-center mt-4">
        {teams.map((team, index) => (
          <div key={index} className="m-4 p-4 border border-gray-200 rounded flex flex-col items-center" style={{ minWidth: '300px' }}>
            <h2 className="font-bold mb-4">Team {index + 1}</h2>
            <div className="flex justify-center">
              {team.map(player => (
                <div key={player.id} className="flex flex-col items-center m-2">
                  <img src={`/images/${player.name}.jpeg`} alt={player.name} className="w-40 h-40 rounded-full mb-2" />
                  <p>{player.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        {benchedPlayer && (
          <div className="m-4 p-4 border border-gray-200 rounded flex flex-col items-center" style={{ minWidth: '300px' }}>
            <h2 className="font-bold mb-4">Benched Player</h2>
            <div className="flex justify-center">
              <div className="flex flex-col items-center m-2">
                <img src={`/images/${benchedPlayer.name}.jpeg`} alt={benchedPlayer.name} className="w-40 h-40 rounded-full mb-2" />
                <p>{benchedPlayer.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default CreateTeam;
