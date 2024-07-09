import Link from "next/link";

export const Nav = () => (
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
);
