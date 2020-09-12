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

export const createPlayer = (info) => {
  const position = positions[info.primaryPosition];
  const isPitcher = info.primaryPosition === "1";
  let pitcherStats = {};
  let stats = {
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

  return {
    team: info.teamName,
    isPitcher,
    display: { ...stats, ...positionStats, ...pitcherStats },
  };
};
