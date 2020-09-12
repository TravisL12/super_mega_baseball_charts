const positions = {
  1: { short: "P", name: "Pitcher" },
  2: { short: "C", name: "Catcher" },
  3: { short: "1B", name: "First Base" },
  4: { short: "2B", name: "Second Base" },
  5: { short: "3B", name: "Third Base" },
  6: { short: "SS", name: "Shortstop" },
  7: { short: "LF", name: "Left Field" },
  8: { short: "CF", name: "Center Field" },
  9: { short: "RF", name: "Right Field" },
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

const createPlayer = (info) => {
  const position = positions[info.primaryPosition];
  let pitcherStats = {};
  let stats = {
    name: `${info.firstName} ${info.lastName}`,
    position: position.name,
    age: info.age,
    arm: info.arm,
  };

  if (position.name === "Pitcher") {
    pitcherStats = {
      pitcherRole: pitcherRole[info.pitcherRole],
      accuracy: info.accuracy,
      speed: info.speed,
      velocity: info.velocity,
      junk: info.junk,
    };
  }

  const positionStats = {
    contact: info.contact,
    fielding: info.fielding,
    power: info.power,
  };

  return { ...stats, ...pitcherStats, ...positionStats };
};

export const buildTeams = (data) => {
  return data.reduce((teams, info) => {
    const player = createPlayer(info);
    if (teams[info.teamName]) {
      teams[info.teamName].push(player);
    } else {
      teams[info.teamName] = [player];
    }
    return teams;
  }, {});
};
