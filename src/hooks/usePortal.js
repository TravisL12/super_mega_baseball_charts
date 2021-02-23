import { useState } from 'react';

export const usePortal = (offset = { top: 0, left: 0 }) => {
  const [coords, setCoords] = useState({});

  const setPortalCoordinates = (e) => {
    const rect = e.target.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width + offset.left,
      top: rect.y + window.scrollY + offset.top,
    });
  };

  return [coords, setPortalCoordinates];
};
