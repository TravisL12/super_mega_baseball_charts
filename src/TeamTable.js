import React from "react";
import { keys, omit, startCase } from "lodash";

const buildTable = (headers, players) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{startCase(header)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {players.map(({ display }) => (
          <tr key={display.name}>
            {headers.map((header) => {
              const valueSize = !isNaN(display[header])
                ? `${display[header]}%`
                : null;
              return (
                <td className={`player-col player-${header}`} key={header}>
                  {valueSize && (
                    <span
                      className="rating-color"
                      style={{ width: valueSize }}
                    ></span>
                  )}
                  <span className="rating-value">{display[header]}</span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TeamTable = ({ name, players }) => {
  const pitchers = players.filter((player) => player.isPitcher);
  const positionPlayers = players.filter((player) => !player.isPitcher);
  const headers = keys(positionPlayers[0].display);
  const pitcherHeaders = keys(omit(pitchers[0].display, ["arm"]));

  return (
    <div className="team-table">
      {buildTable(headers, positionPlayers)}
      {buildTable(pitcherHeaders, pitchers)}
    </div>
  );
};

export default TeamTable;
