import React, { useEffect, useState } from 'react';
import { Img } from './styles';

const PlayerImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoaded(true);
    };
  }, [src]);

  return isLoaded ? (
    <Img src={src} alt={alt || 'none'} />
  ) : (
    <Img
      src={`${process.env.PUBLIC_URL}/placeholder.png`}
      alt={alt || 'none'}
    />
  );
};

export default PlayerImage;
