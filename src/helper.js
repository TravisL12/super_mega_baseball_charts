import { uniqBy, omit, values, mean } from "lodash";

const positionList = ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"];
const positionLongList = [
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
  1: positionLongList[0],
  2: positionLongList[1],
  3: positionLongList[2],
  4: positionLongList[3],
  5: positionLongList[4],
  6: positionLongList[5],
  7: positionLongList[6],
  8: positionLongList[7],
  9: positionLongList[8],
};

export const positionsAbbrev = {
  [positionLongList[0]]: positionList[0],
  [positionLongList[1]]: positionList[1],
  [positionLongList[2]]: positionList[2],
  [positionLongList[3]]: positionList[3],
  [positionLongList[4]]: positionList[4],
  [positionLongList[5]]: positionList[5],
  [positionLongList[6]]: positionList[6],
  [positionLongList[7]]: positionList[7],
  [positionLongList[8]]: positionList[8],
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
    ? [...sharedOmit, "arm", "contact", "fielding", "power", "speed"]
    : [...sharedOmit, "accuracy", "velocity", "junk"];
  const avgValues = values(omit(data, omitAttrs));
  const averaged = mean(avgValues.map((val) => +val)).toFixed(0);

  return { ...data, averaged };
};

export const createPlayer = (info) => {
  const position = positions[info.primaryPosition];
  const isPitcher = info.primaryPosition === "1";
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

  if (isPitcher) {
    pitcherStats = {
      velocity: info.velocity,
      junk: info.junk,
      accuracy: info.accuracy,
    };
  }

  const display = buildAverage({ ...stats, ...pitcherStats }, isPitcher);

  return {
    isPitcher,
    display,
  };
};

export const ALL_PLAYERS = "All Players";

export const filterPlayers = (filters, players) => {
  players = players.filter((player) => filters.teams[player.display.team]);
  players = players.filter((player) => {
    const isPitcher = player.isPitcher && filters.positions["Pitcher"];
    return isPitcher || filters.positions[player.display.position];
  });

  if (filters.name) {
    players = players.filter((player) =>
      player.display.name.toLowerCase().includes(filters.name.toLowerCase())
    );
  }

  return uniqBy(players, "display.name");
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
  positions: buildChecklist(positionLongList, true),
  name: "",
};

export const sortColumns = (players, sortAttr) => {
  if (!sortAttr.header) {
    return players;
  }

  return players.sort((a, b) => {
    const aDisplay = isNaN(a.display[sortAttr.header])
      ? a.display[sortAttr.header]
      : +a.display[sortAttr.header];
    const bDisplay = isNaN(b.display[sortAttr.header])
      ? b.display[sortAttr.header]
      : +b.display[sortAttr.header];

    if (sortAttr.direction === "asc") {
      return aDisplay > bDisplay ? 1 : -1;
    } else {
      return aDisplay < bDisplay ? 1 : -1;
    }
  });
};
