import { uniqBy, omit, values, mean } from "lodash";

export const positionList = [
  "Pitcher",
  "Catcher",
  "First Base",
  "Second Base",
  "Third Base",
  "Shortstop",
  "Left Field",
  "Center Field",
  "Right Field",
];

const positions = {
  1: { short: "P", name: positionList[0] },
  2: { short: "C", name: positionList[1] },
  3: { short: "1B", name: positionList[2] },
  4: { short: "2B", name: positionList[3] },
  5: { short: "3B", name: positionList[4] },
  6: { short: "SS", name: positionList[5] },
  7: { short: "LF", name: positionList[6] },
  8: { short: "CF", name: positionList[7] },
  9: { short: "RF", name: positionList[8] },
};

const pitcherRole = {
  1: "SP",
  2: "SP/RP",
  3: "RP",
  4: "CP",
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

const buildAverage = (data, isPitcher) => {
  const sharedOmit = ["team", "name", "position", "age"];
  const omitAttrs = isPitcher
    ? [...sharedOmit, "arm", "contact", "fielding", "power"]
    : [...sharedOmit, "accuracy", "velocity", "junk"];
  const avgValues = values(omit(data, omitAttrs));
  const averaged = mean(avgValues.map((val) => +val)).toFixed(0);

  return { ...data, averaged };
};

export const createPlayer = (info) => {
  const position = positions[info.primaryPosition];
  const isPitcher = info.primaryPosition === "1";
  let pitcherStats = {};
  let stats = {
    team: info.teamName,
    name: `${info.firstName} ${info.lastName}`,
    position: isPitcher ? pitcherRole[info.pitcherRole] : position.name,
    age: info.age,
    arm: info.arm,
    speed: info.speed,
  };

  const positionStats = {
    contact: info.contact,
    fielding: info.fielding,
    power: info.power,
  };

  if (isPitcher) {
    pitcherStats = {
      accuracy: info.accuracy,
      velocity: info.velocity,
      junk: info.junk,
    };
  }

  const display = buildAverage({ ...stats, ...positionStats, ...pitcherStats });

  return {
    isPitcher,
    display,
  };
};

export const ALL_PLAYERS = "All Players";

export const filterPlayers = (filters, players) => {
  const teams = players.filter((player) => filters.teams[player.display.team]);
  const positions = teams.filter((player) => {
    const isPitcher = player.isPitcher && filters.positions["Pitcher"];
    return isPitcher || filters.positions[player.display.position];
  });

  return uniqBy(positions, "display.name");
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

export const initialFilters = {
  positions: buildChecklist(positionList, true),
};
