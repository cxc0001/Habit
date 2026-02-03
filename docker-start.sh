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

# 构建并启动服务
echo "🏗️ Building and starting services..."
$COMPOSE_CMD -f docker-compose.prod.yml up --build -d

echo "✅ Services are starting..."
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🔌 Backend API will be available at: http://localhost:3001"
echo ""
echo "📋 To view logs: $COMPOSE_CMD -f docker-compose.prod.yml logs -f"
echo "🛑 To stop services: $COMPOSE_CMD -f docker-compose.prod.yml down"