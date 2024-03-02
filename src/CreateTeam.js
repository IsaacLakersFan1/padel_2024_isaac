import React, { useState } from 'react';

function CreateTeam({ activePlayers }) {
  const [teams, setTeams] = useState([]);

  const handleCreateTeams = () => {
    if (!Array.isArray(activePlayers) || activePlayers.length === 0) {
      console.log('No active players or activePlayers is not an array');
      return; // Exit the function if there are no valid active players
    }

    let players = [...activePlayers];
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
  };

  return (
    <div className="p-4">
      <button onClick={handleCreateTeams} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Teams
      </button>
      <div className="flex flex-wrap justify-center mt-4">
        {teams.map((team, index) => (
          <div key={index} className="m-4 p-4 border border-gray-200 rounded flex flex-col items-center" style={{ minWidth: '300px' }}>
            <h2 className="font-bold mb-4">Team {index + 1}</h2>
            <div className="flex justify-center">
              {team.map(player => (
                <div key={player.id} className="flex flex-col items-center m-2">
                  <img src={`${process.env.PUBLIC_URL}/images/${player.name.replace(/\s/g, '').toLowerCase()}.jpeg`} alt={player.name} className="w-40 h-40 rounded-full mb-2" />
                  <p>{player.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTeam;
