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
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
        <body className={`${inter.className} text-black bg-white`}>
          <TopbarMenu />
          <main className="w-screen overflow-x-hidden">{children}</main>
          <Toaster position="top-right" richColors />
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
