import { useState } from 'react';

const ASC = 'asc';
const DESC = 'desc';

const usePlayerSort = (players, setPlayers) => {
  const [sortOrder, setSortOrder] = useState({
    header: 'team',
    direction: ASC,
  });

  const updateSort = (header) => {
    const prevHeader = { ...sortOrder };
    let direction;
    if (prevHeader.header === header) {
      direction = prevHeader.direction === ASC ? DESC : ASC;
    } else {
      direction = prevHeader.direction === ASC ? ASC : DESC;
    }

    const sorted = players.sort((a, b) => {
      const aValue = isNaN(a[header])
        ? a[header]
          ? a[header].toLowerCase()
          : ''
        : +a[header];
      const bValue = isNaN(b[header])
        ? b[header]
          ? b[header].toLowerCase()
          : ''
        : +b[header];

      if (direction === ASC) {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    setPlayers(sorted);
    setSortOrder({ header, direction });
  };

  return { updateSort };
};

export default usePlayerSort;
