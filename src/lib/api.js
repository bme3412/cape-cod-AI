export async function getTowns() {
  const res = await fetch('/api/towns');
  if (!res.ok) throw new Error('Failed to fetch towns');
  return res.json();
}

export async function getTown(townName) {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const url = new URL(`/api/towns/${townName}`, baseUrl);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Failed to fetch town: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching town:', error);
    throw error;
  }
}

export async function getBeaches() {
  const res = await fetch('/api/beaches');
  if (!res.ok) throw new Error('Failed to fetch beaches');
  return res.json();
}

export async function getBeach(id) {
  const res = await fetch(`/api/beaches/${id}`);
  if (!res.ok) throw new Error('Failed to fetch beach');
  return res.json();
}

// ... similar functions for attractions and food-and-drink ...

export async function search(query, category = '') {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error('Failed to perform search');
  return res.json();
}