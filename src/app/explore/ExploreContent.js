'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const AsideItem = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const ImageCard = ({ src, alt, title }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-duration-300">
    <img src={src} alt={alt} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  </div>
);

export default function ExploreContent() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6 shadow-md">
        <AsideItem title="Categories">
          <ul className="space-y-2">
            <li><button className="text-blue-600 hover:underline">Beaches</button></li>
            <li><button className="text-blue-600 hover:underline">Restaurants</button></li>
            <li><button className="text-blue-600 hover:underline">Activities</button></li>
            <li><button className="text-blue-600 hover:underline">Accommodations</button></li>
          </ul>
        </AsideItem>
        <AsideItem title="Filters">
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Family-friendly
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Outdoor
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Historic
            </label>
          </div>
        </AsideItem>
      </aside>
      <main className="flex-1 p-6">
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search Cape Cod attractions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
              <Search className="h-5 w-5" />
            </button>
            <button type="button" className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
              <Filter className="h-5 w-5" />
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ImageCard src="/images/beach.jpg" alt="Cape Cod Beach" title="Craigville Beach" />
          <ImageCard src="/images/restaurant.jpg" alt="Cape Cod Restaurant" title="The Lobster Pot" />
          <ImageCard src="/images/whale-watching.jpg" alt="Cape Cod Activity" title="Whale Watching Tour" />
          <ImageCard src="/images/hotel.jpg" alt="Cape Cod Accommodation" title="Sea Crest Beach Hotel" />
          <ImageCard src="/images/lighthouse.jpg" alt="Cape Cod Lighthouse" title="Highland Light" />
          <ImageCard src="/images/museum.jpg" alt="Cape Cod Museum" title="Provincetown Museum" />
        </div>
      </main>
    </div>
  );
}