import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { establishmentId } = params;
  const filePath = path.join(process.cwd(), 'public', 'data', 'food-and-drink.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  const establishment = data.find(e => e.id === establishmentId);
  
  if (!establishment) {
    return NextResponse.json({ error: 'Establishment not found' }, { status: 404 });
  }
  
  return NextResponse.json(establishment);
}