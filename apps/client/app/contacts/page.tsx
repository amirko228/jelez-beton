export default function ContactsPage() {
  const contacts = [
    {
      icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
      label: "Отдел продаж",
      value: "+996 500 070-908",
      sub: "Пн-Сб: 08:00 - 20:00",
      href: "tel:+996500070908"
    },
    {
      icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
      label: "Электронная почта",
      value: "info@jelez-beton.ru",
      sub: "Ответим в течение 2 часов",
      href: "mailto:info@jelez-beton.ru"
    },
    {
      icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
      label: "Производство и склад",
      value: "г. Промышленный, ул. Заводская, 7",
      sub: "Самовывоз по согласованию",
      href: undefined
    }
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-graphite">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite to-graphite-light" />
        <div className="container-width relative z-10 py-16 md:py-20">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Контакты</p>
          <h1 className="mt-2 text-4xl font-extrabold text-white md:text-5xl">Свяжитесь с нами</h1>
          <p className="mt-4 max-w-xl text-base text-gray-400">
            Получите коммерческое предложение, расчет стоимости и график поставки.
          </p>
        </div>
      </section>

      <section className="container-width py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact cards */}
          <div className="space-y-4">
            {contacts.map((item) => {
              const content = (
                <div className="card flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{item.label}</p>
                    <p className="mt-1 text-base font-bold text-gray-900">{item.value}</p>
                    <p className="mt-0.5 text-sm text-gray-500">{item.sub}</p>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}

            {/* Info box */}
            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
              <p className="text-sm font-bold text-accent">Для оптовых покупателей</p>
              <p className="mt-1 text-sm text-gray-600">
                Для подрядчиков и оптовых клиентов действует отдельная ценовая сетка и возможность рассрочки.
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <iframe
              title="Карта"
              className="h-full min-h-[420px] w-full"
              src="https://www.openstreetmap.org/export/embed.html?bbox=37.6%2C55.7%2C37.7%2C55.8&layer=mapnik"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
