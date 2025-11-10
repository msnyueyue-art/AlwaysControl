/**
 * EnerShare 登录页面 - 语言切换与交互逻辑
 * 符合 SOLID、KISS、DRY、YAGNI 原则
 */

// ========================================
// 1. 语言配置数据（单一数据源，符合 DRY 原则）
// ========================================
const i18n = {
    en: {
        // 页面核心文本
        pageTitle: "Welcome Back",
        pageSubtitle: "Login to your account",
        visualTagline: "BMS Management Platform",

        // 表单标签
        usernameLabel: "Username",
        passwordLabel: "Password",
        usernamePlaceholder: "Enter Username",
        passwordPlaceholder: "Enter Password",

        // 操作按钮与链接
        rememberMe: "Remember me",
        loginBtn: "Login",

        // 语言标识
        langCode: "EN"
    },
    zh: {
        // 页面核心文本
        pageTitle: "欢迎回来",
        pageSubtitle: "登录您的账户",
        visualTagline: "BMS管理平台",

        // 表单标签
        usernameLabel: "用户名",
        passwordLabel: "密码",
        usernamePlaceholder: "请输入用户名",
        passwordPlaceholder: "请输入密码",

        // 操作按钮与链接
        rememberMe: "记住我",
        loginBtn: "登录",

        // 语言标识
        langCode: "中文"
    }
};

// ========================================
// 2. DOM 元素引用（集中管理，避免重复查询）
// ========================================
const elements = {
    // 语言切换
    langToggle: document.getElementById('langToggle'),
    currentLang: document.getElementById('currentLang'),

    // 页面标题
    pageTitle: document.getElementById('pageTitle'),
    pageSubtitle: document.getElementById('pageSubtitle'),
    visualTagline: document.getElementById('visualTagline'),

    // 表单元素
    usernameLabel: document.getElementById('usernameLabel'),
    passwordLabel: document.getElementById('passwordLabel'),
    usernameInput: document.getElementById('username'),
    passwordInput: document.getElementById('password'),

    // 操作元素
    rememberMeLabel: document.getElementById('rememberMeLabel'),
    loginBtn: document.getElementById('loginBtn'),

    // 表单
    loginForm: document.getElementById('loginForm')
};

// ========================================
// 3. 状态管理（单一职责原则）
// ========================================
const state = {
    currentLanguage: localStorage.getItem('language') || 'en',

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
    },

    getLanguage() {
        return this.currentLanguage;
    }
};

// ========================================
// 4. 语言切换功能（核心逻辑，符合开闭原则）
// ========================================
class LanguageController {
    constructor(i18nData, domElements) {
        this.i18n = i18nData;
        this.elements = domElements;
    }

    /**
     * 更新页面所有文本内容
     * @param {string} lang - 语言代码 ('en' | 'zh')
     */
    updateContent(lang) {
        const translations = this.i18n[lang];

        if (!translations) {
            console.error(`Language '${lang}' not found`);
            return;
        }

        // 更新页面标题区域
        this.elements.pageTitle.textContent = translations.pageTitle;
        this.elements.pageSubtitle.textContent = translations.pageSubtitle;

        // 更新视觉区域（如果存在）
        if (this.elements.visualTagline) {
            this.elements.visualTagline.textContent = translations.visualTagline;
        }

        // 更新表单标签
        this.elements.usernameLabel.textContent = translations.usernameLabel;
        this.elements.passwordLabel.textContent = translations.passwordLabel;

        // 更新 placeholder
        this.elements.usernameInput.placeholder = translations.usernamePlaceholder;
        this.elements.passwordInput.placeholder = translations.passwordPlaceholder;

        // 更新操作元素
        this.elements.rememberMeLabel.textContent = translations.rememberMe;
        this.elements.loginBtn.textContent = translations.loginBtn;

        // 更新语言标识
        this.elements.currentLang.textContent = translations.langCode;

        // 更新 HTML lang 属性（辅助功能）
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }

    /**
     * 切换语言
     */
    toggle() {
        const newLang = state.getLanguage() === 'en' ? 'zh' : 'en';
        state.setLanguage(newLang);
        this.updateContent(newLang);

        // 添加切换动画反馈
        this.addToggleAnimation();
    }

    /**
     * 切换动画效果
     */
    addToggleAnimation() {
        this.elements.langToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.elements.langToggle.style.transform = 'scale(1)';
        }, 150);
    }

    /**
     * 初始化语言
     */
    init() {
        this.updateContent(state.getLanguage());
    }
}

