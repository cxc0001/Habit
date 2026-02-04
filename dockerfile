# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
# 只复制必要文件以加速缓存
COPY package.json package-lock.json* ./
COPY vite.config.ts tsconfig.json ./
COPY index.html ./ 
COPY public ./public
COPY src ./src
RUN npm ci
# 在构建时指定API基础URL环境变量
ARG VITE_API_BASE_URL=http://localhost:12002/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
# 安装仅服务端依赖
COPY server/package.json server/package-lock.json* ./server/
WORKDIR /app/server
RUN npm ci --only=production
# 将前端构建结果拷贝到 server 可提供的静态目录（调整为你的 server.js 使用的目录）
COPY --from=builder /app/dist ./public
# 拷贝 server 代码
COPY server/ ./
EXPOSE 12001
CMD ["node", "server.js"]