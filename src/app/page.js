import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar, Compass, Users, FolderOpen } from 'lucide-react';

const NavBar = () => (
  <nav className="absolute top-0 left-0 right-0 z-10 bg-transparent">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center items-center py-5">
        <Link href="/towns" className="text-white text-base font-medium mx-4 hover:text-blue-200 transition-colors duration-300">Towns</Link>
        <Link href="/beaches" className="text-white text-base font-medium mx-4 hover:text-blue-200 transition-colors duration-300">Beaches</Link>
        <Link href="/things-to-do" className="text-white text-base font-medium mx-4 hover:text-blue-200 transition-colors duration-300">Things to Do</Link>
        <Link href="/food-and-drink" className="text-white text-base font-medium mx-4 hover:text-blue-200 transition-colors duration-300">Food & Drink</Link>
      </div>
    </div>
  </nav>
)

const HeroSection = () => (
  <div className="relative h-screen">
    <Image
      src="/images/cotuit-sailing.png"
      alt="Cape Cod Sailing"
      layout="fill"
      objectFit="cover"
      quality={100}
      priority
    />
    <div className="absolute inset-0 bg-black bg-opacity-50" />
    <NavBar />
    <div className="absolute inset-0 flex flex-col items-center justify-start pt-24 text-white">
      <div className="text-center px-8 py-10 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105">
        <h1 className="text-6xl font-bold mb-6 text-white leading-tight">Travel Cape Cod Differently</h1>
        <p className="text-2xl mb-12 max-w-3xl text-white">Experience the beauty of Cape Cod with AI-powered travel, personalized just for you</p>
      </div>
      <div className="mt-auto mb-24">
        <Link href="/explore">
          <Button variant="primary" className="text-2xl hover:scale-105 transition-transform duration-300">Start Exploring</Button>
        </Link>
      </div>
    </div>
  </div>
);


const TownCard = ({ name, image, description }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
    <Image src={image} alt={name} width={800} height={600} className="w-full h-64 object-cover" />
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
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform flex flex-col items-center text-center">
    <div className="text-blue-600 mb-6">{React.cloneElement(icon, { size: 48 })}</div>
    <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-lg">{description}</p>
  </div>
);


const HowItWorksStep = ({ title, description, icon }) => (
  <div className="flex items-start mb-16 transition-all duration-500 hover:translate-x-2 transform">
    <div className="text-blue-600 mr-8 flex-shrink-0">
      {React.cloneElement(icon, { size: 48 })}
    </div>
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-8 py-4 rounded-full text-xl font-semibold transition duration-300 shadow-md';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
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
    { name: "Barnstable", image: "/images/barnstable.jpg", description: "Historic charm meets modern amenities in this vibrant coastal town." },
    { name: "Falmouth", image: "/images/falmouth.jpg", description: "Experience beautiful beaches, vibrant culture, and scenic bike paths." },
    { name: "Provincetown", image: "/images/provincetown.jpg", description: "Discover an artistic haven at the tip of the Cape, known for its galleries and beaches." },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4">
        <section className="py-32">
          <h2 className="text-5xl font-bold mb-16 text-center text-gray-800">Featured Cape Cod Towns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredTowns.map((town, index) => (
              <TownCard key={index} {...town} />
            ))}
          </div>
        </section>

        <section className="py-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl shadow-inner">
          <h2 className="text-5xl font-bold mb-8 text-center text-gray-800">Why Choose Our Customizable Itineraries?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16">
            Experience Cape Cod like never before with our AI-powered travel planning tool.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8">
            <FeatureCard
              icon={<MapPin />}
              title="Local Expertise"
              description="Get insider tips and hidden gems from Cape Cod natives, ensuring an authentic experience."
            />
            <FeatureCard
              icon={<Calendar />}
              title="Tailored to You"
              description="Customize your itinerary to match your interests, preferences, and schedule for a perfect trip."
            />
            <FeatureCard
              icon={<Compass />}
              title="Unforgettable Experiences"
              description="Create memories that will last a lifetime with our curated selection of unique activities."
            />
          </div>
        </section>

        <section className="py-32">
          <h2 className="text-5xl font-bold mb-16 text-center text-gray-800">How it Works</h2>
          <div className="max-w-5xl mx-auto">
            <HowItWorksStep
              icon={<ArrowRight />}
              title="Start chatting with us"
              description="Begin by sharing your preferences or take our travel style quiz. We'll use this information to craft your perfect Cape Cod experience."
            />
            <HowItWorksStep
              icon={<MapPin />}
              title="Get personalized recommendations"
              description="Receive tailored suggestions based on your unique preferences. Explore detailed information, reviews, and interactive maps to plan your ideal trip."
            />
            <HowItWorksStep
              icon={<Users />}
              title="Collaborate with friends and family"
              description="Easily share and coordinate your plans. Invite others to view or contribute to your itinerary for a seamless group planning experience."
            />
            <HowItWorksStep
              icon={<FolderOpen />}
              title="Organize everything in one place"
              description="Manage all aspects of your adventure—from flights and accommodations to activities and dining—in your comprehensive Cape Cod Travel portfolio."
            />
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-32 px-4 rounded-3xl mb-32 shadow-2xl">
          <h2 className="text-4xl font-semibold mb-6">Ready for your Cape Cod adventure?</h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto">Create your personalized itinerary today and unlock the best of Cape Cod's charm, beauty, and experiences.</p>
          <Link href="/build-itinerary">
            <Button variant="secondary" className="text-2xl hover:scale-105 transition-transform duration-300">
              Build Your Itinerary
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}