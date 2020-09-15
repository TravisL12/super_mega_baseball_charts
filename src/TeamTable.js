import React, { useState } from "react";
import { positionsAbbrev } from "./helper";
import {
  TEAM,
  NAME,
  POSITION,
  POSITION_2,
  PITCHER_ROLE,
  POWER,
  CONTACT,
  SPEED,
  FIELDING,
  ARM,
  TRAIT,
  TRAIT_2,
  BATS,
  THROWS,
  AGE,
  GENDER,
  ARSENAL,
  VELOCITY,
  JUNK,
  ACCURACY,
} from "./buildPlayer";

const columnNameMap = {
  [TEAM]: "team",
  [NAME]: "name",
  [POSITION]: "P. Pos",
  [POSITION_2]: "S. Pos",
  [PITCHER_ROLE]: "role",
  [POWER]: "pow",
  [CONTACT]: "con",
  [SPEED]: "spd",
  [FIELDING]: "fld",
  [ARM]: "arm",
  [ARSENAL]: "arsenal",
  [VELOCITY]: "vel",
  [JUNK]: "jnk",
  [ACCURACY]: "acc",
  [TRAIT]: "trait 1",
  [TRAIT_2]: "trait 2",
  [BATS]: "bat",
  [THROWS]: "thr",
  [AGE]: "age",
  [GENDER]: "gen",
};

const columnOrderMap = [
  TEAM,
  NAME,
  POSITION,
  POSITION_2,
  POWER,
  CONTACT,
  SPEED,
  FIELDING,
  ARM,
  TRAIT,
  TRAIT_2,
  BATS,
  THROWS,
  AGE,
  GENDER,
];

const pitcherColumnOrderMap = [
  TEAM,
  NAME,
  PITCHER_ROLE,
  ARSENAL,
  POWER,
  CONTACT,
  SPEED,
  FIELDING,
  VELOCITY,
  JUNK,
  ACCURACY,
  TRAIT,
  TRAIT_2,
  BATS,
  THROWS,
  AGE,
  GENDER,
];

const sortColumns = (players, sortAttr) => {
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

const TeamTable = ({ players, isPitchers }) => {
  const [sortOrder, setSortOrder] = useState({});

  if (!players.length)
    return (
      <div className="no-players">
        <p>No {isPitchers ? "Pitchers" : "Position players"} found.</p>
        <p>
          Check the {isPitchers ? "Positions" : "Pitchers"} button at the top,
        </p>
        <p>or adjust the search filters.</p>
      </div>
    );

  const updateSort = (header) => {
    setSortOrder((prevHeader) => {
      const direction = prevHeader.direction === "asc" ? "desc" : "asc";
      return { header, direction };
    });
  };

  const sortedPlayers = sortColumns(players, sortOrder);
  const headers = isPitchers ? pitcherColumnOrderMap : columnOrderMap;

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
              {columnNameMap[header]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedPlayers.map(({ display }) => (
          <tr key={display.name}>
            {headers.map((header) => {
              const ratingPercent =
                !isNaN(display[header]) &&
                !["age", "trait", "trait2"].includes(header)
                  ? `${display[header]}%`
                  : null;

              let displayValue = [POSITION, POSITION_2, PITCHER_ROLE].includes(
                header
              )
                ? positionsAbbrev[display[header]]
                : display[header];

              if (header === ARSENAL) {
                displayValue = display[header].map((pitch) => {
                  return (
                    <span className={`pitch-type pitch-${pitch}`}>{pitch}</span>
                  );
                });
              }

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
