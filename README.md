# JELEZ BETON Platform

Production-ready monorepo для сайта производителя ЖБИ:
- клиентский сайт (лидогенерация + каталог)
- backend API (NestJS + Prisma + JWT)
- админ-панель (управление заявками/товарами)
- PostgreSQL + Docker + Nginx

## Структура

```text
/apps
  /client   # Next.js сайт
  /admin    # Next.js админка
  /server   # NestJS API
/packages
  /ui
  /types
  /config
/infra
  /nginx
```

## Быстрый старт

1. Скопируйте `.env.example` в `.env`
2. Запустите:

```bash
docker compose up --build
```

3. Доступ:
- Сайт: `http://localhost:8080`
- API: `http://localhost:8080/api`
- Админка: `http://localhost:8080/admin`

## Seed и доступ в админку

- Email: `admin@jelez-beton.ru`
- Password: `admin12345`

## API примеры

### Логин администратора

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@jelez-beton.ru",
  "password": "admin12345"
}
```

### Получение каталога

```http
GET /api/products
```

### Отправка заявки

```http
POST /api/leads
Content-Type: application/json

{
  "name": "Иван",
  "phone": "+79001234567",
  "message": "Нужны 20 колец КС 10-9"
}
```

### Получение заявок (admin)

```http
GET /api/leads
Authorization: Bearer <jwt>
```

## Деплой на сервер

Пошаговая инструкция: [DEPLOY.md](./DEPLOY.md)

Кратко на VPS:

```bash
git clone https://github.com/amirko228/jelez-beton.git
cd jelez-beton
cp .env.production.example .env   # отредактировать под домен/IP
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

## SEO и производительность

- Next.js App Router + `metadata`
- Серверные страницы для каталога
- Легкий UI и mobile-first сетка
- Nginx reverse proxy для единых публичных маршрутов
