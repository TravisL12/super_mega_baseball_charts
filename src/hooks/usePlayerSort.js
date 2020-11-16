import { orderBy } from 'lodash';
import { useCallback, useRef } from 'react';

const ASC = 'asc';
const DESC = 'desc';

const usePlayerSort = (players, setPlayers) => {
  const sortOrder = useRef({
    header: 'team',
    direction: ASC,
  });

  const updateSort = useCallback(
    (header) => {
      let direction;
      if (sortOrder.current.header === header) {
        direction = sortOrder.current.direction === ASC ? DESC : ASC;
      } else {
        direction = sortOrder.current.direction === ASC ? ASC : DESC;
      }

      const sorted = orderBy(players, [header], [direction]);
      sortOrder.current = { header, direction };
      setPlayers(sorted);
    },
    [players, setPlayers, sortOrder]
  );

  return { updateSort };
};

export default usePlayerSort;
