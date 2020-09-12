import React from "react";

const TeamTable = ({ name, players }) => {
  const headers = Object.keys(players[0].export());

  return (
    <div>
      <h1>{name}</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            return (
              <tr key={player.name}>
                {headers.map((header) => {
                  const data = player.export();
                  return <td key={header}>{data[header]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
