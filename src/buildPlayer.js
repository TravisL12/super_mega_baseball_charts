import { keys, pick, reduce } from "lodash";
import { ALL_POSITIONS, PITCHER_ROLES } from "./helper";
import { options } from "./playerOptions";

export const TEAM = "team";
export const NAME = "name";
export const POSITION = "position";
export const POSITION_2 = "position2";
export const PITCHER_ROLE = "pitcherRole";
export const POWER = "power";
export const CONTACT = "contact";
export const SPEED = "speed";
export const FIELDING = "fielding";
export const ARM = "arm";
export const TRAIT = "trait";
export const TRAIT_2 = "trait2";
export const BATS = "bats";
export const THROWS = "throws";
export const AGE = "age";
export const GENDER = "gender";
export const ARSENAL = "arsenal";
export const VELOCITY = "velocity";
export const JUNK = "junk";
export const ACCURACY = "accuracy";

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
  const position2 = ALL_POSITIONS[info[55]];

  const display = {
    [TEAM]: info.teamName,
    [NAME]: `${info.firstName} ${info.lastName}`,
    [POSITION]: position,
    [POSITION_2]: position2,
    [PITCHER_ROLE]: PITCHER_ROLES[info.pitcherRole],
    [POWER]: info.power,
    [CONTACT]: info.contact,
    [SPEED]: info.speed,
    [FIELDING]: info.fielding,
    [ARM]: info.arm,
    [TRAIT]: info.trait,
    [TRAIT_2]: info.subType,
    [BATS]: bats,
    [THROWS]: throws,
    [AGE]: info.age,
    [GENDER]: gender,
    [ARSENAL]: arsenal,
    [VELOCITY]: info.velocity,
    [JUNK]: info.junk,
    [ACCURACY]: info.accuracy,
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
        !["optionKey", "optionType", "optionValue"].includes(key)
      ) {
        acc[option.baseballPlayerLocalID][key] = option[key];
      } else if (key === "optionKey") {
        acc[option.baseballPlayerLocalID][option.optionKey] =
          option.optionValue;
      }
    });
    return acc;
  }, {});
};
