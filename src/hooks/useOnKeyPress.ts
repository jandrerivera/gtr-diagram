import React, { useEffect } from 'react';

type Handler = (e: KeyboardEvent) => void;

const useOnKeyPress = (keyCode: string, handler: Handler) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key !== keyCode) return;
      handler(e);
    };

    document.addEventListener('keydown', listener, false);
    return () => {
      document.removeEventListener('keydown', listener, false);
    };
  }, [keyCode, handler]);
};

export default useOnKeyPress;
