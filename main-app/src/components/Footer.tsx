import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-green-200/10 text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Countries List. All rights reserved.
        </p>
        <div className="mt-4">
          <Link
            target="_blank"
            className="text-sm text-gray-400 hover:text-white mx-4 transition-colors duration-300 ease-in-out"
            href="https://www.facebook.com"
          >
            Facebook
          </Link>
          <Link
            target="_blank"
            className="text-sm text-gray-400 hover:text-white mx-4 transition-colors duration-300 ease-in-out"
            href="https://www.twitter.com"
          >
            Twitter
          </Link>
          <Link
            target="_blank"
            className="text-sm text-gray-400 hover:text-white mx-4 transition-colors duration-300 ease-in-out"
            href="https://www.instagram.com"
          >
            Instagram
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
