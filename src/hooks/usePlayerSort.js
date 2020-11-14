import { useMemo, useState } from 'react';

const ASC = 'asc';
const DESC = 'desc';

const usePlayerSort = (players) => {
  const [sortOrder, setSortOrder] = useState({
    header: 'team',
    direction: ASC,
  });

  const sortColumns = useMemo(() => {
    return players.sort((a, b) => {
      const aValue = isNaN(a[sortOrder.header])
        ? a[sortOrder.header]
          ? a[sortOrder.header].toLowerCase()
          : ''
        : +a[sortOrder.header];
      const bValue = isNaN(b[sortOrder.header])
        ? b[sortOrder.header]
          ? b[sortOrder.header].toLowerCase()
          : ''
        : +b[sortOrder.header];

      if (sortOrder.direction === ASC) {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [players, sortOrder]);

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

  return { updateSort, sortColumns };
};

export default usePlayerSort;
