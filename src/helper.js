import { uniqBy } from 'lodash';

export const secondaryPositions = {
  10: 'Infield',
  11: 'Outfield',
  12: 'First Base / Outfield',
  13: 'Infield / Outfield',
};

export const positions = {
  1: 'Pitcher',
  2: 'Catcher',
  3: 'First Base',
  4: 'Second Base',
  5: 'Third Base',
  6: 'Shortstop',
  7: 'Left Field',
  8: 'Center Field',
  9: 'Right Field',
};

export const pitcherPositions = {
  1: 'Starting',
  2: 'Starting/Relief',
  3: 'Relief',
  4: 'Closer',
};

export const pitchType = {
  58: '4F',
  59: '2F',
  60: 'SB',
  61: 'CW',
  62: 'FK',
  63: 'CB',
  64: 'SL',
  65: 'CF',
};

export const positionsAbbrev = {
  [positions[1]]: 'P',
  [positions[2]]: 'C',
  [positions[3]]: '1B',
  [positions[4]]: '2B',
  [positions[5]]: '3B',
  [positions[6]]: 'SS',
  [positions[7]]: 'LF',
  [positions[8]]: 'CF',
  [positions[9]]: 'RF',
  [positions[10]]: 'IF',
  [positions[11]]: 'OF',
  [positions[12]]: '1B/OF',
  [positions[13]]: 'IF/OF',
  [pitcherPositions[1]]: 'SP',
  [pitcherPositions[2]]: 'SP/RP',
  [pitcherPositions[3]]: 'RP',
  [pitcherPositions[4]]: 'CP',
};

export const getUniqTeams = (players) => {
  return uniqBy(players, 'display.team').map(({ display }) => display.team);
};

export const buildChecklist = (data, defaultVal = false) => {
  return data.reduce((acc, value) => {
    acc[value] = defaultVal;
    return acc;
  }, {});
};
