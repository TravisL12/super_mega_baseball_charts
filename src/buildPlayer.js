import { keys, pick, reduce } from 'lodash';
import { ALL_POSITIONS, PITCHER_ROLES } from './helper';
import { options } from './playerOptions';

export const SKILLS = {
  team: 'team',
  name: 'name',
  position: 'position',
  position_2: 'position2',
  pitcher_role: 'pitcherRole',
  power: 'power',
  contact: 'contact',
  speed: 'speed',
  fielding: 'fielding',
  arm: 'arm',
  trait: 'trait',
  trait_2: 'trait2',
  bats: 'bats',
  throws: 'throws',
  age: 'age',
  gender: 'gender',
  arsenal: 'arsenal',
  velocity: 'velocity',
  junk: 'junk',
  accuracy: 'accuracy',
};

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

  const gender = ['M', 'F'][info[0]];
  const throws = ['L', 'R'][info[4]];
  const bats = ['L', 'R', 'S'][info[5]];
  const arsenal = buildArsenal(info);
  const position = ALL_POSITIONS[info[54]];
  const position2 = ALL_POSITIONS[info[55]];
  const battingOrder = info.battingOrder;

  const display = {
    [SKILLS.team]: info.teamName,
    [SKILLS.name]: `${info.firstName} ${info.lastName}`,
    [SKILLS.position]: position,
    [SKILLS.position_2]: position2,
    [SKILLS.pitcher_role]: PITCHER_ROLES[info.pitcherRole],
    [SKILLS.power]: info.power,
    [SKILLS.contact]: info.contact,
    [SKILLS.speed]: info.speed,
    [SKILLS.fielding]: info.fielding,
    [SKILLS.arm]: info.arm,
    [SKILLS.trait]: info.trait,
    [SKILLS.trait_2]: info.subType,
    [SKILLS.bats]: bats,
    [SKILLS.throws]: throws,
    [SKILLS.age]: info.age,
    [SKILLS.gender]: gender,
    [SKILLS.arsenal]: arsenal,
    [SKILLS.velocity]: info.velocity,
    [SKILLS.junk]: info.junk,
    [SKILLS.accuracy]: info.accuracy,
    battingOrder,
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

export const buildTeams = (players) => {
  return players.reduce((teams, player) => {
    const { team } = player.display;
    teams[team] = teams[team] || { name: team, players: [] };
    teams[team].players.push(player);
    return teams;
  }, {});
};
