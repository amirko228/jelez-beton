import Link from "next/link";
import { getProduct } from "../../../lib/api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  if (!product) {
    return { title: "Товар недоступен | ЖелезБетон", description: "Товар временно недоступен." };
  }
  return { title: `${product.title} | ЖелезБетон`, description: product.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);

  if (!product) {
    return (
      <main className="container-width py-20 text-center">
        <div className="mx-auto max-w-md">
          <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h2 className="mt-4 text-xl font-bold text-gray-900">Товар не найден</h2>
          <p className="mt-2 text-sm text-gray-500">Возможно, товар был удален или ещё не опубликован.</p>
          <Link href="/catalog" className="btn-primary mt-6 inline-flex">Вернуться в каталог</Link>
        </div>
      </main>
    );
  }

  const specs = product.specs && typeof product.specs === "object" ? Object.entries(product.specs) : [];

  return (
    <main>
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="container-width flex items-center gap-2 py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <Link href="/catalog" className="hover:text-accent transition-colors">Каталог</Link>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span className="text-gray-900 font-medium">{product.title}</span>
        </div>
      </div>

      <div className="container-width py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main content */}
          <div>
            <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {product.category?.name || "ЖБИ"}
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">{product.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600">{product.description}</p>

            {/* Specs */}
            {specs.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-900">Характеристики</h2>
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-100">
                  {specs.map(([key, value], i) => (
                    <div key={key} className={`flex items-center justify-between px-5 py-3.5 text-sm ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                      <span className="font-medium text-gray-500">{key}</span>
                      <span className="font-semibold text-gray-900">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Цена за единицу</p>
              <p className="mt-1 text-3xl font-extrabold text-accent">{product.price} &#8381;</p>
              <div className="mt-5 space-y-3">
                <a href="/#lead-form" className="btn-primary w-full">Заказать</a>
                <a href="tel:+996500070908" className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:border-accent hover:text-accent">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Позвонить
                </a>
              </div>
              <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-5">
                {["Отгрузка от 24 часов", "Доставка на объект", "Оплата по счету"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
