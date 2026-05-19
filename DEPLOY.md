# Деплой на VPS (Ubuntu/Debian)

Нужен сервер с **Docker** и **Docker Compose**. Минимум: 2 GB RAM, 20 GB диск.

## Сайт для всех пользователей интернета (Timeweb Firewall)

Сейчас у тебя правила вида «только с IP `95.87.72.235`» — **сайт сможешь открыть только ты**. Остальные получат обрыв / таймаут.

Сделай **дополнительно** (группа **Diligent Plover** → **Правила** → **+ Добавить**, входящий трафик):

| Подсеть / режим | Протокол | Порт | Назначение |
|-----------------|----------|------|------------|
| **`0.0.0.0/0`** или «для всех адресов» | TCP | **80** | HTTP для всех |
| **`0.0.0.0/0`** или «для всех адресов» | TCP | **443** | HTTPS для всех |

**SSH (22)** можно оставить **только с `95.87.72.235`** — так безопаснее. Для деплоя с твоего ПК этого достаточно.

Если нужно, чтобы **агент/скрипт с другой машины** подключался по SSH — временно добавь правило **TCP 22** с **`0.0.0.0/0`**, задеплой, потом удали это правило.

Итого минимум **5 входящих правил**: три «с твоего IP» (если хочешь оставить) **или** заменить 80/443 на «для всех» как в таблице выше; плюс обязательно **80 и 443 для `0.0.0.0/0`**.

## Timeweb: открыть порты (обязательно)

Если SSH «висит» или не подключается:

1. **Сети → Firewall** (или Firewall в меню слева)
2. Создай группу правил → **Разрешить входящий** трафик:
   - TCP **22** (SSH)
   - TCP **80** (сайт)
   - TCP **443** (HTTPS, позже)
3. **Привяжи группу к серверу** Fair Crossbill

Без этого с интернета сервер недоступен.

### Важно: поле «Подсеть или адрес»

Если указан только **IP этого компьютера** (`…/32`), SSH и сайт будут доступны **только с того же интернета** (той же квартиры/офиса). С другого IP подключиться нельзя.

Чтобы открыть **всем** (проще для деплоя и для посетителей сайта):

- для портов **80** и **443** добавь правило с подсетью **`0.0.0.0/0`** (если панель разрешает), **или** вкладка **«Для всех адресов»**;
- для **22** можно оставить только свой IP (безопаснее) или временно `0.0.0.0/0`, потом сузить.

### Деплой с твоего ПК (если SSH с другой машины не нужен)

В корне репозитория:

```powershell
cd "C:\Users\user\OneDrive\Desktop\jelez beton"
.\scripts\deploy-from-your-pc.ps1
```

Нужны **Python** и пакет **paramiko** (`pip install paramiko`). Скрипт подключается к VPS и выполняет тот же bootstrap, что и команда в консоли Timeweb.

## DNS для jbi.com.kg

| Тип | Хост | Значение |
|-----|------|----------|
| A | `@` | IPv4 сервера (например `186.246.1.187`) |
| AAAA | `@` | `2a03:6f00:a::2:a0b` |
| A / AAAA | `www` | те же адреса |

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
