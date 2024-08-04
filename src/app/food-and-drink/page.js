import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => (
  <nav className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center items-center py-5">
        <Link href="/towns" className="text-gray-600 text-base font-medium mx-4 hover:text-blue-600 transition-colors duration-300">Towns</Link>
        <Link href="/beaches" className="text-gray-600 text-base font-medium mx-4 hover:text-blue-600 transition-colors duration-300">Beaches</Link>
        <Link href="/things-to-do" className="text-gray-600 text-base font-medium mx-4 hover:text-blue-600 transition-colors duration-300">Things to Do</Link>
        <Link href="/food-and-drink" className="text-blue-600 text-base font-medium mx-4 hover:text-blue-800 transition-colors duration-300">Food & Drink</Link>
      </div>
    </div>
  </nav>
);

const EstablishmentCard = ({ name, image, description, category, rating }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
    <div className="relative h-48">
      <Image src={image} alt={name} layout="fill" objectFit="cover" />
      <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
        {rating} ★
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{category}</span>
      <div className="mt-4">
        <Link href={`/food-and-drink/${name.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 font-semibold text-sm">
          View Details
        </Link>
      </div>
    </div>
  </div>
);

const CategoryFilter = ({ text }) => (
  <button className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:bg-gray-100">
    {text}
  </button>
);

export default function FoodAndDrinkPage() {
  const establishments = [
    {
      name: "The Lobster Pot",
      image: "/images/lobster-pot.jpg",
      description: "Iconic seafood restaurant offering stunning harbor views and fresh lobster dishes.",
      category: "Seafood",
      rating: 4.7
    },
    {
      name: "Café Chew",
      image: "/images/cafe-chew.jpg",
      description: "Charming café known for its gourmet sandwiches and homemade pastries.",
      category: "Café",
      rating: 4.5
    },
    {
      name: "Truro Vineyards",
      image: "/images/truro-vineyards.jpg",
      description: "Local winery offering tastings of their award-winning wines with beautiful vineyard views.",
      category: "Winery",
      rating: 4.6
    },
    {
      name: "The Canteen",
      image: "/images/the-canteen.jpg",
      description: "Modern take on classic New England fare, featuring locally-sourced ingredients.",
      category: "American",
      rating: 4.8
    },
    {
      name: "Cape Cod Beer",
      image: "/images/cape-cod-beer.jpg",
      description: "Craft brewery offering tours, tastings, and a relaxed taproom experience.",
      category: "Brewery",
      rating: 4.5
    },
    {
      name: "The Oyster Company",
      image: "/images/oyster-company.jpg",
      description: "Specializing in fresh, local oysters and other seafood delicacies.",
      category: "Seafood",
      rating: 4.6
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Food & Drink in Cape Cod</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Savor the flavors of Cape Cod, from fresh seafood to local wines and craft beers. Discover culinary delights that will make your visit unforgettable.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <CategoryFilter text="All" />
          <CategoryFilter text="Seafood" />
          <CategoryFilter text="Café" />
          <CategoryFilter text="Winery" />
          <CategoryFilter text="Brewery" />
          <CategoryFilter text="American" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {establishments.map((establishment, index) => (
            <EstablishmentCard key={index} {...establishment} />
          ))}
        </div>
      </div>
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">Taste the Best of Cape Cod</h2>
          <p className="text-center mb-8 max-w-2xl mx-auto">
            From seafood shacks to fine dining, wineries to breweries, Cape Cod offers a diverse culinary scene. Let us help you discover the perfect dining experiences for your visit.
          </p>
          <div className="text-center">
            <Link href="/build-itinerary" className="bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-100 transition-duration-300">
              Plan Your Culinary Adventure
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}