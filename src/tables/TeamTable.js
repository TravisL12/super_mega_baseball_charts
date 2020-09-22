import React, { useState } from 'react';
import teamLogos from '../team_logos';
import { positionsAbbrev } from '../helper';
import { SKILLS } from '../buildPlayer';
import { TeamTableContainer } from '../styles';

const columnNameMap = {
  [SKILLS.TEAM]: 'team',
  [SKILLS.NAME]: 'name',
  [SKILLS.POSITION]: 'P. Pos',
  [SKILLS.POSITION_2]: 'S. Pos',
  [SKILLS.POWER]: 'pow',
  [SKILLS.CONTACT]: 'con',
  [SKILLS.SPEED]: 'spd',
  [SKILLS.FIELDING]: 'fld',
  [SKILLS.ARM]: 'arm',
  [SKILLS.TRAIT]: 'trait 1',
  [SKILLS.TRAIT_2]: 'trait 2',
  [SKILLS.BATS]: 'bat',
  [SKILLS.THROWS]: 'thr',
  [SKILLS.AGE]: 'age',
  [SKILLS.GENDER]: 'gen',
};

const columnOrderMap = [
  SKILLS.TEAM,
  SKILLS.NAME,
  SKILLS.POSITION,
  SKILLS.POSITION_2,
  SKILLS.POWER,
  SKILLS.CONTACT,
  SKILLS.SPEED,
  SKILLS.FIELDING,
  SKILLS.ARM,
  SKILLS.TRAIT,
  SKILLS.TRAIT_2,
  SKILLS.BATS,
  SKILLS.THROWS,
  SKILLS.AGE,
  SKILLS.GENDER,
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

const TeamTable = ({ teams }) => {
  return (
    <TeamTableContainer>
      {Object.values(teams).map(({ name }) => (
        <div className="team" key={name}>
          <div className="title" key={name}>
            <div>
              <img
                alt={`${name} logo`}
                src={teamLogos[name.replace(/\s/, '').toLowerCase()]}
              />
            </div>
            <h1>{name}</h1>
          </div>
        </div>
      ))}
    </TeamTableContainer>
  );
  // const [sortOrder, setSortOrder] = useState({});

  // const updateSort = (header) => {
  //   setSortOrder((prevHeader) => {
  //     const direction = prevHeader.direction === 'asc' ? 'desc' : 'asc';
  //     return { header, direction };
  //   });
  // };

  // const sortedPlayers = sortColumns(players, sortOrder);
  // const headers = columnOrderMap;

  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         {headers.map((header) => (
  //           <th
  //             className={`header-col header-${header}`}
  //             onClick={() => updateSort(header)}
  //             key={header}
  //           >
  //             {columnNameMap[header]}
  //           </th>
  //         ))}
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {sortedPlayers.map(({ display }) => (
  //         <tr key={display.name}>
  //           {headers.map((header) => {
  //             const ratingPercent =
  //               !isNaN(display[header]) &&
  //               !['age', 'trait', 'trait2'].includes(header)
  //                 ? `${display[header]}%`
  //                 : null;

  //             let displayValue = [POSITION, POSITION_2].includes(header)
  //               ? positionsAbbrev[display[header]]
  //               : display[header];

  //             if (header === ARSENAL) {
  //               displayValue = display[header].map((pitch) => {
  //                 return (
  //                   <span key={pitch} className={`pitch-type pitch-${pitch}`}>
  //                     {pitch}
  //                   </span>
  //                 );
  //               });
  //             }

  //             const logo =
  //               header === TEAM ? (
  //                 <img
  //                   alt={`${display[header]} logo`}
  //                   src={
  //                     teamLogos[display[header].replace(/\s/, '').toLowerCase()]
  //                   }
  //                 />
  //               ) : null;

  //             return (
  //               <td className={`player-col player-${header}`} key={header}>
  //                 {ratingPercent && (
  //                   <span
  //                     className="rating-color"
  //                     style={{ width: ratingPercent }}
  //                   ></span>
  //                 )}
  //                 {logo}
  //                 <span className="rating-value">{displayValue}</span>
  //               </td>
  //             );
  //           })}
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};

export default TeamTable;