// ========================================
// 5. 表单交互增强（单一职责原则）
// ========================================
class FormController {
    constructor(formElement, inputElements) {
        this.form = formElement;
        this.inputs = inputElements;
    }

    /**
     * 表单提交处理
     */
    handleSubmit(event) {
        event.preventDefault();

        const username = this.inputs.username.value.trim();
        const password = this.inputs.password.value.trim();

        // 基础验证
        if (!username || !password) {
            this.showError(state.getLanguage() === 'en'
                ? 'Please fill in all fields'
                : '请填写所有字段'
            );
            return;
        }

        // 模拟登录（实际项目中替换为 API 调用）
        this.simulateLogin(username, password);
    }

    /**
     * 模拟登录过程
     */
    simulateLogin(username, password) {
        const loginBtn = elements.loginBtn;

        // 添加加载状态
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        loginBtn.textContent = state.getLanguage() === 'en' ? 'Logging in...' : '登录中...';

        // 模拟网络延迟
        setTimeout(() => {
            // 保存用户登录信息
            const userData = {
                username: username,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('userToken', 'mock-token-' + Date.now());
            localStorage.setItem('userData', JSON.stringify(userData));

            // 显示成功消息
            this.showSuccess(state.getLanguage() === 'en'
                ? 'Login successful! Redirecting...'
                : '登录成功！正在跳转...'
            );

            // 跳转到文件管理页面
            setTimeout(() => {
                window.location.href = 'file-management.html';
            }, 800);
        }, 1500);
    }

    /**
     * 显示错误消息
     */
    showError(message) {
        alert(message); // 简化实现，实际项目使用更优雅的 toast 组件
    }

    /**
     * 显示成功消息
     */
    showSuccess(message) {
        alert(message); // 简化实现，实际项目使用更优雅的 toast 组件
    }

    /**
     * 输入框实时反馈
     */
    setupInputFeedback() {
        Object.values(this.inputs).forEach(input => {
            // 聚焦时移除错误状态
            input.addEventListener('focus', () => {
                input.classList.remove('error');
            });

            // 失焦时简单验证
            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
        });
    }

    /**
     * 初始化表单
     */
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupInputFeedback();
    }
}

// ========================================
// 6. 用户体验增强（可选功能）
// ========================================
class UXEnhancer {
    /**
     * 键盘快捷键支持
     */
    static setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K: 切换语言
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                elements.langToggle.click();
            }
        });
    }

    /**
     * 自动聚焦首个输入框
     */
    static autoFocusFirstInput() {
        // 延迟聚焦，避免页面加载时的突兀感
        setTimeout(() => {
            elements.usernameInput.focus();
        }, 500);
    }

    /**
     * 页面可见性检测（返回页面时刷新状态）
     */
    static setupVisibilityDetection() {
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                // 页面重新可见时，检查语言设置是否变化
                const savedLang = localStorage.getItem('language') || 'en';
                if (savedLang !== state.getLanguage()) {
                    state.setLanguage(savedLang);
                    langController.updateContent(savedLang);
                }
            }
        });
    }

    /**
     * 初始化所有增强功能
     */
    static init() {
        this.setupKeyboardShortcuts();
        this.autoFocusFirstInput();
        this.setupVisibilityDetection();
    }
}

// ========================================
// 7. 应用初始化（依赖注入，符合依赖倒置原则）
// ========================================
class App {
    constructor() {
        // 初始化语言控制器
        this.langController = new LanguageController(i18n, elements);

        // 初始化表单控制器
        this.formController = new FormController(elements.loginForm, {
            username: elements.usernameInput,
            password: elements.passwordInput
        });
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 语言切换按钮
        elements.langToggle.addEventListener('click', () => {
            this.langController.toggle();
        });
    }

    /**
     * 启动应用
     */
    start() {
        // 初始化语言
        this.langController.init();

        // 初始化表单
        this.formController.init();

        // 绑定事件
        this.bindEvents();

        // 初始化用户体验增强
        UXEnhancer.init();

        console.log('✅ EnerShare Login Page Initialized');
    }
}

// ========================================
// 8. 应用入口（页面加载完成后启动）
// ========================================
// 使用立即执行函数避免全局污染
(function() {
    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const app = new App();
            app.start();
        });
    } else {
        // DOM 已加载完成
        const app = new App();
        app.start();
    }
})();

// ========================================
// 9. 导出接口（供外部调用，如果需要）
// ========================================
window.EnerShareLogin = {
    getLanguage: () => state.getLanguage(),
    setLanguage: (lang) => {
        if (lang === 'en' || lang === 'zh') {
            state.setLanguage(lang);
            langController.updateContent(lang);
        }
    }
};
