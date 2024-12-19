import Link from "next/link";

interface Props {
  flag: string;
  name: string;
}

const Card = ({ flag, name }: Props) => {
  return (
    <Link href="/">
      <div className="border border-gray-900 rounded-lg p-4 flex items-center shadow-xl shadow-gray-400/5 hover:scale-105 hover:bg-green-200/10 transition-all duration-300 ease-in-out">
        <div className="w-16 h-16 text-3xl flex justify-center items-center bg-blue-300/10 rounded-full">
          {flag}
        </div>
        <h1 className="ml-4 text-lg font-semibold text-white">{name}</h1>
      </div>
    </Link>
  );
};

export default Card;
