import { uniqBy, values } from 'lodash';
import { SKILLS } from './buildPlayer';

export const ALL_POSITIONS = {
  2: 'Catcher',
  3: 'First Base',
  4: 'Second Base',
  5: 'Third Base',
  6: 'Shortstop',
  7: 'Left Field',
  8: 'Center Field',
  9: 'Right Field',
};

export const SECONDARY_POSITIONS = {
  10: 'Infield',
  11: 'Outfield',
  12: 'First Base / Outfield',
  13: 'Infield / Outfield',
};

export const PITCHER_ROLES = {
  1: 'Starting',
  2: 'Starting/Relief',
  3: 'Relief',
  4: 'Closer',
};

export const PITCH_TYPE = {
  58: '4F',
  59: '2F',
  65: 'CF',
  63: 'CB',
  64: 'SL',
  60: 'SB',
  61: 'CW',
  62: 'FK',
};

export const positionsAbbrev = {
  [ALL_POSITIONS[1]]: 'P',
  [ALL_POSITIONS[2]]: 'C',
  [ALL_POSITIONS[3]]: '1B',
  [ALL_POSITIONS[4]]: '2B',
  [ALL_POSITIONS[5]]: '3B',
  [ALL_POSITIONS[6]]: 'SS',
  [ALL_POSITIONS[7]]: 'LF',
  [ALL_POSITIONS[8]]: 'CF',
  [ALL_POSITIONS[9]]: 'RF',
  [ALL_POSITIONS[10]]: 'IF',
  [ALL_POSITIONS[11]]: 'OF',
  [ALL_POSITIONS[12]]: '1B/OF',
  [ALL_POSITIONS[13]]: 'IF/OF',
  [PITCHER_ROLES[1]]: 'SP',
  [PITCHER_ROLES[2]]: 'SP/RP',
  [PITCHER_ROLES[3]]: 'RP',
  [PITCHER_ROLES[4]]: 'CP',
};

export const columnNameMap = {
  positions: {
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
  },
  pitchers: {
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
  },
};

export const headers = {
  positions: [
    SKILLS.team,
    SKILLS.name,
    SKILLS.position,
    SKILLS.position_2,
    SKILLS.power,
    SKILLS.contact,
    SKILLS.speed,
    SKILLS.fielding,
    SKILLS.arm,
    // SKILLS.trait,
    // SKILLS.trait_2,
    SKILLS.bats,
    SKILLS.throws,
    SKILLS.age,
    SKILLS.gender,
  ],
  pitchers: [
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
    // SKILLS.trait,
    // SKILLS.trait_2,
    SKILLS.bats,
    SKILLS.throws,
    SKILLS.age,
    SKILLS.gender,
  ],
};

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
  positions: buildChecklist(values(ALL_POSITIONS), true),
  positions2: buildChecklist(values(SECONDARY_POSITIONS), true),
  pitchers: buildChecklist(values(PITCHER_ROLES), true),
  gender: buildChecklist(['M', 'F'], true),
  bats: buildChecklist(['S', 'L', 'R'], true),
  throws: buildChecklist(['L', 'R'], true),
  name: '',
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

  return uniqBy(players, 'name');
};
