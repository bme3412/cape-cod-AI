'use client';

import React from 'react';
import { ArrowRight, MapPin, Calendar, Compass, Users, FolderOpen } from 'lucide-react';

const TownCard = ({ name, image, description }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="text-blue-600 font-semibold flex items-center group">
        Explore 
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
    <div className="text-blue-500 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorksStep = ({ title, description, icon }) => (
  <div className="flex items-start mb-12">
    <div className="text-blue-500 mr-6">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md';
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
    { name: "Barnstable", image: "/api/placeholder/800/600", description: "Historic charm meets modern amenities" },
    { name: "Falmouth", image: "/api/placeholder/800/600", description: "Beautiful beaches and vibrant culture" },
    { name: "Provincetown", image: "/api/placeholder/800/600", description: "Artistic haven at the tip of the Cape" },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <section className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Travel Cape Cod Differently</h2>
          <p className="text-xl text-gray-600 mb-8">AI-powered travel, personalized to you</p>
          <Button variant="primary">Start Your Journey</Button>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Featured Cape Cod Towns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTowns.map((town, index) => (
              <TownCard key={index} {...town} />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Why Choose Our Customizable Itineraries?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapPin className="h-10 w-10" />}
              title="Local Expertise"
              description="Get insider tips and hidden gems from Cape Cod natives"
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10" />}
              title="Tailored to You"
              description="Customize your itinerary to match your interests and schedule"
            />
            <FeatureCard
              icon={<Compass className="h-10 w-10" />}
              title="Unforgettable Experiences"
              description="Create memories that will last a lifetime"
            />
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">How it Works</h2>
          <div className="max-w-4xl mx-auto">
            <HowItWorksStep
              icon={<ArrowRight className="h-8 w-8" />}
              title="Start chatting with us"
              description="Ask us for suggestions or an entire itinerary. Be specific about your preferences or take our quiz to determine your travel style."
            />
            <HowItWorksStep
              icon={<MapPin className="h-8 w-8" />}
              title="Get personalized recommendations"
              description="Receive tailored travel experiences based on your preferences. Explore photos, reviews, and maps. Save your favorites to your trip plan."
            />
            <HowItWorksStep
              icon={<Users className="h-8 w-8" />}
              title="Collaborate with friends and family"
              description="Easily coordinate your trip. Invite others to view your itinerary or plan together for a fun and seamless experience."
            />
            <HowItWorksStep
              icon={<FolderOpen className="h-8 w-8" />}
              title="Organize everything in one place"
              description="Say goodbye to spreadsheets. Manage all aspects of your adventure—flights, hotels, activities, and more—in your Cape Cod Travel portfolio."
            />
          </div>
        </section>

        <section className="text-center bg-blue-100 py-16 px-4 rounded-lg">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Ready for your Cape Cod adventure?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Create your personalized itinerary today and unlock the best of Cape Cod</p>
          <Button variant="primary">
            Build Your Itinerary
          </Button>
        </section>
      </div>
    </div>
  );
}