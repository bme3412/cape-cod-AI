import React from 'react';
import { ArrowRight } from 'lucide-react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-full text-sm font-semibold transition duration-300 shadow-md';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-white text-blue-600 hover:bg-blue-50',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600',
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

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold">Cape Cod Travel</div>
          <nav className="space-x-4">
            <Button variant="secondary">Sign In</Button>
            <Button>Get Started</Button>
          </nav>
        </div>
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start Exploring the Cape
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover charming towns and create unforgettable memories with our AI-powered, personalized itineraries
          </p>
          <Button variant="outline" className="text-lg px-6 py-3 inline-flex items-center group">
            Begin Your Journey
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </header>
  );
}