"use client";

import { useEffect, useState } from "react";
import { createCategory, createProduct, deleteCategory, deleteProduct, getCategories, getLeads, getProducts, login } from "../lib/api";

type Lead = { id: string; name: string; phone: string; message?: string; status: string; createdAt: string };
type Category = { id: string; name: string; slug: string; description?: string };
type Product = { id: string; title: string; slug: string; price: string; category: { name: string } };

const accent = "#e94560";
const accentDark = "#c81e45";
const graphite = "#1a1a2e";

const inputStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s",
  width: "100%",
  background: "#fff"
};

const btnPrimary: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 10,
  border: "none",
  background: accent,
  color: "#fff",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  transition: "background 0.2s"
};

const btnDanger: React.CSSProperties = {
  padding: "6px 14px",
  borderRadius: 8,
  border: "none",
  background: "#fef2f2",
  color: "#dc2626",
  fontWeight: 600,
  fontSize: 13,
  cursor: "pointer"
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #f1f5f9",
  borderRadius: 16,
  background: "#fff",
  padding: 20,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("admin@jelez-beton.ru");
  const [password, setPassword] = useState("admin12345");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"leads" | "categories" | "products">("leads");
  const [loading, setLoading] = useState(false);

  async function refreshData(currentToken: string) {
    const [leadItems, categoryItems, productItems] = await Promise.all([
      getLeads(currentToken).catch(() => []),
      getCategories().catch(() => []),
      getProducts().catch(() => [])
    ]);
    setLeads(Array.isArray(leadItems) ? leadItems : []);
    setCategories(Array.isArray(categoryItems) ? categoryItems : []);
    setProducts(Array.isArray(productItems) ? productItems : []);
  }

  useEffect(() => {
    const saved = window.localStorage.getItem("admin-token");
    if (!saved) return;
    setToken(saved);
    void refreshData(saved);
  }, []);

  // Автообновление каждые 15 секунд, чтобы новые заявки появлялись сами
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => void refreshData(token), 15000);
    return () => clearInterval(interval);
  }, [token]);

  // Login screen
  if (!token) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: graphite }}>
        <div style={{ ...cardStyle, maxWidth: 400, width: "100%", margin: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 14 }}>
              ЖБ
            </div>
            <span style={{ fontSize: 18, fontWeight: 800 }}>Админ-панель</span>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="admin@jelez-beton.ru" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Пароль</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" style={inputStyle} placeholder="Введите пароль" />
            </div>
            <button
              onClick={async () => {
                setLoading(true);
                try {
                  const data = await login(email, password);
                  if (!data.accessToken) return alert("Ошибка входа");
                  setToken(data.accessToken);
                  window.localStorage.setItem("admin-token", data.accessToken);
                  await refreshData(data.accessToken);
                } catch {
                  alert("Ошибка входа");
                } finally {
                  setLoading(false);
                }
              }}
              style={{ ...btnPrimary, padding: "12px 20px", opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? "Входим..." : "Войти"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "leads" as const, label: "Заявки", count: leads.length, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { key: "categories" as const, label: "Категории", count: categories.length, icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
    { key: "products" as const, label: "Товары", count: products.length, icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: graphite, color: "#fff", padding: "20px 0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "0 20px", display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14 }}>
            ЖБ
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800 }}>ЖелезБетон</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>Админ-панель</div>
          </div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 10px" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                background: activeTab === tab.key ? "rgba(233,69,96,0.15)" : "transparent",
                color: activeTab === tab.key ? "#fff" : "#94a3b8",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                transition: "all 0.15s"
              }}
            >
              <svg style={{ width: 18, height: 18, flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
              </svg>
              {tab.label}
              <span style={{
                marginLeft: "auto",
                fontSize: 11,
                fontWeight: 700,
                background: activeTab === tab.key ? accent : "rgba(148,163,184,0.2)",
                padding: "2px 8px",
                borderRadius: 20,
                color: activeTab === tab.key ? "#fff" : "#94a3b8"
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
        <div style={{ marginTop: "auto", padding: "0 10px" }}>
          <button
            onClick={() => { window.localStorage.removeItem("admin-token"); window.location.reload(); }}
            style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", borderRadius: 10,
              border: "none", background: "rgba(148,163,184,0.1)", color: "#94a3b8", fontWeight: 600, fontSize: 13, cursor: "pointer"
            }}
          >
            <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Выйти
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: 28, overflowY: "auto" }}>
        <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>
              {tabs.find((t) => t.key === activeTab)?.label}
            </h1>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
              {activeTab === "leads" && "Входящие заявки с сайта — обновляются автоматически каждые 15 секунд"}
              {activeTab === "categories" && "Управление категориями продукции"}
              {activeTab === "products" && "Управление товарами каталога"}
            </p>
          </div>
          <button
            onClick={() => void refreshData(token)}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
              border: "1px solid #e2e8f0", background: "#fff", color: "#475569", fontWeight: 600, fontSize: 13, cursor: "pointer", flexShrink: 0
            }}
          >
            <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Обновить
          </button>
        </div>

        {/* LEADS */}
        {activeTab === "leads" && (
          <div style={{ display: "grid", gap: 10 }}>
            {leads.length === 0 ? (
              <div style={{ ...cardStyle, textAlign: "center", padding: 40, color: "#94a3b8" }}>
                <p style={{ fontSize: 14 }}>Заявок пока нет</p>
              </div>
            ) : leads.map((lead) => (
              <div key={lead.id} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 14, padding: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: graphite }}>
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{lead.name}</span>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
                      background: lead.status === "new" ? "#ecfdf5" : "#f1f5f9",
                      color: lead.status === "new" ? "#059669" : "#64748b"
                    }}>
                      {lead.status === "new" ? "Новая" : lead.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
                    {lead.phone}
                    {lead.message && <span> &mdash; {lead.message}</span>}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}>
                  {new Date(lead.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CATEGORIES */}
        {activeTab === "categories" && (
          <div>
            <form
              style={{ ...cardStyle, display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 10, marginBottom: 16, alignItems: "end" }}
              onSubmit={async (e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                await createCategory(token, { name: String(f.get("name")), slug: String(f.get("slug")), description: String(f.get("description") || "") });
                e.currentTarget.reset();
                await refreshData(token);
              }}
            >
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Название</label>
                <input name="name" placeholder="Бетонные кольца" style={inputStyle} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Slug</label>
                <input name="slug" placeholder="betonnye-koltsa" style={inputStyle} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Описание</label>
                <input name="description" placeholder="Описание категории" style={inputStyle} />
              </div>
              <button style={btnPrimary} type="submit">Добавить</button>
            </form>
            <div style={{ display: "grid", gap: 8 }}>
              {categories.map((category) => (
                <div key={category.id} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 12, padding: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg style={{ width: 16, height: 16, color: "#64748b" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{category.name}</span>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{category.slug}</div>
                  </div>
                  <button style={btnDanger} onClick={async () => { await deleteCategory(token, category.id); await refreshData(token); }}>
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab === "products" && (
          <div>
            <form
              style={{ ...cardStyle, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}
              onSubmit={async (e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                await createProduct(token, {
                  title: String(f.get("title")),
                  slug: String(f.get("slug")),
                  description: String(f.get("description")),
                  price: String(f.get("price")),
                  categoryId: String(f.get("categoryId")),
                  specs: JSON.stringify({ size: String(f.get("size") || "Стандарт"), weight: String(f.get("weight") || "n/a") }),
                  isPublished: true
                });
                e.currentTarget.reset();
                await refreshData(token);
              }}
            >
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Название</label>
                <input name="title" placeholder="Кольцо КС 10-9" style={inputStyle} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Slug</label>
                <input name="slug" placeholder="koltso-ks-10-9" style={inputStyle} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Цена</label>
                <input name="price" placeholder="3500" style={inputStyle} required />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Описание</label>
                <input name="description" placeholder="Описание товара" style={inputStyle} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Категория</label>
                <select name="categoryId" style={inputStyle} required>
                  <option value="">Выберите</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Размер</label>
                <input name="size" placeholder="1000x900 мм" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Вес</label>
                <input name="weight" placeholder="600 кг" style={inputStyle} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <button style={{ ...btnPrimary, width: "100%", padding: "12px 20px" }} type="submit">Добавить товар</button>
              </div>
            </form>
            <div style={{ display: "grid", gap: 8 }}>
              {products.map((product) => (
                <div key={product.id} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 12, padding: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg style={{ width: 16, height: 16, color: "#64748b" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{product.title}</span>
                      <span style={{ fontSize: 11, color: "#94a3b8", background: "#f1f5f9", padding: "2px 8px", borderRadius: 20 }}>
                        {product.category?.name}
                      </span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: accent, marginTop: 2 }}>{product.price} &#8381;</div>
                  </div>
                  <button style={btnDanger} onClick={async () => { await deleteProduct(token, product.id); await refreshData(token); }}>
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
