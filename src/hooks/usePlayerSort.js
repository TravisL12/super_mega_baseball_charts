import { useState } from 'react';

const ASC = 'asc';
const DESC = 'desc';

const sortColumns = (players, sortAttr) => {
  if (!sortAttr.header) {
    return players;
  }
  return players.sort((a, b) => {
    const aValue = isNaN(a[sortAttr.header])
      ? a[sortAttr.header]
        ? a[sortAttr.header].toLowerCase()
        : ''
      : +a[sortAttr.header];
    const bValue = isNaN(b[sortAttr.header])
      ? b[sortAttr.header]
        ? b[sortAttr.header].toLowerCase()
        : ''
      : +b[sortAttr.header];

    if (sortAttr.direction === ASC) {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

const usePlayerSort = () => {
  const [sortOrder, setSortOrder] = useState({
    header: 'team',
    direction: ASC,
  });

  const updateSort = (header) => {
    setSortOrder((prevHeader) => {
      let direction;
      if (prevHeader.header === header) {
        direction = prevHeader.direction === ASC ? DESC : ASC;
      } else {
        direction = prevHeader.direction === ASC ? ASC : DESC;
      }

      return { header, direction };
    });
  };

  return { sortOrder, updateSort, sortColumns };
};

export default usePlayerSort;
