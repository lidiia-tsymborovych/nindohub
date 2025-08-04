// app/layout.tsx

import type { Metadata } from "next";
import { Montserrat, Nunito } from 'next/font/google';
import './globals.css'; 

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NindoHub — Explore the World of Naruto',
  description:
    'A Naruto character explorer built with Next.js 15, Tailwind CSS, and pure vibes ⚡',
  keywords: ['Naruto', 'NindoHub', 'Shinobi', 'Anime', 'Character Explorer'],
  authors: [{ name: 'Lida' }],
  openGraph: {
    title: 'NindoHub',
    description: 'Explore Naruto characters and lore',
    url: 'https://your-domain.com',
    siteName: 'NindoHub',
    images: [
      {
        url: '/og-image.png',
        width: 800,
        height: 600,
        alt: 'NindoHub Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NindoHub',
    description: 'Explore Naruto characters and lore',
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://your-domain.com'),
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${montserrat.variable} ${nunito.variable}`}>
      <body className='antialiased'>{children}</body>
    </html>
  );
}

