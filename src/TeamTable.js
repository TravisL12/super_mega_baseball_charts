import React, { useState } from "react";
import { first, keys, omit, startCase } from "lodash";
import { sortColumns } from "./helper";

const TeamTable = ({ players }) => {
  const [sortOrder, setSortOrder] = useState({});

  if (!players.length) return null;

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
