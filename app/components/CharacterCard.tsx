// components/CharacterCard.tsx
'use client';

import Image from 'next/image';
import { Character } from '../types/character';
import React, { useState } from 'react';
import Link from 'next/link';

type Props = {
  character: Character;
  isPriority?: boolean;
};

function CharacterCardComponent({ character, isPriority }: Props) {
  const [imgSrc, setImgSrc] = useState(
    character.images?.[0] ?? '/fallback.png'
  );
  const imageWidth = 600;
  const imageHeight = 600;

  return (
    <Link
      href={`/characters/${character.id}`}
      className='
        block
        bg-white
        dark:bg-[#1f1f1f] 
        rounded-xl 
        overflow-hidden 
        p-4 
        transition 
        transform 
        hover:scale-105 
        hover:shadow-[0_0_10px_2px_rgba(255,137,4,0.4)] 
        shadow-[0_0_10px_1px_rgba(255,255,255,0.1)] 
        duration-300
      '
      aria-label={`Go to the character page ${character.name}`}
    >
      <Image
        src={imgSrc}
        alt={character.name}
        width={imageWidth}
        height={imageHeight}
        style={{ aspectRatio: `${imageWidth} / ${imageHeight}` }}
        className='rounded-md object-cover object-top'
        priority={isPriority}
        onError={() => setImgSrc('/fallback.png')}
      />
      <h3 className='mt-3 text-lg font-bold text-center'>{character.name}</h3>
    </Link>
  );
}

export const CharacterCard = React.memo(
  CharacterCardComponent,
  (prevProps, nextProps) =>
    prevProps.character.id === nextProps.character.id &&
    prevProps.isPriority === nextProps.isPriority
);