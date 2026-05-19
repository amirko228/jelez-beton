#!/bin/bash
# Запустить на сервере: bash <(curl -fsSL https://raw.githubusercontent.com/amirko228/jelez-beton/main/scripts/server-bootstrap.sh)
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

DOMAIN="${DOMAIN:-jbi.com.kg}"
APP_DIR="/opt/jelez-beton"
REPO="https://github.com/amirko228/jelez-beton.git"

DB_PASS="$(openssl rand -base64 24 | tr -d '/+=' | head -c 32)"
JWT_SECRET="$(openssl rand -base64 32 | tr -d '/+=' | head -c 48)"

if ! command -v docker >/dev/null 2>&1; then
  apt-get update -qq
  apt-get install -y -qq ca-certificates curl git openssl
  curl -fsSL https://get.docker.com | sh
  systemctl enable --now docker
fi

mkdir -p /opt
if [ ! -d "$APP_DIR/.git" ]; then
  rm -rf "$APP_DIR"
  git clone "$REPO" "$APP_DIR"
else
  git -C "$APP_DIR" pull --ff-only
fi

cd "$APP_DIR"
cat > .env <<EOF
POSTGRES_DB=jelez_beton
POSTGRES_USER=jelez
POSTGRES_PASSWORD=${DB_PASS}
DATABASE_URL=postgresql://jelez:${DB_PASS}@db:5432/jelez_beton?schema=public
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=1d
CLIENT_URL=http://${DOMAIN}
ADMIN_URL=http://${DOMAIN}/admin
NEXT_PUBLIC_API_URL=http://${DOMAIN}/api
EOF

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

echo ""
echo "=== Готово ==="
echo "Сайт:    http://${DOMAIN}/"
echo "Админка: http://${DOMAIN}/admin"
echo "Логин:   admin@jelez-beton.ru / admin12345"
echo ""
echo "Проверка API:"
curl -s "http://127.0.0.1/api/products" | head -c 200 || true
echo ""
