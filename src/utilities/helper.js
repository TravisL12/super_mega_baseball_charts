import { uniqBy, values } from 'lodash';
import {
  PRIMARY_POSITIONS,
  SECONDARY_POSITIONS,
  PITCHER_ROLES,
} from './constants';

export const getUniqTeams = (players) => {
  return uniqBy(players, 'team').map(({ team }) => team);
};

export const buildChecklist = (data, defaultVal = false) => {
  return data.reduce((acc, value) => {
    acc[value] = defaultVal;
    return acc;
  }, {});
};

export const initialFilters = {
  positions: buildChecklist(values(PRIMARY_POSITIONS), true),
  positions2: buildChecklist(values(SECONDARY_POSITIONS), true),
  pitchers: buildChecklist(values(PITCHER_ROLES), true),
  gender: buildChecklist(['M', 'F'], true),
  bats: buildChecklist(['L', 'R', 'S'], true),
  throws: buildChecklist(['L', 'R'], true),
  name: '',
  showCompare: false,
};

export const filterPlayers = (filters, players) => {
  // Filter team names
  players = players.filter((player) => filters.teams[player.team]);
  players = players.filter((player) => filters.gender[player.gender]);
  players = players.filter((player) => filters.bats[player.bats]);
  players = players.filter((player) => filters.throws[player.throws]);

  // Filter positions
  players = players.filter(({ position, pitcherRole }) => {
    const isPitcher = filters.pitchers[pitcherRole];
    const isPosition = filters.positions[position];
    return isPitcher || isPosition;
  });

  // Filter name search
  if (filters.name) {
    players = players.filter((player) =>
      player.name.toLowerCase().includes(filters.name.toLowerCase())
    );
  }

  // Filter comparisons
  if (filters.showCompare) {
    players = players.filter(({ checked }) => checked);
  }

  return uniqBy(players, 'name');
};
