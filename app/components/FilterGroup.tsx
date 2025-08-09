//app/components/filtergroup.tsx
'use client'

interface Option {
  id: string;
  label: string;
}

type Props = {
  title: string;
  options: Option[];
  selectedForGroup: string[];
  toggle: (id: string) => void;
};

export function FilterGroup({ title, options, selectedForGroup, toggle }: Props) {
  const unselectedOptions = options.filter(
    opt => !selectedForGroup.includes(opt.id)
  );

  if (unselectedOptions.length === 0) return null;

  return (
    <section className='space-y-2 border border-[var(--color-accent)]/60 dark:border-[var(--color-accent)]/40 bg-white dark:bg-[#1f1f1f] rounded-lg p-2'>
      <h3 className='font-semibold text-sm text-[var(--color-text)]/80 uppercase'>
        {title}
      </h3>
      <ul className='flex flex-wrap gap-2'>
        {unselectedOptions.map(({ id, label }) => (
          <li
            key={id}
            onClick={() => toggle(id)}
            className='cursor-pointer select-none px-3 py-1.5 rounded-md text-sm text-[var(--color-text)]/40  border border-white dark:border-none hover:bg-[var(--color-accent)]/30 transition-colors bg-[var(--color-accent)]/12 dark:bg-white/6 dark:hover:bg-white/12'
          >
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
