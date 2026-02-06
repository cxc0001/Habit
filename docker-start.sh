#!/bin/bash

echo "🚀 Starting MicroHabits App with Docker..."

# 检查Docker是否已安装
if ! [ -x "$(command -v docker)" ]; then
  echo "❌ Docker is not installed. Please install Docker first."
  exit 1
fi

# 检查Docker Compose是否已安装
if ! [ -x "$(command -v docker-compose)" ]; then
  echo "⚠️ Docker Compose is not installed. Using 'docker compose' instead..."
  COMPOSE_CMD="docker compose"
else
  COMPOSE_CMD="docker-compose"
fi

# ...existing code...
# 构建并启动服务（在构建镜像前在本地重新安装 npm 依赖）
echo "🔄 Preparing local Node.js packages before building Docker images..."

# 要检查并在这些目录中执行 npm 重建（根据你的项目结构调整）
REBUILD_DIRS=("frontend" "backend" ".")

for d in "${REBUILD_DIRS[@]}"; do
  if [ -f "$d/package.json" ]; then
    echo "📦 Rebuilding npm packages in: $d"
    (
      set -e
      cd "$d" || exit 1
      rm -rf node_modules package-lock.json
      npm cache clean --force
      npm config set registry https://registry.npmmirror.com
      npm install
    )
    echo "✅ Done: $d"
  else
    echo "⏭️ Skipping $d (no package.json)"
  fi
done

echo "🏗️ Building and starting services..."
$COMPOSE_CMD -f docker-compose.yml up --build -d

echo "✅ Services are starting..."
echo "📱 Frontend will be available at: http://localhost:12001"
echo "🔌 Backend API will be available at: http://localhost:12002"
echo ""
echo "📋 To view logs: $COMPOSE_CMD -f docker-compose.yml logs -f"
echo "🛑 To stop services: $COMPOSE_CMD -f docker-compose.yml down"