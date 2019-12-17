import { useCallback, useEffect, useRef } from 'react';

type noop = (...args: any[]) => any;

export interface ReturnValue<T extends any[]> {
  run: (...args: T) => void;
  cancel: () => void;
}

export default function useThrottle<T extends any[]>(
  fn: (...args: T) => any,
  wait: number,
): ReturnValue<T> {
  const timer = useRef<any>();

  const fnRef = useRef<noop>(fn);
  fnRef.current = fn;

  const currentArgs = useRef<any>([]);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = undefined;
  }, []);

  const run = useCallback(
    (...args: any) => {
      currentArgs.current = args;
      if (!timer.current) {
        timer.current = setTimeout(() => {
          fnRef.current(...currentArgs.current);
          timer.current = undefined;
        }, wait);
      }
    },
    [wait, cancel],
  );

  useEffect(() => cancel, []);

  return {
    run,
    cancel,
  };
}
