// components/FilterDialogContent.tsx
'use client';

import * as React from 'react';
import { FilterGroup } from './FilterGroup';
import { X } from 'lucide-react';

const clans = [
  { id: 'clan-12', label: 'Hyūga' },
  { id: 'clan-8', label: 'Hatake' },
  { id: 'clan-21', label: 'Yamanaka' },
  { id: 'clan-1', label: 'Akimichi' },
  { id: 'clan-0', label: 'Aburame' },
];

const villages = [
  { id: 'village-16', label: 'Konohagakure' },
  { id: 'village-14', label: 'Kirigakure' },
  { id: 'village-17', label: 'Kumogakure' },
  { id: 'village-11', label: 'Iwagakure' },
  { id: 'village-0', label: 'Amegakure' },
];

const kekkeiGenkai = [
  { id: 'kekkei-1', label: 'Byakugan' },
  { id: 'kekkei-19', label: 'Mangekyō Sharingan' },
  { id: 'kekkei-14', label: 'Lava Release' },
];

const categories = [
  { id: 'akatsuki', label: 'Akatsuki' },
  { id: 'tailed-beasts', label: 'Tailed Beasts' },
];



export function FilterDialogContent() {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const toggleTag = (id: string) => {
    setSelectedTags(prev =>
      prev.includes(id) ? prev.filter(tag => tag !== id) : [...prev, id]
    );
  };

  const removeTag = (id: string) => {
    setSelectedTags(prev => prev.filter(tag => tag !== id));
  };

  return (
    <aside
      className='flex flex-col gap-2 p-4 h-full dark:bg-[#1f1f1f] overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent'
      aria-label='Фільтри персонажів'
    >
      {/* Вибрані теги */}
      <section aria-label='Choosen tags' className='mb-2'>
        <h2 className='text-2xl font-semibold mb-2'>Filters</h2>
        <div className='flex flex-wrap gap-2'>
          {selectedTags.length === 0 ? (
            <p className=''>No selected tags</p>
          ) : (
            selectedTags.map(tag => {
              const label =
                clans.find(c => c.id === tag)?.label ||
                villages.find(v => v.id === tag)?.label ||
                kekkeiGenkai.find(c => c.id === tag)?.label ||
                categories.find(c => c.id === tag)?.label ||
                tag;

              return (
                <button
                  key={tag}
                  onClick={() => removeTag(tag)}
                  className='flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-[var(--color-accent)] text-white dark:text-gray-200 cursor-pointer group'
                  aria-label={`Видалити тег ${label}`}
                >
                  <span>{label}</span>
                  <X
                    className='w-3 h-3 transition-transform duration-200 group-hover:scale-125'
                    aria-hidden='true'
                  />
                </button>
              );
            })
          )}
        </div>
      </section>

      <FilterGroup
        title='Categories'
        options={categories}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
      />

      <FilterGroup
        title='Clans'
        options={clans}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
      />

      <FilterGroup
        title='Villages'
        options={villages}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
      />

      <FilterGroup
        title='Kekkei Genkai'
        options={kekkeiGenkai}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
      />
    </aside>
  );
}
