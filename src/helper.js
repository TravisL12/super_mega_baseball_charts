import { uniqBy, pick, values, mean } from 'lodash';

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
};

export const pitcherRole = {
  1: 'SP',
  2: 'SP/RP',
  3: 'RP',
  4: 'CP',
};

// accuracy: "46"
// age: "22"
// arm: ""
// contact: "38"
// fielding: "98"
// firstName: "Fran"
// junk: "54"
// lastName: "Gipani"
// pitcherRole: "1"
// power: "2"
// primaryPosition: "1"
// speed: "35"
// teamName: "Beewolves"
// velocity: "66"
// trait: "1"
// trait2: "5"

const buildAverage = (data, isPitcher) => {
  const attributesToAverage = isPitcher
    ? ['accuracy', 'velocity', 'junk']
    : ['arm', 'contact', 'fielding', 'power', 'speed'];
  const avgValues = values(pick(data, attributesToAverage));
  const averaged = mean(avgValues.map((val) => +val)).toFixed(0);

  return { ...data, averaged };
};

export const createPlayer = (info) => {
  const position = positions[info.primaryPosition];
  const isPitcher = info.primaryPosition === '1';
  let pitcherStats = {};
  const stats = {
    team: info.teamName,
    name: `${info.firstName} ${info.lastName}`,
    position: isPitcher ? pitcherRole[info.pitcherRole] : position,
    age: info.age,
    power: info.power,
    contact: info.contact,
    speed: info.speed,
    fielding: info.fielding,
    arm: info.arm,
  };

  const traits = {
    trait: info.trait,
    trait2: info.subType,
  };

  if (isPitcher) {
    pitcherStats = {
      velocity: info.velocity,
      junk: info.junk,
      accuracy: info.accuracy,
    };
  }

  const display = buildAverage(
    { ...stats, ...pitcherStats, ...traits },
    isPitcher
  );

  return {
    isPitcher,
    display,
  };
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
