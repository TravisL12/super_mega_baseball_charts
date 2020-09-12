import React, { useState } from "react";
import { keys, startCase } from "lodash";

const buildTable = (headers, players, setSortOrder) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              onClick={() => {
                if (!setSortOrder) return;
                setSortOrder((prevHeader) => {
                  const direction =
                    prevHeader.direction === "asc" ? "desc" : "asc";
                  return { header, direction };
                });
              }}
              key={header}
            >
              {startCase(header)}
            </th>
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

const sortPlayers = (players, sortAttr) => {
  if (!sortAttr.header) {
    return players;
  }

  return players.sort((a, b) => {
    const aDisplay = !isNaN(a.display[sortAttr.header])
      ? +a.display[sortAttr.header]
      : a.display[sortAttr.header];
    const bDisplay = !isNaN(b.display[sortAttr.header])
      ? +b.display[sortAttr.header]
      : b.display[sortAttr.header];

    if (sortAttr.direction === "asc") {
      return aDisplay > bDisplay ? 1 : -1;
    } else {
      return aDisplay < bDisplay ? 1 : -1;
    }
  });
};

const TeamTable = ({ players }) => {
  const [sortOrder, setSortOrder] = useState({});
  const [sortPitcherOrder, setSortPitcherOrder] = useState({});
  const pitchers = sortPlayers(
    players.filter((player) => player.isPitcher),
    sortPitcherOrder
  );
  const positionPlayers = sortPlayers(
    players.filter((player) => !player.isPitcher),
    sortOrder
  );
  const headers = keys(positionPlayers[0].display);
  const pitcherHeaders = keys(pitchers[0].display);

  return (
    <div className="team-table">
      {buildTable(headers, positionPlayers, setSortOrder)}
      {buildTable(pitcherHeaders, pitchers, setSortPitcherOrder)}
    </div>
  );
};

export default TeamTable;
