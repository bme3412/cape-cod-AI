import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Anchor, Sun, Camera } from 'lucide-react';

const NavBar = () => (
  <nav className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center items-center py-6">
        <Link href="/towns" className="text-blue-600 text-lg font-semibold mx-4 hover:text-blue-800 transition-colors duration-300">Towns</Link>
        <Link href="/beaches" className="text-gray-600 text-lg font-semibold mx-4 hover:text-blue-600 transition-colors duration-300">Beaches</Link>
        <Link href="/things-to-do" className="text-gray-600 text-lg font-semibold mx-4 hover:text-blue-600 transition-colors duration-300">Things to Do</Link>
        <Link href="/food-and-drink" className="text-gray-600 text-lg font-semibold mx-4 hover:text-blue-600 transition-colors duration-300">Food & Drink</Link>
      </div>
    </div>
  </nav>
);

const TownCard = ({ name, image, description, features }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
    <Image src={image} alt={name} width={800} height={600} className="w-full h-64 object-cover" />
    <div className="p-8">
      <h3 className="text-2xl font-semibold mb-3 text-gray-800">{name}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="flex flex-wrap mb-6">
        {features.map((feature, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">{feature}</span>
        ))}
      </div>
      <Link href={`/towns/${name.toLowerCase()}`} className="text-blue-600 font-semibold flex items-center group text-lg">
        Explore 
        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
);

const FeatureIcon = ({ icon: Icon, text }) => (
  <div className="flex items-center text-gray-600 mr-4">
    <Icon size={20} className="mr-2" />
    <span>{text}</span>
  </div>
);

const TownsPage = () => {
  const towns = [
    {
      name: "Barnstable",
      image: "/images/barnstable.jpg",
      description: "Historic charm meets modern amenities in this vibrant coastal town.",
      features: ["Historic", "Beaches", "Shopping"]
    },
    {
      name: "Falmouth",
      image: "/images/falmouth.jpg",
      description: "Experience beautiful beaches, vibrant culture, and scenic bike paths.",
      features: ["Beaches", "Biking", "Culture"]
    },
    {
      name: "Provincetown",
      image: "/images/provincetown.jpg",
      description: "Discover an artistic haven at the tip of the Cape, known for its galleries and beaches.",
      features: ["Art", "LGBTQ+ Friendly", "Nightlife"]
    },
    {
      name: "Chatham",
      image: "/images/chatham.jpg",
      description: "Enjoy quintessential Cape Cod charm in this picturesque seaside village.",
      features: ["Lighthouse", "Fishing", "Shopping"]
    },
    {
      name: "Hyannis",
      image: "/images/hyannis.jpg",
      description: "Explore the hub of Cape Cod, offering ferries, shopping, and Kennedy family history.",
      features: ["Ferry Port", "Kennedy Legacy", "Dining"]
    },
    {
      name: "Wellfleet",
      image: "/images/wellfleet.jpg",
      description: "Immerse yourself in art galleries, fresh oysters, and pristine beaches.",
      features: ["Oysters", "Art Galleries", "National Seashore"]
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Discover Cape Cod Towns</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Explore the unique charm and character of Cape Cod's beautiful towns. Each offers its own blend of history, culture, and coastal beauty.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {towns.map((town, index) => (
            <TownCard key={index} {...town} />
          ))}
        </div>
      </div>
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">Explore Cape Cod's Towns</h2>
          <div className="flex flex-wrap justify-center mb-8">
            <FeatureIcon icon={MapPin} text="15 Unique Towns" />
            <FeatureIcon icon={Anchor} text="Coastal Beauty" />
            <FeatureIcon icon={Sun} text="Year-round Activities" />
            <FeatureIcon icon={Camera} text="Instagram-worthy Spots" />
          </div>
          <div className="text-center">
            <Link href="/build-itinerary" className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300">
              Plan Your Town-Hopping Adventure
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TownsPage;