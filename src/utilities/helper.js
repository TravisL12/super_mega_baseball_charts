import { orderBy, uniqBy, values } from 'lodash';
import {
  SKILLS,
  PRIMARY_POSITIONS,
  SECONDARY_POSITIONS,
  PITCHER_ROLES,
  ASC,
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
  comparePlayerIds: [],
  sort: { header: SKILLS.team, direction: ASC },
};

export const filterPlayers = (filters, players) => {
  // Filter comparisons
  if (filters.showCompare) {
    players = players.filter((player) =>
      filters.comparePlayerIds.includes(player.id)
    );
  }

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

  const sorted = orderBy(
    players,
    [filters.sort.header],
    [filters.sort.direction]
  );

  return uniqBy(sorted, 'name');
};
