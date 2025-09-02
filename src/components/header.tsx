"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center py-6">
      <h1 className="text-xl font-bold">My Portfolio</h1>
      <nav className="hidden md:flex space-x-8">
        <a className="text-gray-600 hover:text-gray-900" href="#projects">Projects</a>
        <a className="text-gray-600 hover:text-gray-900" href="#skills">Skills</a>
        <a className="text-gray-600 hover:text-gray-900" href="#about">About Me</a>
        <a className="text-gray-600 hover:text-gray-900" href="#contact">Contact</a>
      </nav>
    </header>
  );
}
