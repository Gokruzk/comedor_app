import React from 'react';
import Link from 'next/link';

const BackButton: React.FC = () => {
  return (
    <Link href="/">
      <a className="bg-green-600 hover:bg-green-700 max-w-48 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        Entendido
      </a>
    </Link>
  );
};

export default BackButton;