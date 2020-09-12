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

export class Player {
  constructor(info) {
    this.info = info;
    this.name = `${info.firstName} ${info.lastName}`;
    this.position = positions[info.primaryPosition];
    this.team = info.teamName;
  }

  export() {
    return {
      name: this.name,
      position: this.position,
      team: this.team,
    };
  }
}

export const buildTeams = (data) => {
  return data.reduce((teams, info) => {
    const player = new Player(info);
    if (teams[player.team]) {
      teams[player.team].push(player);
    } else {
      teams[player.team] = [player];
    }
    return teams;
  }, {});
};
