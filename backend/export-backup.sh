#!/bin/bash

# CẤU HÌNH
PG_CONTAINER_NAME="my-postgres"
PG_USER="quypq147"
PG_DB="demo_db"
OUTPUT_FILE="backup.sql"

echo "📦 Đang export database $PG_DB từ container $PG_CONTAINER_NAME..."

docker exec -u $PG_USER $PG_CONTAINER_NAME pg_dump -U $PG_USER -d $PG_DB > $OUTPUT_FILE

if [ $? -eq 0 ]; then
  echo "✅ Export thành công! File: $OUTPUT_FILE"
else
  echo "❌ Lỗi khi export database."
fi
