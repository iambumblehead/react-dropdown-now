import { useEffect, RefObject, SyntheticEvent } from 'react';

interface HookOptions {
  ref: RefObject<HTMLElement>;
  handler: (event: SyntheticEvent) => void;
}
export function useOutsideClick({ ref, handler }: HookOptions): void {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener, false);
    document.addEventListener('touchstart', listener, false);

    return () => {
      document.removeEventListener('mousedown', listener, false);
      document.removeEventListener('touchstart', listener, false);
    };
  }, [ref, handler]);
}
