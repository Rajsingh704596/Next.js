import Link from "next/link"; // here Link component part of next js here we don't need to use to like react

const Navigation = () => {
  return (
    <section className="container mx-auto">
      <header className="grid grid-cols-2 fixed top-0 z-50 px-6 py-4 h-fit bg-white/60 rounded-md ">
        <div>Logo</div>
        <nav>
          <ul className="flex gap-6 ">
            <li>
              <Link
                href="/"
                className="relative transition duration-300 hover:text-yellow-500 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-yellow-500 hover:before:w-full before:transition-all before:duration-500 hover:scale-105 transform inline-block
 "
              >
                Home
              </Link>
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
            <li>
              <Link href="/client-comp">Client-Component</Link>
              {/*Note- jo folder name hoga whi href m aayga as a path */}
            </li>
            <li>
              <Link href="/server-comp">Server-Component</Link>
            </li>
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default Navigation;
