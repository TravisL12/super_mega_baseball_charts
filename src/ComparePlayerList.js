import React, { useEffect, useState, useCallback } from 'react';

import { CompareTableContainer } from './styles/ComparePlayers.style';
import Table from './tables/Table';
import { SKILLS } from './utilities/buildPlayer';

const columnNameMap = {
  [SKILLS.team]: 'team',
  [SKILLS.name]: 'name',
  [SKILLS.position]: 'pos.',
};

const headers = [SKILLS.team, SKILLS.name, SKILLS.position];

const ComparePlayerList = (props) => {
  const [search, setSearch] = useState('');
  const [players, setPlayers] = useState(props.players);

  useEffect(() => {
    setPlayers(props.players);
  }, [props.players]);

  const updateSearch = (event) => {
    const { value } = event.target;
    console.log(value);
    const filteredPlayers = [...props.players].filter((player) =>
      player.name.toLowerCase().includes(value.toLowerCase())
    );

    setPlayers(filteredPlayers);
    setSearch(value);
  };

  return (
    <CompareTableContainer>
      <div>
        <input
          type="text"
          placeholder="Search Column"
          value={search}
          onChange={updateSearch}
        />
        <span>{players.length} found</span>
      </div>
      <Table
        headers={headers}
        players={players}
        columnNameMap={columnNameMap}
        setModalPlayer={() => {}}
      />
    </CompareTableContainer>
  );
};

export default ComparePlayerList;
