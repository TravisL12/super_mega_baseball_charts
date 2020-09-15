import { keys, pick, reduce } from 'lodash';
import { positions, pitcherPositions } from './helper';
import { options } from './playerOptions';

const buildArsenal = (info) => {
  const pitches = pick(info, ['58', '59', '60', '61', '62', '63', '64', '65']);
  return reduce(
    pitches,
    (total, value, id) => {
      if (value === '1') {
        total.push(options[id]);
      }
      return total;
    },
    []
  );
};

export const createPlayer = (info) => {
  const isPitcher = info.primaryPosition === '1';

  const position2 = !isPitcher ? positions[info['55']] : null;
  const gender = ['M', 'F'][info[0]];
  const throws = ['L', 'R'][info[4]];
  const bats = ['L', 'R', 'S'][info[5]];
  const arsenal = buildArsenal(info);
  const position = isPitcher
    ? pitcherPositions[info.pitcherRole]
    : positions[info.primaryPosition];

  const display = {
    team: info.teamName,
    name: `${info.firstName} ${info.lastName}`,
    position,
    position2,
    power: info.power,
    contact: info.contact,
    speed: info.speed,
    fielding: info.fielding,
    arm: info.arm,
    trait: info.trait,
    trait2: info.subType,
    bats,
    throws,
    age: info.age,
    gender: gender,
    arsenal,
    velocity: info.velocity,
    junk: info.junk,
    accuracy: info.accuracy,
  };

  return {
    isPitcher,
    display,
    info,
  };
};

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
