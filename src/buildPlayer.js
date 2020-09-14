import { keys, pick, values, mean } from 'lodash';
import { positions, pitcherPositions } from './helper';

const buildAverage = (data, isPitcher) => {
  const attributesToAverage = isPitcher
    ? ['accuracy', 'velocity', 'junk']
    : ['arm', 'contact', 'fielding', 'power', 'speed'];
  const avgValues = values(pick(data, attributesToAverage));
  const averaged = mean(avgValues.map((val) => +val)).toFixed(0);

  return { ...data, averaged };
};

export const createPlayer = (info) => {
  const isPitcher = info.primaryPosition === '1';
  const position = isPitcher
    ? pitcherPositions[info.pitcherRole]
    : positions[info.primaryPosition];
  const position2 = !isPitcher ? positions[info['55']] : null;
  let pitcherStats = {};
  const stats = {
    team: info.teamName,
    name: `${info.firstName} ${info.lastName}`,
    position,
    position2,
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
    info,
  };
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

// baseballPlayerLocalID: '1';
// optionKey: '0';
// optionType: '0';
// optionValue: '0';
export const compileOptions = (info) => {
  return info.reduce((acc, option) => {
    const optionKeys = keys(option);
    acc[option.baseballPlayerLocalID] = acc[option.baseballPlayerLocalID] ?? {
      id: option.baseballPlayerLocalID,
    };

    optionKeys.forEach((key) => {
      if (
        !acc[option.baseballPlayerLocalID][key] &&
        !['optionKey', 'optionType', 'optionValue'].includes(key)
      ) {
        acc[option.baseballPlayerLocalID][key] = option[key];
      } else if (key === 'optionKey') {
        acc[option.baseballPlayerLocalID][option.optionKey] =
          option.optionValue;
      }
    });
    return acc;
  }, {});
};
