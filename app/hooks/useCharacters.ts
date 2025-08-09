'use client'
import { useState, useEffect, useCallback } from 'react';
import { filterCharacters, uniqueById } from '../lib/filterCharacters';
import { Character } from '../types/character';
import { Filters } from '../types/filters';

type UseCharactersParams = {
  page: number;
  pageSize?: number;
  query?: string;
  filters: Filters;
};

export function useCharacters({
  page,
  pageSize = 20,
  query = '',
  filters,
}: UseCharactersParams) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await filterCharacters({ page, pageSize, query, filters });
      setCharacters(prev => {
        if (page === 1) return data.characters;
        const combined = [...prev, ...data.characters];

        return uniqueById(combined);
      });
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, query, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const hasMore = characters.length < total;

  return { characters, total, loading, error, hasMore };
}
