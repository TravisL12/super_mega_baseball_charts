export const ASC = "asc";
export const DESC = "desc";
export const NO_TRAIT = "No Trait";
export const IMAGES_URL =
  process.env.NODE_ENV === "production"
    ? `https://smb4.s3.us-west-2.amazonaws.com/smb3`
    : process.env.PUBLIC_URL;
// Determines the sort order or Ratings (by index)
export const RATING_MAP = [
  "s",
  "a+",
  "a",
  "a-",
  "b+",
  "b",
  "b-",
  "c+",
  "c",
  "c-",
  "d+",
  "d",
  "d-",
];

export const SKILLS = {
  team: "team",
  name: "name",
  position: "position",
  position_2: "position2",
  pitcher_role: "pitcherRole",
  power: "power",
  contact: "contact",
  speed: "speed",
  fielding: "fielding",
  arm: "arm",
  trait: "trait",
  trait_2: "trait2",
  bats: "bats",
  throws: "throws",
  age: "age",
  gender: "gender",
  arsenal: "arsenal",
  velocity: "velocity",
  junk: "junk",
  accuracy: "accuracy",
  salary: "salary",
  rating: "rating",
  trait_pretty: "trait_pretty",
  trait_2_pretty: "trait_2_pretty",
  arm_slot: "arm_slot",
};

export const TRAITS = {
  none: NO_TRAIT,
  bad_jumps: "Bad Jumps",
  bb_prone: "BB Prone",
  composed: "Composed",
  con_vs_lhp: "CON vs LHP",
  con_vs_rhp: "CON vs RHP",
  high_pitch: "High Pitch",
  inside_pitch: "Inside Pitch",
  k_dud: "K Dud",
  k_man: "K Man",
  low_pitch: "Low Pitch",
  outside_pitch: "Outside Pitch",
  pow_vs_lhp: "POW vs LHP",
  pow_vs_rhp: "POW vs RHP",
  rbi_dud: "RBI Dud",
  rbi_man: "RBI Man",
  specialist: "Specialist",
  stealer: "Stealer",
  tough_out: "Tough Out",
  utility: "Utility",
  whiffer: "Whiffer",
};

export const PRIMARY_POSITIONS = {
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
  none: "No 2nd Pos.",
};

export const PITCHER_ROLES = {
  1: "Starting",
  2: "Starting/Relief",
  3: "Relief",
  4: "Closer",
};

export const ALL_POSITIONS = {
  ...PRIMARY_POSITIONS,
  ...SECONDARY_POSITIONS,
};

// The keys are based on the database output `info` value
export const PITCH_TYPE = {
  58: "4F",
  59: "2F",
  65: "CF",
  63: "CB",
  64: "SL",
  60: "SB",
  61: "CH",
  62: "FK",
};

export const PITCH_NAME = {
  [PITCH_TYPE[58]]: "4-seam fastball",
  [PITCH_TYPE[59]]: "2-seam fastball",
  [PITCH_TYPE[65]]: "Cut fastball",
  [PITCH_TYPE[63]]: "Curveball",
  [PITCH_TYPE[64]]: "Slider",
  [PITCH_TYPE[60]]: "Screwball",
  [PITCH_TYPE[61]]: "Change up",
  [PITCH_TYPE[62]]: "Forkball",
};

export const positionsAbbrev = {
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
  [ALL_POSITIONS.none]: "No 2nd Pos.",
  [PITCHER_ROLES[1]]: "SP",
  [PITCHER_ROLES[2]]: "SP/RP",
  [PITCHER_ROLES[3]]: "RP",
  [PITCHER_ROLES[4]]: "CP",
};

export const tableHeaders = {
  positions: [
    { header: SKILLS.team, column: "team" },
    { header: SKILLS.name, column: "name" },
    { header: SKILLS.position, column: "P. Pos" },
    { header: SKILLS.position_2, column: "S. Pos" },
    { header: SKILLS.rating, column: "rating" },
    { header: SKILLS.power, column: "pow" },
    { header: SKILLS.contact, column: "con" },
    { header: SKILLS.speed, column: "spd" },
    { header: SKILLS.fielding, column: "fld" },
    { header: SKILLS.arm, column: "arm" },
    { header: SKILLS.trait_pretty, column: "trait" },
    { header: SKILLS.trait_2_pretty, column: "trait 2" },
    { header: SKILLS.bats, column: "bat" },
    { header: SKILLS.throws, column: "thr" },
    { header: SKILLS.age, column: "age" },
  ],
  pitchers: [
    { header: SKILLS.team, column: "team" },
    { header: SKILLS.name, column: "name" },
    { header: SKILLS.pitcher_role, column: "role" },
    { header: SKILLS.arsenal, column: "arsenal" },
    { header: SKILLS.rating, column: "rating" },
    { header: SKILLS.speed, column: "spd" },
    { header: SKILLS.fielding, column: "fld" },
    { header: SKILLS.velocity, column: "vel" },
    { header: SKILLS.junk, column: "jnk" },
    { header: SKILLS.accuracy, column: "acc" },
    { header: SKILLS.trait_pretty, column: "trait" },
    { header: SKILLS.trait_2_pretty, column: "trait 2" },
    { header: SKILLS.bats, column: "bat" },
    { header: SKILLS.throws, column: "thr" },
    { header: SKILLS.age, column: "age" },
  ],
};
