# EnerShare 后台管理系统

EnerShare 后台管理系统，用于管理BMS升级包和文档资料。

## 🚀 功能特性

### 文件管理模块
- ✅ BMS升级包管理
  - 上传BMS升级包文件
  - 支持版本号管理（V2.3.5等）
  - 查看升级包详情
  - 编辑升级包信息
  - 删除升级包

- ✅ 文档资料管理
  - 多语言文档支持（中文、英文、日文等）
  - 产品说明书管理
  - 隐私政策管理
  - 用户协议管理
  - 按语言筛选文档

### 用户认证
- ✅ 登录功能
- ✅ 多语言界面（中文/英文）
- ✅ 用户信息管理

## 📦 最新更新

### v1.1.0 (2025-10-20)
**新增**：为BMS升级包添加版本号字段功能
- 在上传文件弹框中添加版本号输入字段（放在文件类型下方）
- 在BMS升级包列表中添加版本号列（放在文件类型前面）
- 在查看详情弹框中添加版本号显示
- 在编辑文件弹框中支持编辑版本号
- 版本号字段仅对BMS升级包生效，文档资料不受影响
- 支持中英文双语界面

## 🛠️ 技术栈

- 纯HTML + CSS + JavaScript
- 无框架依赖
- 响应式设计
- 国际化支持

## 📂 文件结构

```
爱尚-后台/
├── index.html              # 首页
├── login.html              # 登录页面
├── login.css              # 登录样式
├── login.js               # 登录逻辑
├── file-management.html   # 文件管理页面
├── file-management.css    # 文件管理样式
├── file-management.js     # 文件管理逻辑
└── 爱尚logo.png            # Logo图片
```

## 🚦 快速开始

### 访问在线版本
直接访问 GitHub Pages：[点击这里](#)

### 本地运行
1. 克隆仓库
```bash
git clone https://github.com/msnyueyue-art/EnerShare.git
cd EnerShare
```

2. 使用任意HTTP服务器运行
```bash
# 方式1: 使用 Python
python -m http.server 8000

# 方式2: 使用 Node.js http-server
npx http-server

# 方式3: 直接用浏览器打开 index.html
```

3. 在浏览器中访问
- 首页: `http://localhost:8000/index.html`
- 登录页: `http://localhost:8000/login.html`
- 文件管理: `http://localhost:8000/file-management.html`

## 📋 使用说明

### 登录系统
1. 打开 `login.html`
2. 输入用户名和密码（演示版本接受任意凭据）
3. 点击登录进入文件管理页面

### BMS升级包管理
1. 点击"上传文件"按钮
2. 选择"BMS升级包"分类
3. 输入文件名称和版本号（例如：V2.3.5）
4. 上传文件
5. 在列表中可以查看、编辑或删除

### 文档资料管理
1. 切换到"文档资料" Tab
2. 上传不同语言版本的文档
3. 使用语言筛选器查看特定语言的文档

## 🌐 多语言支持

系统支持以下语言：
- 🇨🇳 简体中文
- 🇺🇸 English
- 🇹🇼 繁体中文
- 🇯🇵 日本語

点击右上角的语言切换按钮即可切换界面语言。

## 📝 版本历史

### v1.1.0 (2025-10-20)
- 新增BMS升级包版本号字段功能

### v1.0.0 (2025-10-15)
- 初始版本发布
- 文件管理基础功能
- 用户登录功能
- 多语言支持

## 👨‍💻 开发者

维护者：msnyueyue-art

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
