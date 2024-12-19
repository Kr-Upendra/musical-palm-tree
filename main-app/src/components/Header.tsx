import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-green-200/10 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="font-extrabold text-white">
          <Link href="/">Countries List</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link className="text-gray-400 text-sm hover:text-white" href="/">
                Know More
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
