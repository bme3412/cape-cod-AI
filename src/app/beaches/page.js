import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Waves, Sun, Fish, Shield } from 'lucide-react';

const NavBar = () => (
  <nav className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center items-center py-5">
        <Link href="/towns" className="text-gray-600 text-base font-medium mx-4 hover:text-blue-600 transition-colors duration-300">Towns</Link>
        <Link href="/beaches" className="text-blue-600 text-base font-medium mx-4 hover:text-blue-800 transition-colors duration-300">Beaches</Link>
        <Link href="/things-to-do" className="text-gray-600 text-base font-medium mx-4 hover:text-blue-600 transition-colors duration-300">Things to Do</Link>
        <Link href="/food-and-drink" className="text-gray-600 text-base font-medium mx-4 hover:text-blue-600 transition-colors duration-300">Food & Drink</Link>
      </div>
    </div>
  </nav>
);

const BeachCard = ({ name, image, description, features }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
    <Image src={image} alt={name} width={800} height={600} className="w-full h-64 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <div className="flex flex-wrap mb-4">
        {features.map((feature, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">{feature}</span>
        ))}
      </div>
      <Link href={`/beaches/${name.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 font-semibold flex items-center group text-sm">
        Learn More
        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
);

const FeatureIcon = ({ icon: Icon, text }) => (
  <div className="flex items-center text-gray-600 mr-4">
    <Icon size={20} className="mr-2" />
    <span className="text-sm">{text}</span>
  </div>
);

const BeachesPage = () => {
  const beaches = [
    {
      name: "Craigville Beach",
      image: "/data/beaches-data/beaches/beach/images/craigville-beach.jpg",
      description: "A popular family-friendly beach with calm waters and a wide stretch of sand.",
      features: ["Family-Friendly", "Calm Waters", "Snack Bar"]
    },
    {
      name: "Nauset Beach",
      image: "/data/beaches-data/beaches/beach/images/nauset-beach.jpg",
      description: "Known for its large waves, perfect for surfing and boogie boarding.",
      features: ["Surfing", "Large Waves", "Scenic Views"]
    },
    {
      name: "Mayflower Beach",
      image: "/data/beaches-data/beaches/beach/images/mayflower-beach.jpg",
      description: "Famous for its tidal flats and breathtaking sunsets over Cape Cod Bay.",
      features: ["Tidal Flats", "Sunsets", "Long Shoreline"]
    },
    {
      name: "Race Point Beach",
      image: "/data/beaches-data/beaches/beach/images/race-point-beach.jpg",
      description: "A scenic beach with opportunities for whale watching from the shore.",
      features: ["Whale Watching", "Bike Trails", "Lighthouse"]
    },
    {
      name: "Marconi Beach",
      image: "/data/beaches-data/beaches/beach/images/marconi-beach.jpg",
      description: "Part of the Cape Cod National Seashore with high sand cliffs and rough surf.",
      features: ["National Seashore", "Sand Cliffs", "Historical Site"]
    },
    {
      name: "Kalmus Beach",
      image: "/data/beaches-data/beaches/beach/images/kalmus-beach.jpg",
      description: "Popular for windsurfing and kiteboarding due to its steady winds.",
      features: ["Windsurfing", "Kiteboarding", "Concession Stand"]
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Discover Cape Cod Beaches</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Explore the pristine shores and crystal-clear waters of Cape Cod&apos;s renowned beaches. From family-friendly coves to surfer&apos;s paradises, there&apos;s a perfect beach for every visitor.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beaches.map((beach, index) => (
            <BeachCard key={index} {...beach} />
          ))}
        </div>
      </div>
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">Experience Cape Cod&apos;s Beaches</h2>
          <div className="flex flex-wrap justify-center mb-8">
            <FeatureIcon icon={Waves} text="40+ Miles of Beaches" />
            <FeatureIcon icon={Sun} text="Stunning Sunsets" />
            <FeatureIcon icon={Fish} text="Rich Marine Life" />
            <FeatureIcon icon={Shield} text="Protected Seashores" />
          </div>
          <div className="text-center">
            <Link href="/build-itinerary" className="bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-100 transition duration-300">
              Plan Your Beach Day
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeachesPage;