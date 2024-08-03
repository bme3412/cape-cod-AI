import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { startDate, endDate, preferences, activities, accommodation } = await request.json();

    const prompt = generatePrompt(startDate, endDate, preferences, activities, accommodation);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            }
          ]
        },
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: "The itinerary will be generated based on the provided details."
            }
          ]
        }
      ],
      temperature: 1,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const itinerary = response.choices[0].message.content.trim();

    return NextResponse.json({ itinerary });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json({ message: 'Error generating itinerary' }, { status: 500 });
  }
}

function generatePrompt(startDate, endDate, preferences, activities, accommodation) {
  return `
Generate a detailed itinerary for a Cape Cod vacation with the following parameters:

Dates: ${startDate} to ${endDate}
Preferences: ${preferences.join(', ')}
Desired Activities: ${activities.join(', ')}
Accommodation Type: ${accommodation}

Please provide a day-by-day breakdown of activities, including:
1. Suggested locations to visit
2. Specific activities or attractions for each day
3. Dining recommendations
4. Any tips or local insights

Format the itinerary in a clear, easy-to-read structure.
`;
}
