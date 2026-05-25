#!/bin/bash
# Бесплатный HTTPS на VPS (Let's Encrypt). Cloudflare: DNS only (серое облако), без оранжевого прокси.
set -euo pipefail

DOMAIN="${DOMAIN:-jbi.com.kg}"
EMAIL="${EMAIL:-admin@jelez-beton.ru}"
APP_DIR="${APP_DIR:-/opt/jelez-beton}"

cd "$APP_DIR"
mkdir -p certbot/www certbot/conf

echo ">>> Перезапуск nginx с поддержкой ACME..."
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d nginx

echo ">>> Получение сертификата (1–2 мин)..."
docker run --rm \
  -v "$APP_DIR/certbot/www:/var/www/certbot" \
  -v "$APP_DIR/certbot/conf:/etc/letsencrypt" \
  certbot/certbot certonly --webroot \
  -w /var/www/certbot \
  -d "$DOMAIN" -d "www.$DOMAIN" \
  --email "$EMAIL" --agree-tos --no-eff-email --non-interactive

echo ">>> Включаем HTTPS в nginx..."
cp infra/nginx/nginx.https.conf infra/nginx/nginx.conf

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d nginx

if grep -q "NEXT_PUBLIC_API_URL=http://" .env 2>/dev/null; then
  sed -i "s|http://|https://|g" .env
fi

echo ">>> Пересборка фронта с https в .env..."
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build client admin

echo ""
echo "=== Готово ==="
echo "https://$DOMAIN/"
echo "https://$DOMAIN/admin"
