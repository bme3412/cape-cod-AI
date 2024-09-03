import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { townName } = params;
  try {
    const dataDirectory = path.join(process.cwd(), 'public', 'data', 'towns', townName);
    
    const [info, activities, beaches, foodAndDrink] = await Promise.all([
      fs.readFile(path.join(dataDirectory, 'info.json'), 'utf8').then(JSON.parse),
      fs.readFile(path.join(dataDirectory, 'activities.json'), 'utf8').then(JSON.parse),
      fs.readFile(path.join(dataDirectory, 'beaches.json'), 'utf8').then(JSON.parse),
      fs.readFile(path.join(dataDirectory, 'food-and-drink.json'), 'utf8').then(JSON.parse)
    ]);

    const townData = {
      ...info,
      activities: activities.activities,
      beaches,
      food_and_drink: foodAndDrink.food_and_drink
    };

    return new Response(JSON.stringify(townData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading town data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch town data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}