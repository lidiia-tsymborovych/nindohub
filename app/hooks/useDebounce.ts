'use client'
import debounce from 'lodash/debounce';
import { useState, useEffect, useMemo } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const debounced = useMemo(() => {
    return debounce((val: T) => {
      setDebouncedValue(val);
    }, delay);
  }, [delay]);

  useEffect(() => {
    debounced(value);

    return () => {
      debounced.cancel();
    };
  }, [value, debounced]);

  return debouncedValue;
}
