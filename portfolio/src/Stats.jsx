import React from "react";

const Stats = (props) => {
  const totalPoints = props.players.reduce((total, player) => {
    return total + player.score;
  }, 0);

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Contestants:</td>
          <td>{props.players.length}</td>
        </tr>
        <tr>
          <td>Total Votes:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Stats;