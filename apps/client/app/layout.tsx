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
                  <a href="tel:+79001234567" className="text-sm font-semibold text-gray-900 hover:text-accent transition-colors">+7 (900) 123-45-67</a>
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
