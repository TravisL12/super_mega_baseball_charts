import { keys, pick, reduce, snakeCase } from "lodash";
import { ALL_POSITIONS, PITCHER_ROLES, SKILLS } from "./constants";
import { options } from "./playerOptions";

const buildArsenal = (info) => {
  const pitches = pick(info, ["58", "59", "60", "61", "62", "63", "64", "65"]);
  return reduce(
    pitches,
    (total, value, id) => {
      if (value === "1") {
        total.push(options[id]);
      }
      return total;
    },
    []
  );
};

export const createPlayer = (info) => {
  const isPitcher = info.primaryPosition === "1";

  const gender = ["M", "F"][info[0]];
  const throws = ["L", "R"][info[4]];
  const bats = ["L", "R", "S"][info[5]];
  const arsenal = buildArsenal(info);
  const position = ALL_POSITIONS[info[54]];
  const position2 = info[55] ? ALL_POSITIONS[info[55]] : ALL_POSITIONS.none;
  const battingOrder = info.battingOrder;
  const jersey = info[20];

  const skills = {
    [SKILLS.team]: info.teamName,
    [SKILLS.name]: `${info.firstName} ${info.lastName}`,
    [SKILLS.position]: position || PITCHER_ROLES[info.pitcherRole],
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
    [SKILLS.salary]: info.salary,
    [SKILLS.rating]: info.rating,
    [SKILLS.trait_pretty]: info.traitPretty,
    [SKILLS.trait_2_pretty]: info.subTraitPretty,
    [SKILLS.arm_slot]: info.armSlot,
    battingOrder,
    jersey,
    id: +info.id,
    isPitcher,
    info,
    image: `${snakeCase(info.teamName)}-${info.firstName}_${snakeCase(
      info.lastName
    )}.png`.toLowerCase(),
    checked: false,
  };

  return skills;
};

export const compileOptions = (info) => {
  return info.reduce((acc, option) => {
    const optionKeys = keys(option);
    acc[option.id] = acc[option.id] ?? {
      id: option.id,
    };

    optionKeys.forEach((key) => {
      if (
        !acc[option.id][key] &&
        !["optionKey", "optionType", "optionValue"].includes(key)
      ) {
        acc[option.id][key] = option[key];
      } else if (key === "optionKey") {
        acc[option.id][option.optionKey] = option.optionValue;
      }
    });
    return acc;
  }, {});
};

export const buildTeams = (players) => {
  return players.reduce((teams, player) => {
    const { team } = player;
    teams[team] = teams[team] || { name: team, players: [] };
    teams[team].players.push(player);
    return teams;
  }, {});
};
