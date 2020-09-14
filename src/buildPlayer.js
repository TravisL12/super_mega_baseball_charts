import { keys, pick, values, mean } from 'lodash';
import { positions, pitcherPositions } from './helper';
import { options } from './playerOptions';

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

  const position2 = !isPitcher ? positions[info['55']] : null;
  const gender = ['M', 'F'][info[0]] || 'M';
  const throws = ['L', 'R'][info[4]] || 'R';
  const bats = ['L', 'R'][info[5]] || 'R';
  const position = isPitcher
    ? pitcherPositions[info.pitcherRole]
    : positions[info.primaryPosition];

  const stats = {
    team: info.teamName,
    name: `${info.firstName} ${info.lastName}`,
    position,
    position2,
    power: info.power,
    contact: info.contact,
    speed: info.speed,
    fielding: info.fielding,
    arm: info.arm,
  };

  let pitcherStats = {};
  if (isPitcher) {
    delete stats.position2;
    pitcherStats = {
      velocity: info.velocity,
      junk: info.junk,
      accuracy: info.accuracy,
    };
  }

  const traits = {
    trait: info.trait,
    trait2: info.subType,
    bat: bats,
    thr: throws,
    age: info.age,
    gen: gender,
  };

  const display = { ...stats, ...pitcherStats, ...traits };

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
