"use client";

import "@/styles/globals.css";
import { TopbarMenu } from "@/components/shared";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Footer } from "@/containers/footer";
import { Toaster, toast } from "sonner";
import { Metadata } from "next";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

const metadata: Metadata = {
  title: {
    default: "Petbliss",
    absolute: "",
    template: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${inter.className} text-zinc-200 bg-zinc-800`}>
          <TopbarMenu />
          <main>{children}</main>
          <Toaster position="top-right" richColors />
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
