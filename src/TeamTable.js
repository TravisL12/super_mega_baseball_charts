import React, { useState } from "react";
import { first, keys, startCase } from "lodash";

const sortPlayers = (players, sortAttr) => {
  if (!sortAttr.header) {
    return players;
  }

  return players.sort((a, b) => {
    const aDisplay = isNaN(a.display[sortAttr.header])
      ? a.display[sortAttr.header]
      : +a.display[sortAttr.header];
    const bDisplay = isNaN(b.display[sortAttr.header])
      ? b.display[sortAttr.header]
      : +b.display[sortAttr.header];

    if (sortAttr.direction === "asc") {
      return aDisplay > bDisplay ? 1 : -1;
    } else {
      return aDisplay < bDisplay ? 1 : -1;
    }
  });
};

const TeamTable = ({ players }) => {
  const [sortOrder, setSortOrder] = useState({});

  if (!players.length) return null;

  const updateSort = (header) => {
    if (!setSortOrder) return;

    setSortOrder((prevHeader) => {
      const direction = prevHeader.direction === "asc" ? "desc" : "asc";
      return { header, direction };
    });
  };

  const sortedPlayers = sortPlayers(players, sortOrder);

  const headers =
    sortedPlayers.length > 0 ? keys(first(sortedPlayers).display) : [];

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th onClick={() => updateSort(header)} key={header}>
              {startCase(header)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {players.map(({ display }) => (
          <tr key={display.name}>
            {headers.map((header) => {
              const ratingPercent = !isNaN(display[header])
                ? `${display[header]}%`
                : null;
              return (
                <td className={`player-col player-${header}`} key={header}>
                  {ratingPercent && (
                    <span
                      className="rating-color"
                      style={{ width: ratingPercent }}
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

export default TeamTable;
