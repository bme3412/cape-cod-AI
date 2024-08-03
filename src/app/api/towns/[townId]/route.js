import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { townId } = params;
  const filePath = path.join(process.cwd(), 'public', 'data', 'towns.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  const town = data.find(t => t.id === townId);
  
  if (!town) {
    return NextResponse.json({ error: 'Town not found' }, { status: 404 });
  }
  
  return NextResponse.json(town);
}