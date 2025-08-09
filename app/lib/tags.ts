// lib/tags.ts

import { TagOption } from "../types/filters";

export const CLANS: TagOption[] = [
  { id: 'clan-12', label: 'Hyūga', group: 'clans' },
  { id: 'clan-8', label: 'Hatake', group: 'clans' },
  { id: 'clan-21', label: 'Yamanaka', group: 'clans' },
  { id: 'clan-1', label: 'Akimichi', group: 'clans' },
  { id: 'clan-0', label: 'Aburame', group: 'clans' },
];

export const VILLAGES: TagOption[] = [
  { id: 'village-16', label: 'Konohagakure', group: 'villages' },
  { id: 'village-14', label: 'Kirigakure', group: 'villages' },
  { id: 'village-17', label: 'Kumogakure', group: 'villages' },
  { id: 'village-11', label: 'Iwagakure', group: 'villages' },
  { id: 'village-0', label: 'Amegakure', group: 'villages' },
];

export const KEKKEI: TagOption[] = [
  { id: 'kekkei-1', label: 'Byakugan', group: 'kekkeiGenkai' },
  { id: 'kekkei-19', label: 'Mangekyō Sharingan', group: 'kekkeiGenkai' },
  { id: 'kekkei-14', label: 'Lava Release', group: 'kekkeiGenkai' },
];

export const CATEGORIES: TagOption[] = [
  { id: 'akatsuki', label: 'Akatsuki', group: 'categories' },
  { id: 'tailed-beasts', label: 'Tailed Beasts', group: 'categories' },
];

export const ALL_TAGS: TagOption[] = [
  ...CLANS,
  ...VILLAGES,
  ...KEKKEI,
  ...CATEGORIES,
];

export const TAG_LABEL_BY_ID = Object.fromEntries(
  ALL_TAGS.map(t => [t.id, t.label])
) as Record<string, string>;

export const TAG_GROUP_BY_ID = Object.fromEntries(
  ALL_TAGS.map(t => [t.id, t.group])
) as Record<string, string>;
