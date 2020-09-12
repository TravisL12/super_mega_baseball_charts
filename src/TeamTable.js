import React from "react";
import { keys, omit, startCase } from "lodash";

const TeamTable = ({ name, players }) => {
  const pitchers = players.filter((player) => player.position === "Pitcher");
  const positionPlayers = players.filter(
    (player) => player.position !== "Pitcher"
  );
  const headers = keys(positionPlayers[0]);
  const pitcherHeaders = keys(omit(pitchers[0], ["position"]));

  return (
    <div>
      <h1>{name}</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{startCase(header)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {positionPlayers.map((player) => (
            <tr key={player.name}>
              {headers.map((header) => (
                <td key={header}>{player[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            {pitcherHeaders.map((header) => (
              <th key={header}>{startCase(header)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pitchers.map((player) => (
            <tr key={player.name}>
              {pitcherHeaders.map((header) => (
                <td key={header}>{player[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
