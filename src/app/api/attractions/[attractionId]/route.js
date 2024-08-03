import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { attractionId } = params;
  const filePath = path.join(process.cwd(), 'public', 'data', 'attractions.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  const attraction = data.find(a => a.id === attractionId);
  
  if (!attraction) {
    return NextResponse.json({ error: 'Attraction not found' }, { status: 404 });
  }
  
  return NextResponse.json(attraction);
}