// hooks/useCharacters.ts
'use client';

import { useEffect, useState } from 'react';
import { Character } from '../types/character';
import { fetchCharacters as fetchCharactersApi } from '../lib/api';

type UseCharactersOptions = {
  page?: number;
  pageSize?: number;
};

export function useCharacters({
  page = 1,
  pageSize = 20,
}: UseCharactersOptions = {}) {
  const [data, setData] = useState<Character[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const json = await fetchCharactersApi({ page, pageSize });
        setData(json.characters);
        setTotal(json.total);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [page, pageSize]);

  return { data, total, loading, error };
}
