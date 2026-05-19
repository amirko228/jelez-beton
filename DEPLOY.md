# Деплой на VPS (Ubuntu/Debian)

Нужен сервер с **Docker** и **Docker Compose**. Минимум: 2 GB RAM, 20 GB диск.

## 1. Подключиться к серверу

```bash
ssh root@ВАШ_IP
```

## 2. Установить Docker (если ещё нет)

```bash
apt update && apt install -y git docker.io docker-compose-v2
systemctl enable --now docker
```

## 3. Склонировать проект

```bash
cd /opt
git clone https://github.com/amirko228/jelez-beton.git
cd jelez-beton
```

## 4. Настроить `.env`

```bash
cp .env.production.example .env
nano .env
```

Обязательно замените:

- `POSTGRES_PASSWORD` и тот же пароль в `DATABASE_URL`
- `JWT_SECRET` — случайная строка
- `ВАШ_ДОМЕН_ИЛИ_IP` — домен или IP сервера, например `http://185.12.34.56` или `https://jelez-beton.ru`

> `NEXT_PUBLIC_API_URL` попадает в сборку фронта. После смены домена нужен пересбор: `docker compose ... up -d --build`.

## 5. Запустить

**Локально / тест (порт 8080):**

```bash
docker compose up -d --build
```

**Продакшен (порт 80, БД снаружи не торчит):**

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Первый запуск 5–15 минут (сборка образов + миграции + seed).

## 6. Проверить

- Сайт: `http://ВАШ_IP/`
- API: `http://ВАШ_IP/api/products`
- Админка: `http://ВАШ_IP/admin`
- Логин: `admin@jelez-beton.ru` / `admin12345` — **сразу смените пароль в проде**

```bash
docker compose logs -f
```

## 7. HTTPS (Let's Encrypt)

Проще всего — [Caddy](https://caddyserver.com/) или certbot перед nginx. Либо вынести SSL на Cloudflare (прокси + Flexible SSL).

После HTTPS обновите `.env`:

```env
CLIENT_URL=https://ваш-домен.ru
ADMIN_URL=https://ваш-домен.ru/admin
NEXT_PUBLIC_API_URL=https://ваш-домен.ru/api
```

И пересоберите:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

## Обновление версии

```bash
cd /opt/jelez-beton
git pull
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

## Файрвол

```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

## Загрузка с Windows без git на сервере

С ПК (PowerShell), если проект только локально:

```powershell
scp -r "C:\Users\user\OneDrive\Desktop\jelez beton" root@ВАШ_IP:/opt/jelez-beton
```

На сервере затем шаги 4–5.
