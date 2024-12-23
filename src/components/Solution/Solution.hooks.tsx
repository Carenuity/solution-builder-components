import { useEffect, useState } from 'react';

export const useScreenSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // handle screen resize
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    // add window resize event listener
    window.addEventListener('resize', handleResize);

    // revoke listener on component destroy
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
