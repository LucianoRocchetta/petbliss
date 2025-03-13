"use client"

import '@/styles/globals.css';
import { SideBarMenu } from '@/components/shared';
import { Roboto } from 'next/font/google'
import { SessionProvider } from 'next-auth/react';
import { Footer } from '@/containers/footer';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
    <html lang="en">
      <body className={`${roboto.className} lg:flex h-screen text-zinc-200 bg-zinc-800`}>
        <SideBarMenu />
        <div className='flex flex-col w-full'>
        <main className="p-10 lg:flex-1 lg:px-32 lg:overflow-auto h-full">
          {children}
        </main>
        <Footer />
        </div>
      </body>
    </html>
    </SessionProvider>
  );
}
