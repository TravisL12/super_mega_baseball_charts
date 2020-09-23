import { useState } from "react";

const sortColumns = (players, sortAttr) => {
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

const sortTeamColumns = (teams, sortAttr) => {
  if (!sortAttr.header) {
    return teams;
  }

  return teams.sort((a, b) => {
    const aDisplay = isNaN(a[sortAttr.header])
      ? a[sortAttr.header]
      : +a[sortAttr.header];
    const bDisplay = isNaN(b[sortAttr.header])
      ? b[sortAttr.header]
      : +b[sortAttr.header];

    if (sortAttr.direction === "asc") {
      return aDisplay > bDisplay ? 1 : -1;
    } else {
      return aDisplay < bDisplay ? 1 : -1;
    }
  });
};

const usePlayerSort = () => {
  const [sortOrder, setSortOrder] = useState({});

  const updateSort = (header) => {
    setSortOrder((prevHeader) => {
      let direction;
      if (prevHeader.header === header) {
        direction = prevHeader.direction === "asc" ? "desc" : "asc";
      } else {
        direction = prevHeader.direction === "asc" ? "asc" : "desc";
      }

      return { header, direction };
    });
  };

  return { sortOrder, updateSort, sortColumns, sortTeamColumns };
};

export default usePlayerSort;
