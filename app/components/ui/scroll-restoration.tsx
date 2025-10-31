'use client';

import { useEffect } from 'react';

export default function ScrollRestorationManager() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      const previous = history.scrollRestoration;
      history.scrollRestoration = 'manual';
      return () => {
        history.scrollRestoration = previous;
      };
    }
    return undefined;
  }, []);

  return null;
}
