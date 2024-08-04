import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Moved NavBar to a separate client component
const NavBar = () => (
  <nav className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center items-center py-5">
        <Link href="/towns" className="text-gray-600 text-base font-medium mx-4 hover:text-blue-600 transition-colors duration-300">Towns</Link>
        <Link href="/beaches" className="text-gray-600 text-base font-medium mx-4 hover:text-blue-600 transition-colors duration-300">Beaches</Link>
        <Link href="/things-to-do" className="text-blue-600 text-base font-medium mx-4 hover:text-blue-800 transition-colors duration-300">Things to Do</Link>
        <Link href="/food-and-drink" className="text-gray-600 text-base font-medium mx-4 hover:text-blue-600 transition-colors duration-300">Food &amp; Drink</Link>
      </div>
    </div>
  </nav>
);

const ActivityCard = ({ name, image, description, category }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
    <div className="relative h-48">
      <Image src={image} alt={name} layout="fill" objectFit="cover" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{category}</span>
      <div className="mt-4">
        <Link href={`/activities/${name.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 font-semibold text-sm">
          Learn More
        </Link>
      </div>
    </div>
  </div>
);

const CategoryIcon = ({ text }) => (
  <div className="flex flex-col items-center text-gray-600 mx-4 mb-6">
    <span className="text-sm text-center">{text}</span>
  </div>
);

export default function ThingsToDoPage() {
  const activities = [
    {
      name: "Whale Watching Tour",
      image: "/images/whale-watching.jpg",
      description: "Embark on an unforgettable journey to see humpback whales in their natural habitat.",
      category: "Nature &amp; Wildlife"
    },
    {
      name: "Cape Cod Rail Trail",
      image: "/images/rail-trail.jpg",
      description: "Cycle through picturesque landscapes on this 22-mile paved trail.",
      category: "Outdoor Adventure"
    },
    {
      name: "Provincetown Art Galleries",
      image: "/images/art-galleries.jpg",
      description: "Explore a vibrant art scene in one of America&apos;s oldest art colonies.",
      category: "Arts &amp; Culture"
    },
    {
      name: "Cape Cod National Seashore",
      image: "/images/national-seashore.jpg",
      description: "Discover 40 miles of pristine sandy beaches, ponds, and lighthouses.",
      category: "Nature &amp; Wildlife"
    },
    {
      name: "Sandwich Glass Museum",
      image: "/images/glass-museum.jpg",
      description: "Learn about the town&apos;s glass-making history and watch live glass-blowing demonstrations.",
      category: "History &amp; Museums"
    },
    {
      name: "Highland Light Tour",
      image: "/images/highland-light.jpg",
      description: "Climb to the top of Cape Cod&apos;s oldest and tallest lighthouse for panoramic views.",
      category: "Landmarks &amp; Sightseeing"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Things to Do in Cape Cod</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
          From thrilling outdoor adventures to cultural experiences, Cape Cod offers a diverse array of activities for every type of traveler.
        </p>
        <div className="flex flex-wrap justify-center mb-12">
          <CategoryIcon text="Nature &amp; Wildlife" />
          <CategoryIcon text="Arts &amp; Culture" />
          <CategoryIcon text="Outdoor Adventure" />
          <CategoryIcon text="History &amp; Museums" />
          <CategoryIcon text="Landmarks &amp; Sightseeing" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <ActivityCard key={index} {...activity} />
          ))}
        </div>
      </div>
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">Plan Your Cape Cod Adventure</h2>
          <p className="text-center mb-8 max-w-2xl mx-auto">
            Whether you&apos;re seeking relaxation, adventure, or cultural experiences, Cape Cod has something for everyone. Let us help you create the perfect itinerary for your visit.
          </p>
          <div className="text-center">
            <Link href="/build-itinerary" className="bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-100 transition-duration-300">
              Customize Your Itinerary
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}