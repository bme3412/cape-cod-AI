'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { MapPin, Umbrella, Utensils, AlertTriangle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const DEFAULT_COORDINATES = [-70.3, 41.7];
const DEFAULT_ZOOM = 12;

const TownPage = ({ params }) => {
  const { townName } = params;
  const [townData, setTownData] = useState(null);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_COORDINATES);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    const fetchTownData = async () => {
      try {
        const response = await fetch(`/api/towns/${townName}`);
        if (!response.ok) throw new Error('Failed to fetch town data');
        const data = await response.json();
        setTownData(data);
        if (data.beaches?.[0]?.coordinates) {
          setMapCenter([data.beaches[0].coordinates.longitude, data.beaches[0].coordinates.latitude]);
        }
        
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
    };
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
      <ScrollArea className="w-full md:w-2/5 h-1/2 md:h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">{townName}, MA</h1>
        
        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="beaches">Beaches</TabsTrigger>
            <TabsTrigger value="food">Food & Drink</TabsTrigger>
          </TabsList>
          <TabsContent value="activities">
            <Section
              icon={<MapPin className="mr-2" />}
              items={townData.activities}
              renderItem={(activity) => (
                <LocationCard
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
          </TabsContent>
          <TabsContent value="beaches">
            <Section
              icon={<Umbrella className="mr-2" />}
              items={townData.beaches}
              renderItem={(beach) => (
                <LocationCard
                  title={beach.name}
                  description={beach.description}
                  details={[
                    { label: "Features", value: beach.tags && beach.tags.length > 0 ? beach.tags.join(', ') : 'No features listed' }
                  ]}
                  onClick={() => handleLocationSelect({ ...beach, category: 'beaches' })}
                />
              )}
            />
          </TabsContent>
          <TabsContent value="food">
            <Section
              icon={<Utensils className="mr-2" />}
              items={townData.food_and_drink}
              renderItem={(place) => (
                <LocationCard
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
          </TabsContent>
        </Tabs>
      </ScrollArea>
      
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
};

const Section = ({ icon, items, renderItem }) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <div key={index}>{renderItem(item)}</div>
    ))}
  </div>
);

const LocationCard = ({ title, description, details, onClick }) => (
  <Card className="hover:shadow-lg transition-shadow duration-300" onClick={onClick}>
    <CardHeader>
      <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
      {details.map((detail, index) => (
        <p key={index} className="text-xs text-gray-500">
          <span className="font-semibold">{detail.label}:</span> {detail.value}
        </p>
      ))}
      <Button variant="outline" size="sm" className="mt-2">
        View on Map
      </Button>
    </CardContent>
  </Card>
);

const ErrorDisplay = ({ message }) => (
  <div className="flex items-center justify-center h-screen bg-red-50">
    <div className="text-center p-8 bg-white rounded-lg shadow-lg">
      <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
      <h1 className="text-2xl font-bold text-red-700 mb-2">Oops! Something went wrong</h1>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default TownPage;