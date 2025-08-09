// hooks/useFilterState.ts

'use client';
import { useState, useEffect, useMemo } from 'react';
import { Filters } from '../types/filters';
import {
  emptyFilters,
  filtersToString,
  stringToFilters,
} from '../utils/filtersToString';

const LOCAL_STORAGE_KEY = 'characters_filters';

function isValidFilters(obj: unknown): obj is Filters {
  if (!obj || typeof obj !== 'object') return false;
  return Object.values(obj).every(
    value => Array.isArray(value) && value.every(v => typeof v === 'string')
  );
}

export function useFilterState() {
  const [appliedFilters, setAppliedFilters] = useState<Filters>(emptyFilters);
  const [pendingFilters, setPendingFilters] = useState<Filters>(emptyFilters);

  useEffect(() => {
    const fromUrl = stringToFilters(window.location.search);
    if (
      isValidFilters(fromUrl) &&
      Object.values(fromUrl).some(arr => arr.length > 0)
    ) {
      setAppliedFilters(fromUrl);
      setPendingFilters(fromUrl);
      return;
    }

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (isValidFilters(parsed)) {
          setAppliedFilters(parsed);
          setPendingFilters(parsed);
          return;
        }
      } catch {}
    }
    setAppliedFilters(emptyFilters);
    setPendingFilters(emptyFilters);
  }, []);

  useEffect(() => {
    setPendingFilters(appliedFilters);
  }, [appliedFilters]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appliedFilters));
    const newUrl = `${window.location.pathname}?${filtersToString(
      appliedFilters
    )}`;
    window.history.replaceState(null, '', newUrl);
  }, [appliedFilters]);

  return useMemo(
    () => ({
      appliedFilters,
      setAppliedFilters,
      pendingFilters,
      setPendingFilters,
    }),
    [appliedFilters, pendingFilters]
  );
}
