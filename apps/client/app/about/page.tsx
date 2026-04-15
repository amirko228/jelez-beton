export default function AboutPage() {
  const stats = [
    { value: "12+", label: "лет опыта", desc: "в производстве железобетонных изделий" },
    { value: "500+", label: "объектов", desc: "обеспечены нашей продукцией" },
    { value: "50+", label: "единиц техники", desc: "в собственном автопарке" },
    { value: "100%", label: "по ГОСТ", desc: "сертифицированное производство" }
  ];

  const process = [
    { step: "01", title: "Арматурные каркасы", text: "Подготовка и контроль прочности арматурных каркасов по проектным параметрам." },
    { step: "02", title: "Формовка изделий", text: "Производство на вибростолах и в виброформах с точным соблюдением геометрии." },
    { step: "03", title: "Набор прочности", text: "Выдержка изделий в камерах пропаривания и естественный набор прочности." },
    { step: "04", title: "Контроль и отгрузка", text: "Проверка геометрии, маркировка и подготовка к отгрузке на объект." }
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-graphite">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite to-graphite-light" />
        <div className="container-width relative z-10 py-16 md:py-24">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">О компании</p>
          <h1 className="mt-2 text-4xl font-extrabold text-white md:text-5xl">
            Производим ЖБИ<br />
            <span className="text-gray-400">с контролем на каждом этапе</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-400">
            ЖелезБетон — производственная компания полного цикла. Выпускаем железобетонные изделия для частного,
            коммерческого и инфраструктурного строительства.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container-width -mt-8 relative z-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="card text-center">
              <p className="text-3xl font-extrabold text-accent">{item.value}</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{item.label}</p>
              <p className="mt-0.5 text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-width py-20">
        <p className="text-sm font-bold uppercase tracking-wider text-accent">Процесс</p>
        <h2 className="mt-2 section-title">Как устроено производство</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {process.map((item) => (
            <div key={item.step} className="card flex gap-5">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-lg font-extrabold text-accent">
                {item.step}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-gray-50 py-20">
        <div className="container-width">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Гарантии</p>
          <h2 className="mt-2 section-title">Почему нас выбирают</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              { title: "Прозрачная стоимость", text: "Фиксированные цены без скрытых платежей и дополнительных наценок." },
              { title: "Полное сопровождение", text: "От заявки до выгрузки на объекте — менеджер на связи на каждом этапе." },
              { title: "Партнерские условия", text: "Скидки для подрядчиков и оптовых клиентов. Рассрочка для постоянных партнеров." },
              { title: "Техническая консультация", text: "Поможем подобрать нужный тип и размер ЖБИ для вашего проекта." }
            ].map((item) => (
              <div key={item.title} className="card flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-width py-20 text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">Готовы обсудить ваш проект?</h2>
        <p className="mt-2 text-gray-500">Оставьте заявку и мы подготовим коммерческое предложение</p>
        <a href="/#lead-form" className="btn-primary mt-6 inline-flex">Оставить заявку</a>
      </section>
    </main>
  );
}
