// app/characters/[id]/components/CharacterImage.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Props {
  src?: string;
  alt: string;
}

export const CharacterImage = ({ src, alt }: Props) => {
  const [imgSrc, setImgSrc] = useState(src ?? '/fallback.png');
  const imageWidth = 600;
  const imageHeight = 600;

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      style={{ aspectRatio: `${imageWidth} / ${imageHeight}` }}
      className='rounded-lg object-cover object-top'
      priority
      onError={() => setImgSrc('/fallback.png')}
    />
  );
};
