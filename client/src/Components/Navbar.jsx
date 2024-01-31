import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="bg-yellow-500 text-white">
        <ul className="flex space-x-6 justify-center p-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/animals">Animals</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/signup">
            <button className="bg-blue-950 px-4 py-2 text-sm rounded-lg">
              Get Started
            </button>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
