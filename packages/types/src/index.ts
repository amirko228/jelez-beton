export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  imageUrl?: string | null;
  specs: Record<string, string>;
  category: Category;
};

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  productId?: string;
  productName?: string;
};
