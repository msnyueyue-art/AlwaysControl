# 北能能源管理系统

## 项目概述
北能能源管理系统是一个综合性的能源管理平台，包含移动端APP和Web管理端。

### 系统架构
- **移动端APP**: 基于React Native，面向户用用户
- **Web管理端**: 基于React + Vite，面向管理人员
- **后端服务**: 基于Node.js + Express + MongoDB
- **共享组件**: 通用工具和类型定义

## 功能特性

### 移动端APP
- 用户注册/登录
- 设备管理（添加、删除、编辑）
- 实时数据监控
- 能耗统计分析
- 告警通知
- 个人中心

### 管理端
- 用户管理
- 设备管理
- 数据分析仪表板
- 报表导出
- 系统配置
- 权限管理

## 技术栈
- **前端**: React Native, React, TypeScript, TailwindCSS
- **后端**: Node.js, Express, MongoDB, Redis
- **认证**: JWT
- **实时通信**: WebSocket

## 开始使用

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB >= 6.0
- Redis >= 7.0

### 安装步骤
```bash
# 克隆项目
git clone [repository-url]

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 项目结构
```
beineng-energy-management/
├── app/                 # React Native移动端
├── admin/              # React管理端
├── backend/            # Node.js后端服务
└── shared/             # 共享代码
```