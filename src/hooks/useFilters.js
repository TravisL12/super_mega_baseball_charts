import { useState, useCallback } from "react";
import { values, orderBy, uniqBy, keys } from "lodash";

import { buildChecklist } from "../utilities/helper";
import {
  PRIMARY_POSITIONS,
  ALL_POSITIONS,
  PITCHER_ROLES,
  SKILLS,
  ASC,
  DESC,
  TRAITS,
  NO_TRAIT,
  RATING_MAP,
  PITCH_TYPE,
} from "../utilities/constants";

export const initialFilters = {
  positions: buildChecklist(values(PRIMARY_POSITIONS), true),
  positions2: buildChecklist(values(ALL_POSITIONS), true),
  pitchers: buildChecklist(values(PITCHER_ROLES), true),
  traits: buildChecklist(values(TRAITS), true),
  traits2: buildChecklist(values(TRAITS), true),
  gender: buildChecklist(["M", "F"], true),
  bats: buildChecklist(["L", "R", "S"], true),
  throws: buildChecklist(["L", "R"], true),
  rating: buildChecklist(["S", "A", "B", "C", "D"], true),
  pitches: buildChecklist(values(PITCH_TYPE), false),
  name: "",
  showCompare: false,
  comparePlayerIds: [],
  sort: { header: SKILLS.team, direction: ASC },
};

const useFilters = () => {
  const [filters, setFilters] = useState(initialFilters);

  const addPlayerCompareList = (playerId) => {
    let updatedList;
    const prevFilters = { ...filters };
    const alreadyChecked = prevFilters.comparePlayerIds.includes(+playerId);
    if (alreadyChecked) {
      const filterWithRemoved = prevFilters.comparePlayerIds.filter(
        (id) => id !== +playerId
      );
      updatedList = {
        ...prevFilters,
        comparePlayerIds: filterWithRemoved,
        showCompare: prevFilters.showCompare && filterWithRemoved.length !== 0,
      };
    } else {
      updatedList = {
        ...prevFilters,
        comparePlayerIds: [...prevFilters.comparePlayerIds, +playerId],
      };
    }

    setFilters(updatedList);
  };

  const toggleCompare = () => {
    if (filters.comparePlayerIds.length > 0) {
      setFilters((prevFilters) => {
        return { ...prevFilters, showCompare: !prevFilters.showCompare };
      });
    }
  };

  const orderRatings = (rating) =>
    RATING_MAP.findIndex((r) => r === rating.toLowerCase());

  const filterPlayers = (players) => {
    // Filter comparisons
    if (filters.showCompare) {
      players = players.filter((player) =>
        filters.comparePlayerIds.includes(player.id)
      );
    }

    // Filter team / gender / bats / throws / rating
    players = players.filter((player) => filters.teams[player.team]);
    players = players.filter((player) => filters.gender[player.gender]);
    players = players.filter((player) => filters.bats[player.bats]);
    players = players.filter((player) => filters.throws[player.throws]);
    players = players.filter(
      (player) => filters.rating[player.rating.slice(0, 1)] // remove the +/- from rating
    );

    // Filter traits
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

    // Filter pitch arsenal
    players = players.filter(({ arsenal, pitcherRole }) => {
      const isPitcher = filters.pitchers[pitcherRole];
      const checkedPitches = keys(filters.pitches).filter(
        (pitch) => filters.pitches[pitch]
      );

      const hasPitches = checkedPitches.every((pitch) =>
        arsenal.includes(pitch)
      );
      return !isPitcher || (isPitcher && hasPitches);
    });

    // Filter name search
    if (filters.name) {
      const splitSearch = filters.name
        .split(",")
        .map((name) => name.trim())
        .filter((x) => x);
      if (splitSearch.length > 1) {
        players = players.filter(
          (player) =>
            splitSearch.filter((name) => {
              return player.name.toLowerCase().includes(name.toLowerCase());
            }).length > 0
        );
      } else {
        players = players.filter((player) =>
          player.name.toLowerCase().includes(splitSearch[0].toLowerCase())
        );
      }
    }
    const sorted = orderBy(
      players,
      (player) => {
        const val =
          filters.sort.header === "rating"
            ? orderRatings(player.rating)
            : player[filters.sort.header];
        if (!val) return "";

        return isNaN(val) ? val.toLowerCase() : +val;
      },
      [filters.sort.direction]
    );

    return uniqBy(sorted, "name");
  };

  const updateSort = useCallback(
    (header) => {
      if (header === "arsenal") {
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

  const searchNames = useCallback(
    (name) => {
      const prevFilters = { ...filters };
      setFilters({ ...prevFilters, name });
    },
    [filters]
  );

  const clearSearch = useCallback(() => {
    setFilters((prevFilters) => {
      return { ...prevFilters, name: "" };
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
