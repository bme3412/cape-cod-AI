"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Waves,
  Sun,
  Fish,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const NavBar = () => (
  <nav className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center items-center py-5">
        {["Towns", "Beaches", "Things to Do", "Food & Drink"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
            className={`text-base font-medium mx-4 transition-colors duration-300
              ${
                item === "Beaches"
                  ? "text-blue-600 hover:text-blue-800"
                  : "text-gray-600 hover:text-blue-600"
              }`}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  </nav>
);

const BeachCard = ({ name, images, description, features }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeImage = (step) => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + step + images.length) % images.length
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
      <div className="relative h-64 w-full">
        {images.length > 0 ? (
          <>
            <Image
              src={images[currentImageIndex]}
              alt={`${name} - Image ${currentImageIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={currentImageIndex === 0}
              style={{ objectFit: "cover" }}
            />
            {images.length > 1 && (
              <div className="absolute bottom-2 right-2 flex">
                <button
                  onClick={() => changeImage(-1)}
                  className="bg-white bg-opacity-50 rounded-full p-2 mr-2"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => changeImage(1)}
                  className="bg-white bg-opacity-50 rounded-full p-2"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200">
            <p>No image available</p>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap mb-4">
          {features.map((feature, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
        <Link
          href={`/beaches/${name.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-blue-600 font-semibold flex items-center group text-sm"
        >
          Learn More
          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

const BeachSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
    <div className="h-64 w-full bg-gray-300 animate-pulse"></div>
    <div className="p-6">
      <div className="h-6 w-3/4 bg-gray-300 mb-2 animate-pulse"></div>
      <div className="h-4 w-full bg-gray-300 mb-4 animate-pulse"></div>
      <div className="flex flex-wrap mb-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-6 w-16 bg-gray-300 mr-2 mb-2 rounded animate-pulse"
          ></div>
        ))}
      </div>
      <div className="h-4 w-24 bg-gray-300 animate-pulse"></div>
    </div>
  </div>
);

const BeachesClient = () => {
  const [beaches, setBeaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const beachesPerPage = 9;

  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        const response = await fetch("/data/beaches.json");
        if (!response.ok) throw new Error("Failed to fetch beach data");
        const data = await response.json();
        const transformedData = await Promise.all(
          data.map(async (beach) => {
            const beachId = beach.id.toLowerCase().replace(/\s+/g, "-");
            const images = await getValidImages(beachId);
            return {
              ...beach,
              images,
              features: beach.features || [],
            };
          })
        );
        setBeaches(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBeaches();
  }, []);

  const getValidImages = async (beachId) => {
    const validImages = [];
    const imageNames = [
      `${beachId.replace(/-/g, "")}`,
      `${beachId}`,
      `${beachId.replace(/-/g, "_")}`,
    ];
    const extensions = ["png", "jpg", "jpeg"];

    for (let i = 1; i <= 7; i++) {
      for (const name of imageNames) {
        for (const ext of extensions) {
          const imagePath = `/images/beaches/${beachId}/${name}_${i}.${ext}`;
          try {
            const res = await fetch(imagePath, { method: "HEAD" });
            if (res.ok) {
              validImages.push(imagePath);
              break; // Break the innermost loop after finding a valid image
            }
          } catch (error) {
            console.error(`Error checking image ${imagePath}:`, error);
          }
        }
        if (validImages.length === i) break; // Break the middle loop if we found an image for this index
      }
      if (validImages.length < i) break; // Break the outer loop if we didn't find an image for this index
    }
    return validImages;
  };

  const paginatedBeaches = beaches.slice(0, page * beachesPerPage);

  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Discover Cape Cod Beaches
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Explore the pristine shores and crystal-clear waters of Cape
          Cod&apos;s renowned beaches. From family-friendly coves to
          surfer&apos;s paradises, there&apos;s a perfect beach for every
          visitor.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <BeachSkeleton key={index} />
              ))
            : paginatedBeaches.map((beach, index) => (
                <BeachCard key={beach.id || index} {...beach} />
              ))}
        </div>
        {!isLoading && beaches.length > paginatedBeaches.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeachesClient;
