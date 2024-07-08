import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
        <header className="shadow">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <img src="./assets/logo.png" alt="Logo" className="h-10 w-10" />
              <span className="ml-3 text-xl font-bold ">Świat kultury</span>
            </div>
            <nav className="nav">
              <ul className="nav-items flex space-x-4">
                <li>
                  <Link href="/" className="item">
                    Strona główna
                  </Link>
                </li>
                <li>
                  <Link href="/movie" className="item">
                    Filmy
                  </Link>
                </li>
                <li>
                  <Link href="/book" className="item">
                    Książki
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex space-x-4">
              <button className="btn signin">
                <Link href="/signin" className="px-4 py-2">
                  Zaloguj się
                </Link>
              </button>
              <button className="btn signup">
                <Link href="/signup" className="px-4 py-2">
                  Załóż konto
                </Link>
              </button>
            </div>
          </div>
        </header>
        {children}

        <footer className="rounded-lg shadow  dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span >
              © 2024 All Rights Reserved.
            </span>
            <nav className="nav">
              <ul className="nav-items flex space-x-4">
                <li>
                  <Link href="/" className="item">
                    Strona główna
                  </Link>
                </li>
                <li>
                  <Link href="movie" className="item">
                    Filmy
                  </Link>
                </li>
                <li>
                  <Link href="book" className="item">
                    Książki
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
