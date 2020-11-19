export const ASC = 'asc';
export const DESC = 'desc';

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
  none: 'None',
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
  none: 'None',
};

export const ALL_POSITIONS = { ...PRIMARY_POSITIONS, ...SECONDARY_POSITIONS };

export const PITCHER_ROLES = {
  1: 'Starting',
  2: 'Starting/Relief',
  3: 'Relief',
  4: 'Closer',
};

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
  [PITCHER_ROLES[1]]: 'SP',
  [PITCHER_ROLES[2]]: 'SP/RP',
  [PITCHER_ROLES[3]]: 'RP',
  [PITCHER_ROLES[4]]: 'CP',
};

export const tableColumnMap = {
  positions: {
    [SKILLS.team]: 'team',
    [SKILLS.rating]: 'rating',
    [SKILLS.name]: 'name',
    [SKILLS.position]: 'P. Pos',
    [SKILLS.position_2]: 'S. Pos',
    [SKILLS.power]: 'pow',
    [SKILLS.contact]: 'con',
    [SKILLS.speed]: 'spd',
    [SKILLS.fielding]: 'fld',
    [SKILLS.arm]: 'arm',
    [SKILLS.trait_pretty]: 'trait 1',
    [SKILLS.trait_2_pretty]: 'trait 2',
    [SKILLS.bats]: 'bat',
    [SKILLS.throws]: 'thr',
    [SKILLS.age]: 'age',
    [SKILLS.gender]: 'gen',
  },
  pitchers: {
    [SKILLS.team]: 'team',
    [SKILLS.rating]: 'rating',
    [SKILLS.name]: 'name',
    [SKILLS.pitcher_role]: 'role',
    [SKILLS.power]: 'pow',
    [SKILLS.contact]: 'con',
    [SKILLS.speed]: 'spd',
    [SKILLS.fielding]: 'fld',
    [SKILLS.arsenal]: 'arsenal',
    [SKILLS.velocity]: 'vel',
    [SKILLS.junk]: 'jnk',
    [SKILLS.accuracy]: 'acc',
    [SKILLS.trait_pretty]: 'trait 1',
    [SKILLS.trait_2_pretty]: 'trait 2',
    [SKILLS.bats]: 'bat',
    [SKILLS.throws]: 'thr',
    [SKILLS.age]: 'age',
    [SKILLS.gender]: 'gen',
  },
};

export const tableHeaders = {
  positions: [
    SKILLS.team,
    SKILLS.rating,
    SKILLS.name,
    SKILLS.position,
    SKILLS.position_2,
    SKILLS.power,
    SKILLS.contact,
    SKILLS.speed,
    SKILLS.fielding,
    SKILLS.arm,
    SKILLS.trait_pretty,
    SKILLS.trait_2_pretty,
    SKILLS.bats,
    SKILLS.throws,
    SKILLS.age,
    SKILLS.gender,
  ],
  pitchers: [
    SKILLS.team,
    SKILLS.rating,
    SKILLS.name,
    SKILLS.pitcher_role,
    SKILLS.arsenal,
    SKILLS.power,
    SKILLS.contact,
    SKILLS.speed,
    SKILLS.fielding,
    SKILLS.velocity,
    SKILLS.junk,
    SKILLS.accuracy,
    SKILLS.trait_pretty,
    SKILLS.trait_2_pretty,
    SKILLS.bats,
    SKILLS.throws,
    SKILLS.age,
    SKILLS.gender,
  ],
};
