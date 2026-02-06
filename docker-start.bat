@echo off
echo 🚀 Starting MicroHabits App with Docker...

REM 检查Docker是否已安装
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

echo 🏗️ Building and starting services...
docker-compose -f docker-compose.prod.yml up --build -d

echo ✅ Services are starting...
echo 📱 Frontend will be available at: http://localhost:12001
echo 🔌 Backend API will be available at: http://localhost:12002
echo.
echo 📋 To view logs: docker-compose -f docker-compose.prod.yml logs -f
echo 🛑 To stop services: docker-compose -f docker-compose.prod.yml down

pause