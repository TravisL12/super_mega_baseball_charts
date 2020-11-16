import { uniqBy } from 'lodash';

export const getUniqTeams = (players) => {
  return uniqBy(players, 'team').map(({ team }) => team);
};

export const buildChecklist = (data, defaultVal = false) => {
  return data.reduce((acc, value) => {
    acc[value] = defaultVal;
    return acc;
  }, {});
};
