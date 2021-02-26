import React, { useEffect, useState } from 'react';
import { keys } from 'lodash';
import TeamView from './TeamView';
import { StyledTeamList, StyledTeamTable } from '../styles';

const TeamTable = ({ teams }) => {
  const [selectTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    setSelectedTeam(teams[keys(teams)[0]]);
  }, [teams]);

  return (
    <StyledTeamTable>
      <StyledTeamList>
        <ul>
          {keys(teams).map((team) => (
            <li onClick={() => setSelectedTeam(teams[team])}>
              {teams[team].name}
            </li>
          ))}
        </ul>
      </StyledTeamList>
      {selectTeam && <TeamView team={selectTeam} />}
    </StyledTeamTable>
  );
};

export default TeamTable;
