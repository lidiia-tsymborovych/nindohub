import { Character } from '../types/character';
import { Filters } from '../types/filters';

const BASE_URL = 'https://dattebayo-api.onrender.com';

interface FilterCharactersParams {
  page: number;
  pageSize: number;
  query?: string;
  filters: Filters;
}

interface FilterCharactersResult {
  characters: Character[];
  total: number;
}

export function uniqueById(chars: Character[]): Character[] {
  const map = new Map<string, Character>();
  chars.forEach(c => map.set(String(c.id), c));
  return Array.from(map.values());
}


async function fetchAllCategoryCharacters(categoryName: string): Promise<string[]> {
  const allIds: string[] = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${BASE_URL}/${categoryName}?page=${page}`);
    if (!res.ok) throw new Error(`Failed to fetch category ${categoryName} page ${page}`);
    const json = await res.json();
    if (!json[categoryName] || json[categoryName].length === 0) break;
    allIds.push(...json[categoryName].map((char: { id: string }) => String(char.id)));
    if (json[categoryName].length < 20) break;
    page++;
  }
  return allIds;
}

async function fetchIdsFor(type: keyof Filters, ids: string[]): Promise<string[]> {
  const allIds: string[] = [];
  const apiType = type === 'kekkeiGenkai' ? 'kekkei-genkai' : type;

  if (apiType === 'categories') {
    const allIdsArrays = await Promise.all(ids.map(fetchAllCategoryCharacters));
    return allIdsArrays.flat();
  }

  for (const id of ids) {
    const cleanedId = id.includes('-') ? id.split('-')[1] : id;
    const res = await fetch(`${BASE_URL}/${apiType}/${cleanedId}`);
    if (!res.ok) throw new Error(`Failed to fetch ${apiType} ${cleanedId}`);
    const json = await res.json();

    if (Array.isArray(json)) {
      allIds.push(...json.map((char: { id: string }) => String(char.id)));
    } else if (json.characters && Array.isArray(json.characters)) {
      allIds.push(...json.characters.map(String));
    }
  }

  return allIds;
}

export async function filterCharacters({
  page,
  pageSize,
  query,
  filters,
}: FilterCharactersParams): Promise<FilterCharactersResult> {
  const groupIdsArray: string[][] = [];

  async function getGroupIds(filterKey: keyof Filters): Promise<string[]> {
    if (filters[filterKey].length === 0) return [];

    const unionSet = new Set<string>();

    for (const filterId of filters[filterKey]) {
      const ids = await fetchIdsFor(filterKey, [filterId]);
      ids.forEach(id => unionSet.add(id));
    }

    return Array.from(unionSet);
  }

  const clansIds = await getGroupIds('clans');
  if (clansIds.length) groupIdsArray.push(clansIds);

  const villagesIds = await getGroupIds('villages');
  if (villagesIds.length) groupIdsArray.push(villagesIds);

  const kekkeiIds = await getGroupIds('kekkeiGenkai');
  if (kekkeiIds.length) groupIdsArray.push(kekkeiIds);

  const categoriesIds = await getGroupIds('categories');
  if (categoriesIds.length) groupIdsArray.push(categoriesIds);

  if (groupIdsArray.length === 0) {
    const url = new URL(`${BASE_URL}/characters`);
    url.searchParams.set('page', String(page));
    url.searchParams.set('pageSize', String(pageSize));
    if (query) url.searchParams.set('name', query);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch characters');

    const data = await res.json();

    if (Array.isArray(data)) {
      return { characters: data, total: data.length };
    } else {
      return data;
    }
  }

  const allIdsSet = new Set<string>();
  groupIdsArray.forEach(groupIds => {
    groupIds.forEach(id => allIdsSet.add(id));
  });
  const finalIds = Array.from(allIdsSet);

  if (query) {
    if (finalIds.length === 0) {
      return { characters: [], total: 0 };
    }

    const resAll = await fetch(`${BASE_URL}/characters/${finalIds.join(',')}`);
    if (!resAll.ok) throw new Error('Failed to fetch characters by IDs');

    const allChars = await resAll.json();

    let charactersArray: Character[] = [];
    if (Array.isArray(allChars)) {
      charactersArray = allChars;
    } else if (allChars.characters && Array.isArray(allChars.characters)) {
      charactersArray = allChars.characters;
    } else {
      throw new Error('Invalid response format from characters by IDs');
    }

    charactersArray = uniqueById(charactersArray);

    const filteredChars = charactersArray.filter(char =>
      char.name.toLowerCase().includes(query.toLowerCase())
    );

    const paginatedChars = filteredChars.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return { characters: paginatedChars, total: filteredChars.length };
  }

  const paginatedIds = finalIds.slice((page - 1) * pageSize, page * pageSize);

  if (paginatedIds.length === 0)
    return { characters: [], total: finalIds.length };

  const res = await fetch(`${BASE_URL}/characters/${paginatedIds.join(',')}`);
  if (!res.ok) throw new Error('Failed to fetch characters by IDs');

  const charsData = await res.json();

  let charactersArray: Character[] = [];
  if (Array.isArray(charsData)) {
    charactersArray = charsData;
  } else if (charsData.characters && Array.isArray(charsData.characters)) {
    charactersArray = charsData.characters;
  } else {
    throw new Error('Invalid response format from characters by IDs');
  }

  charactersArray = uniqueById(charactersArray);

  return { characters: charactersArray, total: finalIds.length };
}
