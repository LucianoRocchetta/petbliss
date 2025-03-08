// src/app/layout.tsx

import '@/styles/globals.css';
import { SideBarMenu } from '@/components/shared';
import { Roboto } from 'next/font/google'

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
    <html lang="en">
      <body className={`${roboto.className} flex h-screen`}>
        <SideBarMenu />
        <main className="flex-1 px-32 py-10 overflow-auto h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
