'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Image from 'next/image';

const AsideItem = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const ImageCard = ({ src, alt, title, category }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
    <Image src={src} alt={alt} width={400} height={300} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{category}</p>
    </div>
  </div>
);

const CategoryButton = ({ children, isActive, onClick }) => (
  <button
    className={`w-full text-left py-2 px-4 rounded ${
      isActive ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const FilterCheckbox = ({ label, checked, onChange }) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id={label}
      checked={checked}
      onChange={onChange}
      className="rounded text-blue-600 focus:ring-blue-500"
    />
    <label
      htmlFor={label}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {label}
    </label>
  </div>
);

export default function ExploreContent() {
  const [data, setData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [filters, setFilters] = useState({
    familyFriendly: false,
    outdoor: false,
    historic: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [towns, setTowns] = useState([]);
  const [selectedTown, setSelectedTown] = useState('');

  const categories = ['beaches', 'attractions', 'food-and-drink'];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const results = await Promise.all(
          ['towns', ...categories].map(category => 
            fetch(`/api/${category}`).then(res => res.json())
          )
        );
        const newData = Object.fromEntries(
          ['towns', ...categories].map((category, index) => [category, results[index]])
        );
        console.log('Fetched data:', newData);
        setData(newData);
        setTowns(newData.towns || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
  };

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category);
    setActiveCategory(category === activeCategory ? '' : category);
    setSelectedTown(''); // Reset selected town when changing category
  };

  const handleFilterChange = (filter) => {
    console.log('Filter changed:', filter);
    setFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const handleTownClick = (town) => {
    console.log('Town clicked:', town);
    setSelectedTown(town === selectedTown ? '' : town);
  };

  const clearFilters = () => {
    console.log('Filters cleared');
    setFilters({
      familyFriendly: false,
      outdoor: false,
      historic: false,
    });
    setActiveCategory('');
    setSearchTerm('');
    setSelectedTown('');
  };

  const filteredContent = useMemo(() => {
    console.log('Filtering content...');
    console.log('Active category:', activeCategory);
    console.log('Selected town:', selectedTown);

    if (!activeCategory) return [];

    let content = data[activeCategory] || [];

    // Handle the case where beaches data is nested
    if (activeCategory === 'beaches' && data.beaches?.beaches) {
      content = data.beaches.beaches;
    }

    if (selectedTown) {
      content = content.filter(item => item.town.toLowerCase() === selectedTown.toLowerCase());
    }

    // Apply other filters
    const activeFilters = Object.entries(filters)
      .filter(([, value]) => value)
      .map(([key]) => key.toLowerCase().replace('friendly', ''));
    
    if (activeFilters.length > 0) {
      content = content.filter(item => 
        activeFilters.every(filter => item.tags?.includes(filter))
      );
    }

    if (searchTerm) {
      content = content.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    console.log('Filtered content:', content);
    return content;
  }, [data, activeCategory, selectedTown, filters, searchTerm]);

  useEffect(() => {
    console.log('Component state updated:');
    console.log('Active Category:', activeCategory);
    console.log('Selected Town:', selectedTown);
    console.log('Filtered Content:', filteredContent);
  }, [filteredContent, activeCategory, selectedTown]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6 shadow-md">
        <AsideItem title="Categories">
          <div className="space-y-2">
            {categories.map((category) => (
              <CategoryButton
                key={category}
                isActive={activeCategory === category}
                onClick={() => handleCategoryClick(category)}
              >
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </CategoryButton>
            ))}
          </div>
        </AsideItem>
        <AsideItem title="Filters">
          <div className="space-y-2">
            <FilterCheckbox
              label="Family-friendly"
              checked={filters.familyFriendly}
              onChange={() => handleFilterChange('familyFriendly')}
            />
            <FilterCheckbox
              label="Outdoor"
              checked={filters.outdoor}
              onChange={() => handleFilterChange('outdoor')}
            />
            <FilterCheckbox
              label="Historic"
              checked={filters.historic}
              onChange={() => handleFilterChange('historic')}
            />
          </div>
          {(Object.values(filters).some(Boolean) || activeCategory || searchTerm || selectedTown) && (
            <button
              onClick={clearFilters}
              className="mt-4 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Clear All Filters
            </button>
          )}
        </AsideItem>
      </aside>
      <main className="flex-1 p-6">
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select a Town</h3>
          <div className="flex flex-wrap gap-2">
            {towns.map((town) => (
              <button
                key={town.id}
                onClick={() => handleTownClick(town.name)}
                className={`px-3 py-1 text-sm rounded ${
                  selectedTown === town.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {town.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map(item => (
            <ImageCard
              key={`${activeCategory}-${item.id}`}
              src={item.image || `/api/placeholder/400/300?text=${encodeURIComponent(item.name)}`}
              alt={item.name}
              title={item.name}
              category={activeCategory}
            />
          ))}
        </div>
        
        {filteredContent.length === 0 && activeCategory && (
          <p className="text-center text-gray-500 mt-8">No content found matching your criteria.</p>
        )}
      </main>
    </div>
  );
}