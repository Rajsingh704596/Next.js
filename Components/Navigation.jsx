import Link from "next/link"; // here Link component part of next js here we don't need to use to like react

const Navigation = () => {
  return (
    <header className="grid grid-cols-2 ">
      <div>Logo</div>
      <nav>
        <ul className="flex gap-6 ">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/about/section">Section</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
