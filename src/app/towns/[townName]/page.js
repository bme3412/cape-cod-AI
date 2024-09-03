'use client'

import { useEffect, useState, useCallback } from 'react';
import { MapPin, Umbrella, Utensils, AlertTriangle } from 'lucide-react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const DEFAULT_COORDINATES = [-70.3, 41.7];
const DEFAULT_ZOOM = 12;

export default function TownPage({ params }) {
  const { townName } = params;
  const [townData, setTownData] = useState(null);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_COORDINATES);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    async function fetchTownData() {
      try {
        const response = await fetch(`/api/towns/${townName}`);
        if (!response.ok) throw new Error('Failed to fetch town data');
        const data = await response.json();
        setTownData(data);
        if (data.beaches?.[0]?.coordinates) {
          setMapCenter([data.beaches[0].coordinates.longitude, data.beaches[0].coordinates.latitude]);
        }
        
        // Combine all locations with coordinates and add category information
        const locations = [
          ...data.activities.map(item => ({ ...item, category: 'activities' })),
          ...data.beaches.map(item => ({ ...item, category: 'beaches' })),
          ...data.food_and_drink.map(item => ({ ...item, category: 'food_and_drink' }))
        ].filter(item => item.coordinates);
        setAllLocations(locations);
      } catch (err) {
        console.error('Error fetching town data:', err);
        setError('Error loading town data. Please try again later.');
      }
    }
    fetchTownData();
  }, [townName]);

  const handleMapChange = useCallback((newCenter, newZoom) => {
    setMapCenter(newCenter);
    setZoom(newZoom);
  }, []);

  const handleLocationSelect = useCallback((location) => {
    if (location.coordinates) setSelectedLocation(location);
  }, []);

  if (error) return <ErrorDisplay message={error} />;
  if (!townData) return <LoadingSpinner />;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-2/5 h-1/2 md:h-screen overflow-y-auto p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">{townName}, MA</h1>
        
        <Section
          title="Activities"
          icon={<MapPin className="mr-2" />}
          items={townData.activities}
          renderItem={(activity) => (
            <Card
              title={activity.name}
              description={activity.description}
              details={[
                { label: "Address", value: activity.address },
                { label: "Price", value: activity.price_range }
              ]}
              onClick={() => handleLocationSelect({ ...activity, category: 'activities' })}
            />
          )}
        />

        <Section
          title="Beaches"
          icon={<Umbrella className="mr-2" />}
          items={townData.beaches}
          renderItem={(beach) => (
            <Card
              title={beach.name}
              description={beach.description}
              details={[
                { label: "Features", value: beach.tags.join(', ') }
              ]}
              onClick={() => handleLocationSelect({ ...beach, category: 'beaches' })}
            />
          )}
        />

        <Section
          title="Food and Drink"
          icon={<Utensils className="mr-2" />}
          items={townData.food_and_drink}
          renderItem={(place) => (
            <Card
              title={place.name}
              description={`${place.type} - ${place.cuisine}`}
              details={[
                { label: "Address", value: place.address },
                { label: "Price", value: place.price_range }
              ]}
              onClick={() => handleLocationSelect({ ...place, category: 'food_and_drink' })}
            />
          )}
        />
      </div>
      
      <div className="w-full md:w-3/5 h-1/2 md:h-screen">
        <Map 
          center={mapCenter}
          zoom={zoom}
          onMapChange={handleMapChange}
          locations={allLocations}
          selectedLocation={selectedLocation}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}

function Section({ title, icon, items, renderItem }) {
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-3 text-blue-700 flex items-center">
        {icon} {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>
    </section>
  );
}

function Card({ title, description, details, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">{title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        {details.map((detail, index) => (
          <p key={index} className="text-xs text-gray-500">
            <span className="font-semibold">{detail.label}:</span> {detail.value}
          </p>
        ))}
      </div>
    </div>
  );
}

function ErrorDisplay({ message }) {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
        <h1 className="text-2xl font-bold text-red-700 mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}