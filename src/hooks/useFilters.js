import { useState, useCallback } from 'react';
import { values, orderBy, uniqBy } from 'lodash';

import { buildChecklist } from '../utilities/helper';
import {
  PRIMARY_POSITIONS,
  ALL_POSITIONS,
  PITCHER_ROLES,
  SKILLS,
  ASC,
  DESC,
  TRAITS,
  NO_TRAIT,
} from '../utilities/constants';

export const initialFilters = {
  positions: buildChecklist(values(PRIMARY_POSITIONS), true),
  positions2: buildChecklist(values(ALL_POSITIONS), true),
  pitchers: buildChecklist(values(PITCHER_ROLES), true),
  traits: buildChecklist(values(TRAITS), true),
  traits2: buildChecklist(values(TRAITS), true),
  gender: buildChecklist(['M', 'F'], true),
  bats: buildChecklist(['L', 'R', 'S'], true),
  throws: buildChecklist(['L', 'R'], true),
  name: '',
  showCompare: false,
  comparePlayerIds: [],
  sort: { header: SKILLS.team, direction: ASC },
};

const useFilters = () => {
  const [filters, setFilters] = useState(initialFilters);

  const addPlayerCompareList = useCallback(
    (playerId) => {
      const prevFilters = { ...filters };
      const alreadyChecked = prevFilters.comparePlayerIds.includes(+playerId);
      if (alreadyChecked) {
        const filterWithRemoved = prevFilters.comparePlayerIds.filter(
          (id) => id !== +playerId
        );
        return {
          ...prevFilters,
          comparePlayerIds: filterWithRemoved,
          showCompare:
            prevFilters.showCompare && filterWithRemoved.length !== 0,
        };
      }
      const updatedList = {
        ...prevFilters,
        comparePlayerIds: [...prevFilters.comparePlayerIds, +playerId],
      };

      setFilters(updatedList);
    },
    [filters]
  );

  const toggleCompare = () => {
    if (filters.comparePlayerIds.length > 0) {
      setFilters((prevFilters) => {
        return { ...prevFilters, showCompare: !prevFilters.showCompare };
      });
    }
  };

  const filterPlayers = (players) => {
    // Filter comparisons
    if (filters.showCompare) {
      players = players.filter((player) =>
        filters.comparePlayerIds.includes(player.id)
      );
    }

    // Filter team names
    players = players.filter((player) => filters.teams[player.team]);
    players = players.filter((player) => filters.gender[player.gender]);
    players = players.filter((player) => filters.bats[player.bats]);
    players = players.filter((player) => filters.throws[player.throws]);
    players = players.filter(
      (player) =>
        (!player.trait_pretty && filters.traits[NO_TRAIT]) ||
        filters.traits[player.trait_pretty]
    );
    players = players.filter(
      (player) =>
        (!player.trait_2_pretty && filters.traits2[NO_TRAIT]) ||
        filters.traits2[player.trait_2_pretty]
    );

    // Filter positions
    players = players.filter(({ position, position2, pitcherRole }) => {
      const isPitcher = filters.pitchers[pitcherRole];
      const isPosition =
        filters.positions[position] && filters.positions2[position2];
      return isPitcher || isPosition;
    });

    // Filter name search
    if (filters.name) {
      players = players.filter((player) =>
        player.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    const sorted = orderBy(
      players,
      (player) => {
        const val = player[filters.sort.header];
        if (!val) return '';

        return isNaN(val) ? val.toLowerCase() : +val;
      },
      [filters.sort.direction]
    );

    return uniqBy(sorted, 'name');
  };

  const updateSort = useCallback(
    (header) => {
      if (header === 'arsenal') {
        return;
      }

      setFilters((prevFilters) => {
        let direction;
        if (prevFilters.sort.header === header) {
          direction = prevFilters.sort.direction === ASC ? DESC : ASC;
        } else {
          direction = prevFilters.sort.direction === ASC ? ASC : DESC;
        }

        return { ...prevFilters, sort: { header, direction } };
      });
    },
    [setFilters]
  );

  const clearCompareSelection = () => {
    setFilters((prevFilters) => {
      return { ...prevFilters, showCompare: false, comparePlayerIds: [] };
    });
  };

  const searchNames = useCallback((event) => {
    event.persist();

    setFilters((prevFilters) => {
      return { ...prevFilters, name: event.target.value };
    });
  }, []);

  const clearSearch = useCallback(() => {
    setFilters((prevFilters) => {
      return { ...prevFilters, name: '' };
    });
  }, [setFilters]);

  // Setup useReducer for all of this
  return {
    filters,
    setFilters,
    filterPlayers,
    addPlayerCompareList,
    toggleCompare,
    updateSort,
    clearCompareSelection,
    searchNames,
    clearSearch,
  };
};

export default useFilters;
