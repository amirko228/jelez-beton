#!/bin/bash
# На сервере (если raw.githubusercontent.com недоступен — используй jsDelivr):
#   bash <(curl -fsSL https://cdn.jsdelivr.net/gh/amirko228/jelez-beton@main/scripts/server-bootstrap.sh)
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

DOMAIN="${DOMAIN:-jbi.com.kg}"
APP_DIR="/opt/jelez-beton"
REPO_PRIMARY="https://github.com/amirko228/jelez-beton.git"

DB_PASS="$(openssl rand -base64 24 | tr -d '/+=' | head -c 32)"
JWT_SECRET="$(openssl rand -base64 32 | tr -d '/+=' | head -c 48)"

if ! command -v docker >/dev/null 2>&1; then
  echo ">>> apt update (может занять несколько минут)..."
  apt-get update -qq
  echo ">>> установка curl, git, openssl, Docker из репозитория Ubuntu..."
  apt-get install -y -qq ca-certificates curl git openssl docker.io docker-compose-v2
  systemctl enable --now docker
  echo ">>> Docker готов"
fi

clone_repo() {
  rm -rf "$APP_DIR"
  mkdir -p /opt
  local urls=(
    "$REPO_PRIMARY"
    "https://mirror.ghproxy.com/https://github.com/amirko228/jelez-beton.git"
    "https://ghproxy.net/https://github.com/amirko228/jelez-beton.git"
  )
  local url
  for url in "${urls[@]}"; do
    echo ">>> git clone: $url"
    if git clone --depth 1 "$url" "$APP_DIR" 2>&1; then
      return 0
    fi
    rm -rf "$APP_DIR"
  done
  echo "Ошибка: не удалось git clone ни с одного зеркала." >&2
  return 1
}

if [ ! -d "$APP_DIR/.git" ]; then
  echo ">>> клонирование репозитория..."
  clone_repo
else
  echo ">>> git pull..."
  git -C "$APP_DIR" pull --ff-only || { rm -rf "$APP_DIR" && clone_repo; }
fi

cd "$APP_DIR"
echo ">>> docker compose build + up (10–25 мин, будет много логов)..."
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
