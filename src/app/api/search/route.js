import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const category = searchParams.get('category');

  const categories = ['towns', 'beaches', 'attractions', 'food-and-drink'];
  let results = [];

  for (const cat of categories) {
    if (!category || category === cat) {
      const filePath = path.join(process.cwd(), 'public', 'data', `${cat}.json`);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContents);
      
      const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      
      results = [...results, ...filteredData.map(item => ({ ...item, category: cat }))];
    }
  }

  return NextResponse.json(results);
}