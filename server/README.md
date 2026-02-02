# MicroHabits Backend Server

这是一个为微习惯前端应用提供API服务的后端服务器。

## 功能特性

- 用户认证（注册、登录、JWT令牌管理）
- 习惯管理（创建、读取、更新、删除）
- 打卡记录管理
- 统计报告生成
- 农场培养系统
- 数据库存储管理

## 安装步骤

1. 确保你已经安装了 Node.js (版本 >= 14.x)

2. 安装依赖：
```bash
npm install
```

3. 配置环境变量：
复制 `.env.example` 文件并命名为 `.env`，然后设置相应的配置项

4. 启动服务器：
```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

## API 端点

### 认证相关
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册
- `GET /api/auth/profile` - 获取用户资料
- `POST /api/auth/refresh` - 刷新访问令牌

### 习惯相关
- `GET /api/habits` - 获取用户习惯列表
- `POST /api/habits` - 创建新习惯
- `PUT /api/habits/:id` - 更新习惯
- `DELETE /api/habits/:id` - 删除习惯

### 打卡相关
- `GET /api/checkins` - 获取打卡记录
- `POST /api/checkins` - 创建打卡记录
- `DELETE /api/checkins/:id` - 删除打卡记录

### 报告相关
- `GET /api/reports` - 获取报告列表
- `POST /api/reports` - 生成报告
- `PATCH /api/reports/:id/read` - 标记报告为已读

### 农场相关
- `GET /api/farm` - 获取农场数据
- `POST /api/farm/grow` - 开始培养新项目
- `POST /api/farm/complete/:id` - 完成培养

### 库存相关
- `GET /api/inventory` - 获取用户库存

## 环境变量

- `PORT`: 服务器监听端口 (默认: 3001)
- `JWT_SECRET`: JWT 访问令牌密钥
- `REFRESH_SECRET`: JWT 刷新令牌密钥

## 安全注意事项

- 在生产环境中，务必更改默认的 JWT 密钥
- 使用 HTTPS 加密传输敏感数据
- 对所有输入进行验证和清理
- 实施适当的速率限制

## 生产部署

在生产环境中，建议：

1. 使用真正的数据库（如 PostgreSQL 或 MongoDB）替换内存存储
2. 配置反向代理（如 Nginx）
3. 设置 HTTPS 证书
4. 使用 PM2 或类似工具管理进程
5. 配置日志管理系统

## 错误处理

服务器使用标准 HTTP 状态码：
- 200: 成功
- 201: 创建成功
- 400: 请求错误
- 401: 未授权
- 403: 禁止访问
- 404: 资源未找到
- 500: 服务器内部错误