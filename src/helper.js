import { uniqBy } from "lodash";

export const ALL_POSITIONS = {
  2: "Catcher",
  3: "First Base",
  4: "Second Base",
  5: "Third Base",
  6: "Shortstop",
  7: "Left Field",
  8: "Center Field",
  9: "Right Field",
};

export const SECONDARY_POSITIONS = {
  10: "Infield",
  11: "Outfield",
  12: "First Base / Outfield",
  13: "Infield / Outfield",
};

export const PITCHER_ROLES = {
  1: "Starting",
  2: "Starting/Relief",
  3: "Relief",
  4: "Closer",
};

export const PITCH_TYPE = {
  58: "4F",
  59: "2F",
  60: "SB",
  61: "CW",
  62: "FK",
  63: "CB",
  64: "SL",
  65: "CF",
};

export const positionsAbbrev = {
  [ALL_POSITIONS[1]]: "P",
  [ALL_POSITIONS[2]]: "C",
  [ALL_POSITIONS[3]]: "1B",
  [ALL_POSITIONS[4]]: "2B",
  [ALL_POSITIONS[5]]: "3B",
  [ALL_POSITIONS[6]]: "SS",
  [ALL_POSITIONS[7]]: "LF",
  [ALL_POSITIONS[8]]: "CF",
  [ALL_POSITIONS[9]]: "RF",
  [ALL_POSITIONS[10]]: "IF",
  [ALL_POSITIONS[11]]: "OF",
  [ALL_POSITIONS[12]]: "1B/OF",
  [ALL_POSITIONS[13]]: "IF/OF",
  [PITCHER_ROLES[1]]: "SP",
  [PITCHER_ROLES[2]]: "SP/RP",
  [PITCHER_ROLES[3]]: "RP",
  [PITCHER_ROLES[4]]: "CP",
};

export const getUniqTeams = (players) => {
  return uniqBy(players, "display.team").map(({ display }) => display.team);
};

export const buildChecklist = (data, defaultVal = false) => {
  return data.reduce((acc, value) => {
    acc[value] = defaultVal;
    return acc;
  }, {});
};
