# Dockerfile - 直接复制已构建的文件
FROM node:18-alpine

WORKDIR /app/server

# 1. 直接复制后端代码和已安装的依赖
COPY server/ ./

# 2. 复制前端构建好的 dist 目录
COPY dist ./public/

# 3. 直接启动
EXPOSE 12001
CMD ["node", "server.js"]
