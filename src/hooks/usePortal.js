import { useState } from 'react';

export const usePortal = () => {
  const [coords, setCoords] = useState({});

  const setPortalCoordinates = (e) => {
    const rect = e.target.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width / 2,
      top: rect.y + window.scrollY,
    });
  };

  return [coords, setPortalCoordinates];
};
