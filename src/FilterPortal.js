import { memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const mount = document.getElementById('portal-root');

const Portal = ({ children }) => {
  const el = useRef(null);
  if (!el.current) el.current = document.createElement('div');
  el.current.classList = 'dropdown-portal';

  useEffect(() => {
    const { current } = el;
    mount.appendChild(current);
    return () => mount.removeChild(current);
  }, []);

  return createPortal(children, el.current);
};

export default memo(Portal);
