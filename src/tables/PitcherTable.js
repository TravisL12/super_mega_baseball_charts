import React from 'react';
import { SKILLS } from '../utilities/buildPlayer';
import Table from './Table';

const columnNameMap = {
  [SKILLS.team]: 'team',
  [SKILLS.name]: 'name',
  [SKILLS.pitcher_role]: 'role',
  [SKILLS.power]: 'pow',
  [SKILLS.contact]: 'con',
  [SKILLS.speed]: 'spd',
  [SKILLS.fielding]: 'fld',
  [SKILLS.arsenal]: 'arsenal',
  [SKILLS.velocity]: 'vel',
  [SKILLS.junk]: 'jnk',
  [SKILLS.accuracy]: 'acc',
  [SKILLS.trait]: 'trait 1',
  [SKILLS.trait_2]: 'trait 2',
  [SKILLS.bats]: 'bat',
  [SKILLS.throws]: 'thr',
  [SKILLS.age]: 'age',
  [SKILLS.gender]: 'gen',
};

const headers = [
  SKILLS.team,
  SKILLS.name,
  SKILLS.pitcher_role,
  SKILLS.arsenal,
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  SKILLS.fielding,
  SKILLS.velocity,
  SKILLS.junk,
  SKILLS.accuracy,
  SKILLS.trait,
  SKILLS.trait_2,
  SKILLS.bats,
  SKILLS.throws,
  SKILLS.age,
  SKILLS.gender,
];

const PitcherTable = ({ players, setModalPlayer }) => {
  if (!players.length)
    return (
      <div className="no-players">
        <p>No Pitchers found.</p>
        <p>Check the Positions button at the top,</p>
        <p>or adjust the search filters.</p>
      </div>
    );

  return (
    <Table
      headers={headers}
      players={players}
      columnNameMap={columnNameMap}
      setModalPlayer={setModalPlayer}
    />
  );
};

export default PitcherTable;
