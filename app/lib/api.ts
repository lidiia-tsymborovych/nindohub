// lib/api.ts
import { Character, CharactersApiResponse } from '../types/character';

const BASE_URL = 'https://dattebayo-api.onrender.com';

export async function fetchCharacters({
  page = 1,
  pageSize = 20,
  query = '',
}: {
  page?: number;
  pageSize?: number;
  query?: string;
}): Promise<CharactersApiResponse> {
  const url = new URL(`${BASE_URL}/characters`);
  url.searchParams.set('page', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  if (query) url.searchParams.set('name', query);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch characters: ${res.status}`);
  return res.json();
}


export async function fetchCharacterById(
  id: number
): Promise<Character | null> {
  try {
    const res = await fetch(`${BASE_URL}/characters/${id}`);

    if (!res.ok) {
      return null;
    }

    const character: Character = await res.json();
    return character;
  } catch (error) {
    console.error('fetchCharacterById error:', error);
    return null;
  }
}


