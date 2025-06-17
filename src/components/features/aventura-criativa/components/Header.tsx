
import React from 'react';
import { BookOpenIcon } from './Icons'; // Assuming Icons.tsx is created

const Header: React.FC = () => {
  return (
    <header className="text-center my-8 p-6 bg-white/70 backdrop-blur-md shadow-lg rounded-xl w-full max-w-2xl">
      <div className="flex items-center justify-center text-yellow-500 mb-2">
        <BookOpenIcon className="w-12 h-12 md:w-16 md:h-16" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
          Aventura Criativa
        </span>
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        Leia, escreva e solte a imaginação!
      </p>
    </header>
  );
};

export default Header;
