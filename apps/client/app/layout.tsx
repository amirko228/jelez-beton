import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ЖелезБетон — ЖБИ изделия от производителя",
  description: "Производство и продажа бетонных колец, крышек, ФБС блоков и столбов. Доставка по региону."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
          <div className="container-width flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white font-black text-sm">
                ЖБ
              </div>
              <span className="text-lg font-extrabold tracking-tight text-gray-900">
                ЖелезБетон
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {[
                { href: "/catalog", label: "Каталог" },
                { href: "/about", label: "О компании" },
                { href: "/contacts", label: "Контакты" }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/#lead-form" className="ml-3 btn-primary !py-2.5 !px-5 !text-xs">
                Оставить заявку
              </Link>
            </nav>
            {/* Mobile nav */}
            <nav className="flex md:hidden items-center gap-2">
              <Link href="/catalog" className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-600">Каталог</Link>
              <Link href="/#lead-form" className="btn-primary !py-2 !px-4 !text-xs">Заявка</Link>
            </nav>
          </div>
        </header>

        {children}

        {/* Floating WhatsApp button */}
        <a
          href="https://wa.me/996500070908?text=Здравствуйте!%20Интересует%20продукция%20ЖелезБетон"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-110 active:scale-95"
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
        </a>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-gray-50">
          <div className="container-width py-12">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white font-black text-sm">
                    ЖБ
                  </div>
                  <span className="text-lg font-extrabold tracking-tight text-gray-900">ЖелезБетон</span>
                </div>
                <p className="mt-3 max-w-sm text-sm text-gray-500">
                  Производство железобетонных изделий для строительства. Доставка по региону собственным автопарком.
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Навигация</p>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/catalog" className="text-sm text-gray-600 hover:text-accent transition-colors">Каталог</Link>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-accent transition-colors">О компании</Link>
                  <Link href="/contacts" className="text-sm text-gray-600 hover:text-accent transition-colors">Контакты</Link>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Контакты</p>
                <div className="mt-3 flex flex-col gap-2">
                  <a href="tel:+996500070908" className="text-sm font-semibold text-gray-900 hover:text-accent transition-colors">+996 500 070-908</a>
                  <p className="text-sm text-gray-500">info@jelez-beton.ru</p>
                  <p className="text-sm text-gray-500">Пн-Сб: 08:00 - 20:00</p>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
              &copy; {new Date().getFullYear()} ЖелезБетон. Все права защищены.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
