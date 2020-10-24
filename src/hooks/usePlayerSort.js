import { useState } from 'react';

const sortColumns = (players, sortAttr) => {
  if (!sortAttr.header) {
    return players;
  }

  return players.sort((a, b) => {
    const aValue = isNaN(a[sortAttr.header])
      ? a[sortAttr.header]
      : +a[sortAttr.header];
    const bValue = isNaN(b[sortAttr.header])
      ? b[sortAttr.header]
      : +b[sortAttr.header];

    if (sortAttr.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

const usePlayerSort = () => {
  const [sortOrder, setSortOrder] = useState({});

  const updateSort = (header) => {
    setSortOrder((prevHeader) => {
      let direction;
      if (prevHeader.header === header) {
        direction = prevHeader.direction === 'asc' ? 'desc' : 'asc';
      } else {
        direction = prevHeader.direction === 'asc' ? 'asc' : 'desc';
      }

      return { header, direction };
    });
  };

  return { sortOrder, updateSort, sortColumns };
};

export default usePlayerSort;
