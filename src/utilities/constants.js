export const ASC = 'asc';
export const DESC = 'desc';
export const NO_TRAIT = 'No Trait';

// Determines the sort order or Ratings (by index)
export const RATING_MAP = [
  's',
  'a+',
  'a',
  'a-',
  'b+',
  'b',
  'b-',
  'c+',
  'c',
  'c-',
  'd+',
  'd',
  'd-',
];

export const SKILLS = {
  team: 'team',
  name: 'name',
  position: 'position',
  position_2: 'position2',
  pitcher_role: 'pitcherRole',
  power: 'power',
  contact: 'contact',
  speed: 'speed',
  fielding: 'fielding',
  arm: 'arm',
  trait: 'trait',
  trait_2: 'trait2',
  bats: 'bats',
  throws: 'throws',
  age: 'age',
  gender: 'gender',
  arsenal: 'arsenal',
  velocity: 'velocity',
  junk: 'junk',
  accuracy: 'accuracy',
  salary: 'salary',
  rating: 'rating',
  trait_pretty: 'trait_pretty',
  trait_2_pretty: 'trait_2_pretty',
  arm_slot: 'arm_slot',
};

export const TRAITS = {
  none: NO_TRAIT,
  bad_jumps: 'Bad Jumps',
  bb_prone: 'BB Prone',
  composed: 'Composed',
  con_vs_lhp: 'CON vs LHP',
  con_vs_rhp: 'CON vs RHP',
  high_pitch: 'High Pitch',
  inside_pitch: 'Inside Pitch',
  k_dud: 'K Dud',
  k_man: 'K Man',
  low_pitch: 'Low Pitch',
  outside_pitch: 'Outside Pitch',
  pow_vs_lhp: 'POW vs LHP',
  pow_vs_rhp: 'POW vs RHP',
  rbi_dud: 'RBI Dud',
  rbi_man: 'RBI Man',
  specialist: 'Specialist',
  stealer: 'Stealer',
  tough_out: 'Tough Out',
  utility: 'Utility',
  whiffer: 'Whiffer',
};

export const PRIMARY_POSITIONS = {
  2: 'Catcher',
  3: 'First Base',
  4: 'Second Base',
  5: 'Third Base',
  6: 'Shortstop',
  7: 'Left Field',
  8: 'Center Field',
  9: 'Right Field',
};

export const SECONDARY_POSITIONS = {
  10: 'Infield',
  11: 'Outfield',
  12: 'First Base / Outfield',
  13: 'Infield / Outfield',
  none: 'No 2nd Pos.',
};

export const ALL_POSITIONS = { ...PRIMARY_POSITIONS, ...SECONDARY_POSITIONS };

export const PITCHER_ROLES = {
  1: 'Starting',
  2: 'Starting/Relief',
  3: 'Relief',
  4: 'Closer',
};

// The keys are based on the database output `info` value
export const PITCH_TYPE = {
  58: '4F',
  59: '2F',
  65: 'CF',
  63: 'CB',
  64: 'SL',
  60: 'SB',
  61: 'CW',
  62: 'FK',
};

export const positionsAbbrev = {
  [ALL_POSITIONS[2]]: 'C',
  [ALL_POSITIONS[3]]: '1B',
  [ALL_POSITIONS[4]]: '2B',
  [ALL_POSITIONS[5]]: '3B',
  [ALL_POSITIONS[6]]: 'SS',
  [ALL_POSITIONS[7]]: 'LF',
  [ALL_POSITIONS[8]]: 'CF',
  [ALL_POSITIONS[9]]: 'RF',
  [ALL_POSITIONS[10]]: 'IF',
  [ALL_POSITIONS[11]]: 'OF',
  [ALL_POSITIONS[12]]: '1B/OF',
  [ALL_POSITIONS[13]]: 'IF/OF',
  [ALL_POSITIONS.none]: 'No 2nd Pos.',
  [PITCHER_ROLES[1]]: 'SP',
  [PITCHER_ROLES[2]]: 'SP/RP',
  [PITCHER_ROLES[3]]: 'RP',
  [PITCHER_ROLES[4]]: 'CP',
};

export const tableHeaders = {
  positions: [
    { header: SKILLS.team, column: 'team' },
    { header: SKILLS.name, column: 'rating' },
    { header: SKILLS.position, column: 'name' },
    { header: SKILLS.position_2, column: 'P. Pos' },
    { header: SKILLS.rating, column: 'S. Pos' },
    { header: SKILLS.power, column: 'pow' },
    { header: SKILLS.contact, column: 'con' },
    { header: SKILLS.speed, column: 'spd' },
    { header: SKILLS.fielding, column: 'fld' },
    { header: SKILLS.arm, column: 'arm' },
    { header: SKILLS.trait_pretty, column: 'trait' },
    { header: SKILLS.trait_2_pretty, column: 'trait 2' },
    { header: SKILLS.bats, column: 'bat' },
    { header: SKILLS.throws, column: 'thr' },
    { header: SKILLS.age, column: 'age' },
  ],
  pitchers: [
    { header: SKILLS.team, column: 'team' },
    { header: SKILLS.name, column: 'rating' },
    { header: SKILLS.pitcher_role, column: 'name' },
    { header: SKILLS.arsenal, column: 'role' },
    { header: SKILLS.rating, column: 'spd' },
    { header: SKILLS.speed, column: 'fld' },
    { header: SKILLS.fielding, column: 'arsenal' },
    { header: SKILLS.velocity, column: 'vel' },
    { header: SKILLS.junk, column: 'jnk' },
    { header: SKILLS.accuracy, column: 'acc' },
    { header: SKILLS.trait_pretty, column: 'trait' },
    { header: SKILLS.trait_2_pretty, column: 'trait 2' },
    { header: SKILLS.bats, column: 'bat' },
    { header: SKILLS.throws, column: 'thr' },
    { header: SKILLS.age, column: 'age' },
  ],
};
