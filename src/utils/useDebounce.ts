import { useCallback, useEffect, useRef } from 'react';

type noop = (...args: any[]) => any;

export interface ReturnValue<T extends any[]> {
  run: (...args: T) => void;
  cancel: () => void;
}

export default function useDebounce<T extends any[]>(
  fn: (...args: T) => any,
  wait: number,
): ReturnValue<T> {
  const timer = useRef<any>();

  const fnRef = useRef<noop>(fn);
  fnRef.current = fn;

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const run = useCallback(
    (...args: any) => {
      cancel();
      timer.current = setTimeout(() => {
        fnRef.current(...args);
      }, wait);
    },
    [wait, cancel],
  );

  useEffect(() => cancel, []);

  return {
    run,
    cancel,
  };
}
