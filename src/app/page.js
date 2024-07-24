'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Calendar, Compass, Users, FolderOpen } from 'lucide-react';

const TownCard = ({ name, image, description }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
    <img src={image} alt={name} className="w-full h-64 object-cover" />
    <div className="p-8">
      <h3 className="text-2xl font-semibold mb-3 text-gray-800">{name}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <button className="text-blue-600 font-semibold flex items-center group text-lg">
        Explore 
        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
    <div className="text-blue-500 mb-6">{icon}</div>
    <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorksStep = ({ title, description, icon }) => (
  <div className="flex items-start mb-16">
    <div className="text-blue-500 mr-8">{icon}</div>
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-8 py-4 rounded-full text-xl font-semibold transition duration-300 shadow-md';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-white text-blue-600 hover:bg-blue-50',
    outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default function Home() {
  const featuredTowns = [
    { name: "Barnstable", image: "/api/placeholder/800/600", description: "Historic charm meets modern amenities in this vibrant coastal town." },
    { name: "Falmouth", image: "/api/placeholder/800/600", description: "Experience beautiful beaches, vibrant culture, and scenic bike paths." },
    { name: "Provincetown", image: "/api/placeholder/800/600", description: "Discover an artistic haven at the tip of the Cape, known for its galleries and beaches." },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <section className="text-center py-32">
          <h1 className="text-6xl font-bold mb-6 text-gray-800">Travel Cape Cod Differently</h1>
          <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">Experience the beauty of Cape Cod with AI-powered travel, personalized just for you</p>
          <Link href="/explore">
            <Button variant="primary" className="text-2xl">Start Exploring</Button>
          </Link>
        </section>

        <section className="py-32">
          <h2 className="text-4xl font-semibold mb-16 text-center text-gray-800">Featured Cape Cod Towns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredTowns.map((town, index) => (
              <TownCard key={index} {...town} />
            ))}
          </div>
        </section>

        <section className="py-32 bg-blue-100 rounded-3xl">
          <h2 className="text-4xl font-semibold mb-16 text-center text-gray-800">Why Choose Our Customizable Itineraries?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<MapPin className="h-16 w-16" />}
              title="Local Expertise"
              description="Get insider tips and hidden gems from Cape Cod natives, ensuring an authentic experience."
            />
            <FeatureCard
              icon={<Calendar className="h-16 w-16" />}
              title="Tailored to You"
              description="Customize your itinerary to match your interests, preferences, and schedule for a perfect trip."
            />
            <FeatureCard
              icon={<Compass className="h-16 w-16" />}
              title="Unforgettable Experiences"
              description="Create memories that will last a lifetime with our curated selection of unique activities."
            />
          </div>
        </section>

        <section className="py-32">
          <h2 className="text-4xl font-semibold mb-16 text-center text-gray-800">How it Works</h2>
          <div className="max-w-5xl mx-auto">
            <HowItWorksStep
              icon={<ArrowRight className="h-12 w-12" />}
              title="Start chatting with us"
              description="Begin by sharing your preferences or take our travel style quiz. We'll use this information to craft your perfect Cape Cod experience."
            />
            <HowItWorksStep
              icon={<MapPin className="h-12 w-12" />}
              title="Get personalized recommendations"
              description="Receive tailored suggestions based on your unique preferences. Explore detailed information, reviews, and interactive maps to plan your ideal trip."
            />
            <HowItWorksStep
              icon={<Users className="h-12 w-12" />}
              title="Collaborate with friends and family"
              description="Easily share and coordinate your plans. Invite others to view or contribute to your itinerary for a seamless group planning experience."
            />
            <HowItWorksStep
              icon={<FolderOpen className="h-12 w-12" />}
              title="Organize everything in one place"
              description="Manage all aspects of your adventure—from flights and accommodations to activities and dining—in your comprehensive Cape Cod Travel portfolio."
            />
          </div>
        </section>

        <section className="text-center bg-blue-600 text-white py-32 px-4 rounded-3xl mb-32">
          <h2 className="text-4xl font-semibold mb-6">Ready for your Cape Cod adventure?</h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto">Create your personalized itinerary today and unlock the best of Cape Cod's charm, beauty, and experiences.</p>
          <Link href="/explore">
            <Button variant="secondary" className="text-2xl">
              Build Your Itinerary
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}