// lib/api.ts
import { Character, CharactersApiResponse } from '../types/character';

const BASE_URL = 'https://dattebayo-api.onrender.com';

export async function fetchCharacters({
  page = 1,
  pageSize = 20,
}: {
  page?: number;
  pageSize?: number;
} = {}): Promise<CharactersApiResponse> {
  const res = await fetch(
    `${BASE_URL}/characters?page=${page}&pageSize=${pageSize}`
  );
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