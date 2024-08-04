import { NextResponse } from "next/server";
import OpenAI from "openai";
import { promises as fs } from "fs";
import path from "path";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// Helper function to format list items with more detail
const formatList = (items) => {
    if (!items || !Array.isArray(items)) return "No items available";
    return items
      .map((item) => {
        const name = item.name || item.title || item.id || "Unnamed";
        const description = item.description || item.type || "No description available";
        const website = item.website ? `\n   Website: ${item.website}` : "";
        return `• ${name}:\n   ${description}${website}\n`;
      })
      .join("\n");
  };
  

// Helper function to generate town overview
const generateTownOverview = async (town) => {
  const townName = typeof town === "string" ? town : town.name || "Unknown";
  const townLower = townName.toLowerCase();

  const dataFiles = [
    { name: "info", defaultValue: {} },
    { name: "activities", defaultValue: { activities: [] } },
    { name: "beaches", defaultValue: { beaches: [] } },
    { name: "food-and-drink", defaultValue: { food_and_drink: [] } },
  ];

  try {
    const data = await Promise.all(
      dataFiles.map(async (file) => {
        const filePath = path.join(
          process.cwd(),
          "public",
          "data",
          "towns",
          townLower,
          `${file.name}.json`
        );
        return fs
          .readFile(filePath, "utf-8")
          .then(JSON.parse)
          .catch(() => file.defaultValue);
      })
    );

    const [townInfo, townActivities, townBeaches, townFoodDrink] = data;

    console.log(`Data for ${townName}:`, {
      townInfo,
      townActivities,
      townBeaches,
      townFoodDrink,
    });

    return `
TOWN: ${townInfo.name || townName}
${townInfo.description || ""}

KEY INFORMATION:
• Population: ${townInfo.population || "N/A"}
• Area: ${townInfo.area_sq_km || "N/A"} sq km
• Notable Villages: ${townInfo.villages ? townInfo.villages.join(", ") : "N/A"}

TRANSPORTATION:
${
  townInfo.transportation
    ? Object.entries(townInfo.transportation)
        .map(
          ([key, value]) =>
            `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${
              Array.isArray(value)
                ? value.map((v) => v.name || v).join(", ")
                : value.name || value
            }`
        )
        .join("\n")
    : "N/A"
}

AVAILABLE ACTIVITIES:
${formatList(townActivities.activities)}

BEACHES:
${formatList(townBeaches.beaches)}

NOTABLE FOOD AND DRINK:
${formatList(townFoodDrink.food_and_drink)}

TOURIST INFORMATION:
• Visitor Center: ${townInfo.tourist_information?.visitor_center?.name || "N/A"}
• Best Time to Visit: ${townInfo.tourist_information?.best_time_to_visit || "N/A"}
• Popular Events: ${
      townInfo.tourist_information?.popular_events
        ? townInfo.tourist_information.popular_events
            .map((event) => `${event.name} (${event.month})`)
            .join(", ")
        : "N/A"
    }

EMERGENCY SERVICES:
• Police: ${townInfo.emergency_services?.police || "N/A"}
• Hospital: ${townInfo.emergency_services?.hospital?.name || "N/A"}

CLIMATE:
• Summer Average High: ${townInfo.climate?.summer_avg_high_celsius || "N/A"}°C
• Winter Average Low: ${townInfo.climate?.winter_avg_low_celsius || "N/A"}°C
    `;
  } catch (error) {
    console.error(`Error processing data for ${townName}:`, error);
    return `Error processing data for ${townName}`;
  }
};

// Main function to generate the prompt
async function generatePrompt(startDate, endDate, preferences, activities, towns) {
    const townsOverview = await Promise.all(towns.map(generateTownOverview));
  
    return `
  Create a detailed and engaging itinerary for a Cape Cod vacation with the following parameters:
  
  Dates: ${startDate} to ${endDate}
  Preferences: ${preferences.join(", ")}
  Desired Activities: ${activities.join(", ")}
  
  Towns to Visit:
  ${townsOverview.join("\n\n")}
  
  Please provide a day-by-day itinerary that includes:
  1. A balanced mix of activities based on the user's preferences and the towns' offerings
  2. Specific attractions, beaches, or locations to visit each day
  3. Dining recommendations, including local specialties and notable food/drink establishments
  4. Insider tips or local insights to enhance the experience
  5. Suggested timings for activities to help with planning
  6. A logical order for visiting the selected towns
  7. Recommendations for transportation options within and between towns
  
  Format the itinerary as follows:
  • Use "DAY X: [THEME FOR THE DAY]" as headers for each day, in ALL CAPS
  • Separate each day with a line of dashes (-------------------)
  • For each activity or recommendation:
    - Use a bullet point (•)
    - Provide the name of the activity or place in bold
    - Include a detailed description (2-3 sentences) explaining why it's interesting, what to expect, or any special features
    - If applicable, include practical information like operating hours, costs, or reservation requirements
    - Include website links when available
  • Separate each activity within a day with a blank line
  
  Remember to:
  • Tailor the itinerary to the specified preferences and activities
  • Balance popular attractions with hidden gems
  • Consider the time of year and any seasonal activities or events
  • Incorporate downtime and flexibility into the schedule
  • Plan efficient routes between the selected towns
  • Include recommendations for using local transportation options
  • Provide website links for easy access to more information about recommended places
  
  Create an itinerary that captures the essence of Cape Cod and provides a memorable experience for the visitors, taking into account the unique characteristics and offerings of each selected town. Focus on providing rich, detailed descriptions that give the reader a clear sense of what to expect and why each recommendation is worthwhile.
  `;
  }
  
  // API route handler
  export async function POST(request) {
    try {
      const { startDate, endDate, preferences, activities, towns } = await request.json();
  
      const prompt = await generatePrompt(startDate, endDate, preferences, activities, towns);
  
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an expert travel planner specializing in Cape Cod vacations. Your task is to create detailed, engaging, and personalized itineraries based on the provided information. Format your response in plain text, using ALL CAPS for day headers, bullet points (•) for list items, and detailed descriptions for each recommendation. Separate days with dashed lines and activities with blank lines. Make the output easy to read, informative, and professional-looking.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,  // Increased to allow for more detailed descriptions
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0.2,
      });
  
      const itinerary = response.choices[0].message.content.trim();
  
      return NextResponse.json({ itinerary });
    } catch (error) {
      console.error("Error generating itinerary:", error);
      return NextResponse.json(
        { message: "Error generating itinerary" },
        { status: 500 }
      );
    }
  }
