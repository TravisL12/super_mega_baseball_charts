import React, { useState } from 'react';
import { first, keys, omit, startCase } from 'lodash';
import { positionsAbbrev } from './helper';

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

    if (sortAttr.direction === 'asc') {
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
        <p>No {isPitchers ? 'Pitchers' : 'Position players'} found.</p>
        <p>
          Check the {isPitchers ? 'Positions' : 'Pitchers'} button at the top,
        </p>
        <p>or adjust the search filters.</p>
      </div>
    );

  const updateSort = (header) => {
    setSortOrder((prevHeader) => {
      const direction = prevHeader.direction === 'asc' ? 'desc' : 'asc';
      return { header, direction };
    });
  };

  const sortedPlayers = sortColumns(players, sortOrder);
  const omitValues = first(sortedPlayers).isPitcher ? ['arm'] : [];
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
                !isNaN(display[header]) &&
                !['age', 'trait', 'trait2'].includes(header)
                  ? `${display[header]}%`
                  : null;
              const displayValue =
                header === 'position'
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
