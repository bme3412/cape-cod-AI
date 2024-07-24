import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
  title: 'Cape Cod Travel - AI-Powered Personalized Itineraries',
  description: 'Discover the magic of Cape Cod with our AI-powered travel planner. Create personalized itineraries and explore charming towns.',
  keywords: 'Cape Cod, travel, AI, personalized itinerary, vacation planner',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-gradient">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}