import React, { useState } from "react";
import Header from "./Header";
import Player from "./Player";
import AddPlayerForm from "./AddPlayerForm";
import "./App.css";

const App = () => {
  const [players, setPlayers] = useState([
    {
      name: "Caleb Wright",
      score: 0,
      id: 1,
    },
    {
      name: "Sari Wisoff",
      score: 0,
      id: 2,
    },
    {
      name: "Matthew Scott",
      score: 0,
      id: 3,
    },
    {
      name: "Robert Schulte",
      score: 0,
      id: 4,
    },
    {
      name: "Jack Babalian",
      score: 0,
      id: 5,
    },
  ]);

  const [nextPlayerId, setNextPlayerId] = useState(6);

  const handleRemovePlayer = (id) => {
    setPlayers((prevState) => prevState.filter((p) => p.id !== id));
  };

  const handleScoreChange = (id, delta) => {
    setPlayers((prevState) =>
      prevState.map((player) => {
        if (player.id === id) {
          return {
            name: player.name,
            score: player.score + delta,
            id: player.id,
          };
        }
        return player;
      })
    );
  };

  const handleAddPlayer = (name) => {
    setPlayers((prevPlayers) => [
      ...prevPlayers,
      {
        name,
        score: 0,
        id: nextPlayerId,
      },
    ]);

    setNextPlayerId((prevId) => prevId + 1);
  };

  return (
    <div className="scoreboard">
      <Header
        title="Vote for your favorite Halloween Costume!"
        players={players}
      />

      {players.map((players) => (
        <Player
          {...players}
          removePlayer={handleRemovePlayer}
          changeScore={handleScoreChange}
          key={players.id}
        />
      ))}

      <AddPlayerForm addPlayer={handleAddPlayer} />
    </div>
  );
};

export default App;
