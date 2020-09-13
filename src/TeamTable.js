import React, { useState } from "react";
import { first, keys, omit, startCase } from "lodash";
import { sortColumns, positionsAbbrev } from "./helper";

const TeamTable = ({ players }) => {
  const [sortOrder, setSortOrder] = useState({});

  if (!players.length)
    return (
      <div className="no-players">
        No players found. Adjust the search filters.
      </div>
    );

  const updateSort = (header) => {
    setSortOrder((prevHeader) => {
      const direction = prevHeader.direction === "asc" ? "desc" : "asc";
      return { header, direction };
    });
  };

  const sortedPlayers = sortColumns(players, sortOrder);
  const omitValues = first(sortedPlayers).isPitcher ? ["arm"] : [];
  const headers = keys(omit(first(sortedPlayers).display, omitValues));

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              className={`header-col header-${header}`}
              onClick={() => updateSort(header)}
              key={header}
            >
              {startCase(header)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {players.map(({ display, isPitcher }) => (
          <tr key={display.name}>
            {headers.map((header) => {
              const ratingPercent =
                !isNaN(display[header]) && header !== "age"
                  ? `${display[header]}%`
                  : null;
              const displayValue =
                header === "position" && !isPitcher
                  ? positionsAbbrev[display[header]]
                  : display[header];
              return (
                <td className={`player-col player-${header}`} key={header}>
                  {ratingPercent && (
                    <span
                      className="rating-color"
                      style={{ width: ratingPercent }}
                    ></span>
                  )}
                  <span className="rating-value">{displayValue}</span>
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
