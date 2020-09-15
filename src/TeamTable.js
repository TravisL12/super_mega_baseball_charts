import React, { useState } from 'react';
import { positionsAbbrev } from './helper';

const columnNameMap = {
  team: 'team',
  name: 'name',
  position: 'P. Pos',
  position2: 'S. Pos',
  power: 'pow',
  contact: 'con',
  speed: 'spd',
  fielding: 'fld',
  arm: 'arm',
  arsenal: 'arsenal',
  velocity: 'velocity',
  junk: 'junk',
  accuracy: 'accuracy',
  trait: 'trait 1',
  trait2: 'trait 2',
  bats: 'bat',
  throws: 'thr',
  age: 'age',
  gender: 'gen',
};

const columnOrderMap = [
  'team',
  'name',
  'position',
  'position2',
  'power',
  'contact',
  'speed',
  'fielding',
  'arm',
  'trait',
  'trait2',
  'bats',
  'throws',
  'age',
  'gender',
];

const pitcherColumnOrderMap = [
  'team',
  'name',
  'position',
  'arsenal',
  'power',
  'contact',
  'speed',
  'fielding',
  'velocity',
  'junk',
  'accuracy',
  'trait',
  'trait2',
  'bats',
  'throws',
  'age',
  'gender',
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
        {players.map(({ display }) => (
          <tr key={display.name}>
            {headers.map((header) => {
              const ratingPercent =
                !isNaN(display[header]) &&
                !['age', 'trait', 'trait2'].includes(header)
                  ? `${display[header]}%`
                  : null;

              let displayValue = header.includes('position')
                ? positionsAbbrev[display[header]]
                : display[header];

              if (header === 'arsenal') {
                displayValue = display[header].join(', ');
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
