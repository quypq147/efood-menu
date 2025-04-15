#!/bin/bash

# ─── CẤU HÌNH ─────────────────────────────────────────────
PG_CONTAINER_NAME="my-postgres"
PG_PORT="5432"
PG_USER="quypq147"
PG_PASSWORD="quypq147"
PG_DB="demo_db"
BACKUP_FILE="backup.sql"

PGADMIN_CONTAINER_NAME="my-pgadmin"
PGADMIN_PORT="5050"
PGADMIN_EMAIL="quypq147@quypq147.com"
PGADMIN_PASSWORD="quypq147"

# ─── CHẠY CONTAINER POSTGRES VÀ PGADMIN ───────────────────
echo "🚀 Khởi chạy Docker containers..."

docker run -d \
  --name $PG_CONTAINER_NAME \
  -e POSTGRES_USER=$PG_USER \
  -e POSTGRES_PASSWORD=$PG_PASSWORD \
  -e POSTGRES_DB=$PG_DB \
  -p $PG_PORT:5432 \
  postgres:15

docker run -d \
  --name $PGADMIN_CONTAINER_NAME \
  -e PGADMIN_DEFAULT_EMAIL=$PGADMIN_EMAIL \
  -e PGADMIN_DEFAULT_PASSWORD=$PGADMIN_PASSWORD \
  -p $PGADMIN_PORT:80 \
  --link $PG_CONTAINER_NAME:postgres \
  dpage/pgadmin4

# ─── CHỜ POSTGRES SẴN SÀNG ───────────────────────────────
echo "⏳ Đang chờ PostgreSQL khởi động..."
sleep 10

# ─── IMPORT BACKUP NẾU TỒN TẠI ────────────────────────────
if [ -f "$BACKUP_FILE" ]; then
  echo "📦 Đang import dữ liệu từ $BACKUP_FILE..."
  docker cp $BACKUP_FILE $PG_CONTAINER_NAME:/backup.sql
  docker exec -u postgres $PG_CONTAINER_NAME psql -U $PG_USER -d $PG_DB -f /backup.sql
  echo "✅ Import hoàn tất."
else
  echo "⚠️ Không tìm thấy file $BACKUP_FILE. Bỏ qua bước import."
fi

# ─── IN RA THÔNG TIN KẾT NỐI ──────────────────────────────
echo ""
echo "📌 Kết nối PostgreSQL bằng DBeaver:"
echo "  Host: localhost"
echo "  Port: $PG_PORT"
echo "  User: $PG_USER"
echo "  Password: $PG_PASSWORD"
echo "  Database: $PG_DB"
echo ""
echo "🌐 Mở pgAdmin tại: http://localhost:$PGADMIN_PORT"
echo "  Email: $PGADMIN_EMAIL"
echo "  Password: $PGADMIN_PASSWORD"
