import { useEffect, useState } from 'react';
import { ResizeEntry } from './index.types';

export const useResizeObserver = () => {
  const [observer, setObserver] = useState<ResizeObserver>();
  const [observerEntries, setObserverEntries] = useState<ResizeEntry>();

  useEffect(() => {
    const _observer = new ResizeObserver((entries) => {
      const _entries = entries.reduce((pv, cv) => {
        return { ...pv, [cv.target.id]: cv };
      }, {} as ResizeEntry);

      // update observerEntries state
      setObserverEntries(() => _entries);
    });
    setObserver(_observer);

    // revoke listener on component destroy
    return () => {
      _observer.disconnect();

      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return { observer, observerEntries };
};
