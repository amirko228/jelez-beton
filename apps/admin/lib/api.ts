function getApiUrl() {
  // В браузере всегда тот же домен, что и админка → /api через nginx (без localhost в проде).
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api`;
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
}

async function safeJson<T>(res: Response, fallback: T): Promise<T> {
  if (!res.ok) return fallback;
  try {
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function login(email: string, password: string) {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return response.json();
}

export async function getLeads(token: string) {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/leads`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store"
  });
  return safeJson<any[]>(response, []);
}

export async function getProducts() {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/products`, { cache: "no-store" });
  return safeJson<any[]>(response, []);
}

export async function getCategories() {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/categories`, { cache: "no-store" });
  return safeJson<any[]>(response, []);
}

export async function createCategory(token: string, payload: { name: string; slug: string; description?: string }) {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  return response.json();
}

export async function deleteCategory(token: string, id: string) {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return safeJson<unknown>(response, null);
}

export async function createProduct(
  token: string,
  payload: { title: string; slug: string; description: string; price: string; categoryId: string; specs: string; isPublished: boolean }
) {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  return response.json();
}

export async function deleteProduct(token: string, id: string) {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return safeJson<unknown>(response, null);
}
