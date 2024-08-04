"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import { Clock, MapPin, Utensils, InfoCircle } from 'lucide-react';


const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md text-sm font-semibold transition duration-300 shadow-sm";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white text-blue-600 hover:bg-blue-50 border border-blue-600",
    town: "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300",
    townSelected: "bg-blue-100 text-blue-800 border border-blue-500",
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

const InputField = ({ label, type, value, onChange, ...props }) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={label}
    >
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={label}
      type={type}
      value={value}
      onChange={onChange}
      {...props}
    />
  </div>
);

const CheckboxGroup = ({ label, options, selectedOptions, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <div className="flex flex-wrap -mx-2">
      {options.map((option) => (
        <div key={option} className="px-2 mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={onChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">{option}</span>
          </label>
        </div>
      ))}
    </div>
  </div>
);

const ItineraryDay = ({ day, activities }) => (
  <div className="mb-6 bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-bold mb-4 text-blue-800">{day}</h3>
    <ul className="space-y-2">
      {activities.map((activity, index) => (
        <li key={index} className="flex items-start">
          <span className="text-blue-500 mr-2">•</span>
          <span>{activity}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function BuildItinerary() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [activities, setActivities] = useState([]);
  const [towns, setTowns] = useState([]);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  const preferenceOptions = ["Beach", "History", "Nature", "Food", "Shopping"];
  const activityOptions = [
    "Swimming",
    "Hiking",
    "Sightseeing",
    "Dining",
    "Boating",
  ];
  const townOptions = [
    "Barnstable",
    "Falmouth",
    "Chatham",
    "Provincetown",
    "Hyannis",
  ];

  const handlePreferencesChange = (e) => {
    const value = e.target.value;
    setPreferences((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleActivitiesChange = (e) => {
    const value = e.target.value;
    setActivities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleTownToggle = (town) => {
    setTowns((prev) =>
      prev.includes(town)
        ? prev.filter((item) => item !== town)
        : [...prev, town]
    );
  };

  const generateItinerary = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
          preferences,
          activities,
          towns,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate itinerary");
      }

      const data = await response.json();
      setGeneratedItinerary(data.itinerary);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  const parseItinerary = (itineraryText) => {
    const days = itineraryText.split(/Day \d+:/g).filter(day => day.trim() !== '');
    return days.map((day, index) => ({
      day: `Day ${index + 1}`,
      activities: day.trim().split('\n').filter(activity => activity.trim() !== '').map(activity => activity.trim())
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Build Your Cape Cod Itinerary
        </h1>
        <p className="text-lg mb-12 text-center text-gray-600">
          Customize your perfect Cape Cod adventure with our AI-powered
          itinerary builder.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <InputField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <InputField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <CheckboxGroup
            label="Preferences"
            options={preferenceOptions}
            selectedOptions={preferences}
            onChange={handlePreferencesChange}
          />
          <CheckboxGroup
            label="Activities"
            options={activityOptions}
            selectedOptions={activities}
            onChange={handleActivitiesChange}
          />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Towns to Visit
            </label>
            <div className="flex flex-wrap gap-2">
              {townOptions.map((town) => (
                <Button
                  key={town}
                  variant={towns.includes(town) ? "townSelected" : "town"}
                  onClick={() => handleTownToggle(town)}
                >
                  {town}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-12">
          <Link href="/" passHref>
            <Button variant="secondary">Back to Home</Button>
          </Link>
          <Button
            variant="primary"
            onClick={generateItinerary}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Itinerary"}
          </Button>
        </div>

        {generatedItinerary && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
              Your Cape Cod Adventure
            </h2>
            <div className="mb-6 text-center">
              <p className="text-xl text-gray-600">
                {format(parseISO(startDate), "MMMM d, yyyy")} -{" "}
                {format(parseISO(endDate), "MMMM d, yyyy")}
              </p>
              <p className="text-lg text-gray-500 mt-2">
                {towns.join(", ")} • {preferences.join(", ")}
              </p>
            </div>
            <div className="space-y-8">
              {parseItinerary(generatedItinerary).map((day, index) => (
                <ItineraryDay key={index} {...day} />
              ))}
            </div>
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">
                Travel Tips
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-gray-700">
                <li>
                  Don&apos;t forget to pack sunscreen and beach essentials!
                </li>
                <li>
                  Check local event calendars for festivals or special
                  activities during your stay.
                </li>
                <li>
                  Consider renting bikes for easy exploration of Cape Cod&apos;s
                  scenic paths.
                </li>
                <li>
                  Make restaurant reservations in advance, especially during
                  peak season.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
