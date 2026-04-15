"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { createLead } from "../lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const stats = [
  { value: "12+", label: "лет на рынке", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: "500+", label: "объектов", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { value: "24ч", label: "срочная отгрузка", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { value: "ГОСТ", label: "сертификаты", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }
];

const categories = [
  { name: "Бетонные кольца", text: "Для колодцев, септиков и инженерных сетей", icon: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "bg-blue-50 text-blue-600" },
  { name: "Крышки и днища", text: "Надежные элементы перекрытия и основания", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z", color: "bg-emerald-50 text-emerald-600" },
  { name: "ФБС блоки", text: "Быстрый монтаж фундамента и стен подвала", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", color: "bg-amber-50 text-amber-600" },
  { name: "ЖБ столбы", text: "Для ограждений, освещения и инфраструктуры", icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8", color: "bg-purple-50 text-purple-600" }
];

const advantages = [
  { title: "Собственное производство", text: "Полный цикл от арматурных каркасов до готовых изделий. Контроль качества на каждом этапе." },
  { title: "Доставка на объект", text: "Собственный автопарк манипуляторов и бортовых машин. Доставим в день заказа." },
  { title: "Гибкие цены для опта", text: "Индивидуальные условия для подрядчиков и застройщиков. Скидки от объема." }
];

export default function HomePage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-graphite overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-graphite via-graphite-light to-graphite" />
        <div className="container-width relative z-10 py-20 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  Производство работает
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mt-6 text-4xl font-extrabold leading-[1.1] text-white md:text-6xl"
              >
                Железобетон
                <br />
                <span className="text-accent">от производителя</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-5 max-w-lg text-base leading-relaxed text-gray-400 md:text-lg"
              >
                Кольца, крышки, ФБС блоки и столбы. Стабильная геометрия,
                армирование по ГОСТ, доставка на объект.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link href="/catalog" className="btn-primary">
                  Смотреть каталог
                </Link>
                <a href="#lead-form" className="btn-outline">
                  Получить расчет
                </a>
              </motion.div>
            </div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 gap-3"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                  <p className="mt-3 text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-width py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Продукция</p>
          <h2 className="mt-2 section-title">Каталог ЖБИ</h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((item) => (
            <motion.div key={item.name} variants={fadeUp} transition={{ duration: 0.5 }}>
              <Link href="/catalog" className="group card flex flex-col items-start gap-4 hover:-translate-y-1">
                <div className={`rounded-xl p-3 ${item.color}`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-accent transition-colors">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.text}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Advantages */}
      <section className="bg-gray-50 py-20">
        <div className="container-width">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ duration: 0.5 }}>
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Преимущества</p>
            <h2 className="mt-2 section-title">Почему выбирают нас</h2>
          </motion.div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {advantages.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent font-extrabold text-lg">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="container-width py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Опыт</p>
          <h2 className="mt-2 section-title">Реализованные объекты</h2>
        </motion.div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { title: "Коттеджный поселок", desc: "Поставка колец, крышек и блоков ФБС для 48 домов. Полное обеспечение фундаментов и инженерных сетей.", tag: "Жилое строительство" },
            { title: "Промышленный склад", desc: "ФБС блоки для фундамента складского комплекса 3200 м\u00B2. Отгрузка за 5 дней.", tag: "Промышленность" },
            { title: "Инженерные сети ЖК", desc: "Бетонные кольца и днища для канализации и дренажа жилого комплекса на 12 корпусов.", tag: "Инфраструктура" }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group card"
            >
              <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{item.tag}</span>
              <h3 className="mt-3 text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lead form */}
      <section id="lead-form" className="bg-graphite py-20">
        <div className="container-width">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-extrabold text-white md:text-4xl">Получите расчет стоимости</h2>
              <p className="mt-3 text-gray-400">Оставьте заявку и менеджер свяжется с вами в течение 30 минут в рабочее время</p>
            </motion.div>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-7 w-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="mt-4 text-lg font-bold text-white">Заявка отправлена!</p>
                <p className="mt-1 text-sm text-gray-400">Мы свяжемся с вами в ближайшее время</p>
                <button onClick={() => setSent(false)} className="mt-4 text-sm font-medium text-accent hover:underline">Отправить ещё</button>
              </motion.div>
            ) : (
              <form
                className="mt-8 grid gap-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  try {
                    setSending(true);
                    await createLead({ name: String(fd.get("name")), phone: String(fd.get("phone")), message: String(fd.get("message")) });
                    e.currentTarget.reset();
                    setSent(true);
                  } finally {
                    setSending(false);
                  }
                }}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                    name="name" placeholder="Ваше имя" required
                  />
                  <input
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                    name="phone" placeholder="Телефон" required
                  />
                </div>
                <textarea
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                  name="message" placeholder="Опишите что вам нужно (тип изделий, количество, сроки)" rows={4}
                />
                <button disabled={sending} className="btn-primary w-full !py-4 !text-base disabled:opacity-60" type="submit">
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Отправляем...
                    </span>
                  ) : "Отправить заявку"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
