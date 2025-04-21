"use client";

import "@/styles/globals.css";
import { TopbarMenu } from "@/components/shared";
import { Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Footer } from "@/containers/footer";
import { Metadata } from "next";

const roboto = Roboto({
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
        <body className={`${roboto.className} text-zinc-200 bg-zinc-800`}>
          <TopbarMenu />
          <main className="w-3/4 m-auto my-20">{children}</main>

          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
