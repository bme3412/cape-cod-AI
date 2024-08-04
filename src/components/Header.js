// src/components/Header.js
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Cape Cod Travel Guide</Link>
        <ul className="flex space-x-4">
          <li><Link href="/explore">Explore</Link></li>
          <li><Link href="/build-itinerary">Build Itinerary</Link></li>
          <li><Link href="/suggested-activities">Suggested Activities</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;