import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Header } from "./components/header";
import { Nav } from "./components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Świat kultury",
  description: "Polecane książki i filmy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <Header />
        {children}

        <footer className="rounded-lg shadow  dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span>© 2024 All Rights Reserved.</span>
            <Nav />
          </div>
        </footer>
      </body>
    </html>
  );
}
