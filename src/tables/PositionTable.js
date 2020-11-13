import React from 'react';
import { SKILLS } from '../utilities/buildPlayer';
import Table from './Table';

const columnNameMap = {
  [SKILLS.team]: 'team',
  [SKILLS.name]: 'name',
  [SKILLS.position]: 'P. Pos',
  [SKILLS.position_2]: 'S. Pos',
  [SKILLS.power]: 'pow',
  [SKILLS.contact]: 'con',
  [SKILLS.speed]: 'spd',
  [SKILLS.fielding]: 'fld',
  [SKILLS.arm]: 'arm',
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
  SKILLS.position,
  SKILLS.position_2,
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  SKILLS.fielding,
  SKILLS.arm,
  SKILLS.bats,
  SKILLS.throws,
  SKILLS.age,
  SKILLS.gender,
];

const PositionTable = ({ players, setModalPlayer, modalPlayer }) => (
  <Table
    headers={headers}
    players={players}
    columnNameMap={columnNameMap}
    setModalPlayer={setModalPlayer}
    modalPlayer={modalPlayer}
  />
);

export default PositionTable;
