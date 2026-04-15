import Link from "next/link";
import { getProducts } from "../../lib/api";

export default async function CatalogPage() {
  const products = await getProducts().catch(() => []);

  return (
    <main>
      {/* Header banner */}
      <section className="relative overflow-hidden bg-graphite">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite to-graphite-light" />
        <div className="container-width relative z-10 py-16 md:py-20">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Каталог</p>
          <h1 className="mt-2 text-4xl font-extrabold text-white md:text-5xl">Продукция ЖБИ</h1>
          <p className="mt-4 max-w-xl text-base text-gray-400">
            Подберите нужный тип изделий для вашего проекта. Для оптовых заказов подготовим персональное предложение.
          </p>
        </div>
      </section>

      <section className="container-width py-12">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <h3 className="mt-3 text-lg font-bold text-amber-900">Каталог загружается</h3>
            <p className="mt-1 text-sm text-amber-700">Убедитесь, что сервер API запущен, или обновите страницу.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product: any) => (
              <Link
                href={`/catalog/${product.slug}`}
                key={product.id}
                className="group card hover:-translate-y-1"
              >
                {/* Category badge */}
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {product.category?.name || "ЖБИ"}
                  </span>
                </div>

                {/* Title & description */}
                <h2 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-accent transition-colors">
                  {product.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500 line-clamp-2">
                  {product.description}
                </p>

                {/* Price & link */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <p className="text-xl font-extrabold text-accent">{product.price} &#8381;</p>
                  <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 transition group-hover:text-accent">
                    Подробнее
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
