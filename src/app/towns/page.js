import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Anchor, Sun, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NavBar = () => {
  const navItems = [
    { href: '/towns', label: 'Towns' },
    { href: '/beaches', label: 'Beaches' },
    { href: '/things-to-do', label: 'Things to Do' },
    { href: '/food-and-drink', label: 'Food & Drink' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center py-4">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} className="text-gray-600 text-lg font-semibold mx-4 hover:text-blue-600 transition-colors duration-300">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

const TownCard = ({ name, image, description, features }) => (
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
    <Image src={image} alt={name} width={800} height={600} className="w-full h-64 object-cover" />
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2 mb-4">
        {features.map((feature, index) => (
          <Badge key={index} variant="secondary">{feature}</Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button asChild className="w-full">
        <Link href={`/towns/${name.toLowerCase()}`}>
          Explore <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const FeatureIcon = ({ icon: Icon, text }) => (
  <div className="flex items-center text-white mr-6 mb-4">
    <Icon size={24} className="mr-2" />
    <span className="text-lg">{text}</span>
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
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Discover Cape Cod Towns</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Explore the unique charm and character of Cape Cod's beautiful towns. Each offers its own blend of history, culture, and coastal beauty.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {towns.map((town, index) => (
            <TownCard key={index} {...town} />
          ))}
        </div>
      </main>
      <footer className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">Explore Cape Cod's Towns</h2>
          <div className="flex flex-wrap justify-center mb-8">
            <FeatureIcon icon={MapPin} text="15 Unique Towns" />
            <FeatureIcon icon={Anchor} text="Coastal Beauty" />
            <FeatureIcon icon={Sun} text="Year-round Activities" />
            <FeatureIcon icon={Camera} text="Instagram-worthy Spots" />
          </div>
          <div className="text-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/build-itinerary">
                Plan Your Town-Hopping Adventure
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TownsPage;