import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { beachId } = params;
  const filePath = path.join(process.cwd(), 'public', 'data', 'beaches.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  const beach = data.find(b => b.id === beachId);
  
  if (!beach) {
    return NextResponse.json({ error: 'Beach not found' }, { status: 404 });
  }
  
  return NextResponse.json(beach);
}