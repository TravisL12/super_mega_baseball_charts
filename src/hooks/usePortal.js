import { useState } from 'react';

export const usePortal = (offset) => {
  const [coords, setCoords] = useState({});

  const setPortalCoordinates = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      left: rect.x + (offset?.left || 0),
      top: rect.y + window.scrollY + (offset?.top || 0),
    });
  };

  return [coords, setPortalCoordinates];
};
