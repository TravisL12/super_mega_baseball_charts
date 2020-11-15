import { useCallback, useState } from 'react';

const ASC = 'asc';
const DESC = 'desc';

const usePlayerSort = (players, setPlayers) => {
  const [sortOrder, setSortOrder] = useState({
    header: 'team',
    direction: ASC,
  });

  const sortPlayers = (header, direction) => {
    return players.sort((a, b) => {
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
  };

  const updateSort = useCallback(
    (header) => {
      const prevHeader = { ...sortOrder };
      let direction;
      if (prevHeader.header === header) {
        direction = prevHeader.direction === ASC ? DESC : ASC;
      } else {
        direction = prevHeader.direction === ASC ? ASC : DESC;
      }

      const sorted = sortPlayers(header, direction);
      setPlayers(sorted);
      setSortOrder({ header, direction });
    },
    [players, setPlayers, sortOrder]
  );

  return { updateSort };
};

export default usePlayerSort;
