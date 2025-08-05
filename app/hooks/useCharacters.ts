// hooks/useCharacters.ts
'use client';

import { useEffect, useState } from 'react';
import { Character } from '../types/character';
import { fetchCharacters as fetchCharactersApi } from '../lib/api';

type UseCharactersOptions = {
  page?: number;
  pageSize?: number;
};

export function useCharacters({ pageSize = 20 }: UseCharactersOptions = {}) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadMore = async () => {
    setLoading(true);
    try {
      const json = await fetchCharactersApi({ page, pageSize });
      setCharacters(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        const uniqueNewCharacters = json.characters.filter(
          c => !existingIds.has(c.id)
        );
        return [...prev, ...uniqueNewCharacters];
      });
      setTotal(json.total);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  const hasMore = characters.length < total;

  return { characters, total, loading, error, loadMore, hasMore };
}
