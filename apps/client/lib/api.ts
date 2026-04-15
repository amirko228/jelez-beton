import type { LeadPayload, Product } from "@jelez/types";

function getApiUrl() {
  // In Docker SSR, localhost points to the container itself.
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || "http://localhost:4000/api";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
}

export async function getProducts(category?: string): Promise<Product[]> {
  const API_URL = getApiUrl();
  const url = new URL(`${API_URL}/products`);
  if (category) url.searchParams.set("category", category);
  const response = await fetch(url.toString(), { cache: "no-store" });
  if (!response.ok) throw new Error("Не удалось загрузить каталог");
  return response.json();
}

export async function getProduct(slug: string): Promise<Product> {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/products/${slug}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Не удалось загрузить товар");
  return response.json();
}

export async function createLead(payload: LeadPayload) {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Не удалось отправить заявку");
  return response.json();
}
