'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from 'react';

interface SliderProps {
  slides: { id: number; url: string }[];
}

export default function CoolLinksSlider({ slides }: SliderProps) {
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const handlePrev = () => prevBtnRef.current?.click();
  const handleNext = () => nextBtnRef.current?.click();

  return (
    <div className='relative max-w-6xl mx-auto px-8'>
      <button
        ref={prevBtnRef}
        className='swiper-button-prev opacity-0 absolute top-1/2 left-0 -translate-y-1/2 z-10'
        aria-label='Previous slide'
      />
      <button
        ref={nextBtnRef}
        className='swiper-button-next opacity-0 absolute top-1/2 right-0 -translate-y-1/2 z-10'
        aria-label='Next slide'
      />

      <div
        onClick={handlePrev}
        className='
      absolute top-1/2 -left-4 w-10 h-10
      md:bg-[var(--color-secondary)]/20
      rounded-full
      flex items-center justify-center
      cursor-pointer select-none
      -translate-y-1/2
      z-20
      transition
      duration-300
       md:hover:bg-[var(--color-accent)]/40
      md:active:bg-[var(--color-accent)]
      md:shadow-md
      backdrop-blur-sm
    '
        role='button'
        tabIndex={0}
        aria-label='Previous slide'
      >
        <ChevronLeft
          size={24}
          className='text-black/60 md:text-white dark:text-white'
        />
      </div>

      <div
        onClick={handleNext}
        className='
      absolute top-1/2 -right-4 w-10 h-10
      md:bg-[var(--color-secondary)]/20
      rounded-full
      flex items-center justify-center
      cursor-pointer select-none
      -translate-y-1/2
      z-20
      transition
      duration-300
      md:hover:bg-[var(--color-accent)]/40
      md:active:bg-[var(--color-accent)]
      md:shadow-md
      backdrop-blur-sm
    '
        role='button'
        tabIndex={0}
        aria-label='Next slide'
      >
        <ChevronRight
          size={24}
          className='text-black/60 md:text-white dark:text-white'
        />
      </div>

      {/* Твій Swiper тут... */}
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        slidesPerView={3}
        spaceBetween={24}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={800}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 12 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className='py-12'
      >
        {slides.map(({ id, url }) => (
          <SwiperSlide key={id} className='cursor-pointer rounded-xl shadow-md'>
            <Link href={`/characters/${id}`}>
              <div className='overflow-hidden rounded-xl'>
                <Image
                  src={url}
                  alt={`Character ${id}`}
                  width={400}
                  height={300}
                  draggable={false}
                  className='
                w-full h-[300px] object-cover object-top rounded-xl
                transition-transform duration-500 ease-in-out
                hover:scale-110
                sm:h-[200px]
                md:h-[250px]
                lg:h-[280px]
                xl:h-[300px]
              '
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
