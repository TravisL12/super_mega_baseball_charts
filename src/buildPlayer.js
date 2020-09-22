import { keys, pick, reduce } from 'lodash';
import { ALL_POSITIONS, PITCHER_ROLES } from './helper';
import { options } from './playerOptions';

export const SKILLS = {
  TEAM: 'team',
  NAME: 'name',
  POSITION: 'position',
  POSITION_2: 'position2',
  PITCHER_ROLE: 'pitcherRole',
  POWER: 'power',
  CONTACT: 'contact',
  SPEED: 'speed',
  FIELDING: 'fielding',
  ARM: 'arm',
  TRAIT: 'trait',
  TRAIT_2: 'trait2',
  BATS: 'bats',
  THROWS: 'throws',
  AGE: 'age',
  GENDER: 'gender',
  ARSENAL: 'arsenal',
  VELOCITY: 'velocity',
  JUNK: 'junk',
  ACCURACY: 'accuracy',
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

  const display = {
    [SKILLS.TEAM]: info.teamName,
    [SKILLS.NAME]: `${info.firstName} ${info.lastName}`,
    [SKILLS.POSITION]: position,
    [SKILLS.POSITION_2]: position2,
    [SKILLS.PITCHER_ROLE]: PITCHER_ROLES[info.pitcherRole],
    [SKILLS.POWER]: info.power,
    [SKILLS.CONTACT]: info.contact,
    [SKILLS.SPEED]: info.speed,
    [SKILLS.FIELDING]: info.fielding,
    [SKILLS.ARM]: info.arm,
    [SKILLS.TRAIT]: info.trait,
    [SKILLS.TRAIT_2]: info.subType,
    [SKILLS.BATS]: bats,
    [SKILLS.THROWS]: throws,
    [SKILLS.AGE]: info.age,
    [SKILLS.GENDER]: gender,
    [SKILLS.ARSENAL]: arsenal,
    [SKILLS.VELOCITY]: info.velocity,
    [SKILLS.JUNK]: info.junk,
    [SKILLS.ACCURACY]: info.accuracy,
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
