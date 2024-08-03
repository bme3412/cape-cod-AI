export async function getTowns() {
  const res = await fetch('/api/towns');
  if (!res.ok) throw new Error('Failed to fetch towns');
  return res.json();
}

export async function getTown(id) {
  const res = await fetch(`/api/towns/${id}`);
  if (!res.ok) throw new Error('Failed to fetch town');
  return res.json();
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