#!/bin/bash

# ─── CONFIG ──────────────────────────────────────────────
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

# ─── REMOVE OLD CONTAINERS ───────────────────────────────
echo "🧹 Removing old containers (if any)..."
docker rm -f $PG_CONTAINER_NAME $PGADMIN_CONTAINER_NAME > /dev/null 2>&1

# ─── START POSTGRES CONTAINER ─────────────────────────────
echo "🚀 Starting PostgreSQL container..."
docker run -d \
  --name $PG_CONTAINER_NAME \
  -e POSTGRES_USER=$PG_USER \
  -e POSTGRES_PASSWORD=$PG_PASSWORD \
  -e POSTGRES_DB=$PG_DB \
  -p $PG_PORT:5432 \
  -v pgdata:/var/lib/postgresql/data \
  postgres:15

# ─── START PGADMIN CONTAINER ──────────────────────────────
echo "🚀 Starting pgAdmin container..."
docker run -d \
  --name $PGADMIN_CONTAINER_NAME \
  -e PGADMIN_DEFAULT_EMAIL=$PGADMIN_EMAIL \
  -e PGADMIN_DEFAULT_PASSWORD=$PGADMIN_PASSWORD \
  -p $PGADMIN_PORT:80 \
  --link $PG_CONTAINER_NAME:postgres \
  dpage/pgadmin4



# ─── IMPORT BACKUP IF EXISTS ──────────────────────────────
if [ -f "$BACKUP_FILE" ]; then
  echo "📦 Importing data from $BACKUP_FILE..."
  docker cp "$BACKUP_FILE" "$PG_CONTAINER_NAME":/backup.sql
  docker exec -i $PG_CONTAINER_NAME psql -U $PG_USER -d $PG_DB -f /backup.sql
  echo "✅ Data imported successfully!"
else
  echo "⚠️ File $BACKUP_FILE not found. Skipping import."
fi

# ─── DISPLAY CONNECTION INFO ──────────────────────────────
echo ""
echo "📌 PostgreSQL Connection Info:"
echo "  🔸 Host: localhost"
echo "  🔸 Port: $PG_PORT"
echo "  🔸 Database: $PG_DB"
echo "  🔸 Username: $PG_USER"
echo "  🔸 Password: $PG_PASSWORD"
echo ""
echo "🌐 Access pgAdmin: http://localhost:$PGADMIN_PORT"
echo "  🔸 Email: $PGADMIN_EMAIL"
echo "  🔸 Password: $PGADMIN_PASSWORD"




