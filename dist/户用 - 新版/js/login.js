// 登录页面交互逻辑

(function() {
    'use strict';

    // DOM元素
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const captchaInput = document.getElementById('captcha');
    const captchaDisplay = document.getElementById('captchaDisplay');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelResetBtn = document.getElementById('cancelReset');
    const sendCodeBtn = document.getElementById('sendCode');
    const resetPasswordForm = document.getElementById('resetPasswordForm');

    // 验证码相关
    let currentCaptcha = '';

    // 生成随机验证码
    function generateCaptcha() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let captcha = '';
        for (let i = 0; i < 4; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    }

    // 更新验证码显示
    function updateCaptcha() {
        currentCaptcha = generateCaptcha();
        captchaDisplay.querySelector('.captcha-text').textContent = currentCaptcha;
    }

    // 切换密码显示/隐藏
    function togglePasswordVisibility() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
    }

    // 表单验证
    function validateForm() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const captcha = captchaInput.value.trim();

        if (!username) {
            showMessage('请输入用户名或手机号', 'error');
            usernameInput.focus();
            return false;
        }

        if (!password) {
            showMessage('请输入密码', 'error');
            passwordInput.focus();
            return false;
        }

        if (!captcha) {
            showMessage('请输入验证码', 'error');
            captchaInput.focus();
            return false;
        }

        if (captcha.toUpperCase() !== currentCaptcha) {
            showMessage('验证码错误', 'error');
            captchaInput.value = '';
            captchaInput.focus();
            updateCaptcha();
            return false;
        }

        return true;
    }

    // 显示消息提示
    function showMessage(message, type = 'info') {
        // 简单的alert提示,后续可以替换为更美观的提示组件
        alert(message);
    }

    // 处理登录提交
    function handleLogin(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const rememberMe = document.getElementById('rememberMe').checked;

        // TODO: 实际登录逻辑,调用后端API
        console.log('登录信息:', {
            username,
            password,
            rememberMe
        });

        // 模拟登录成功
        showMessage('登录成功!', 'success');

        // 跳转到首页
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }

    // 打开忘记密码弹窗
    function openForgotPasswordModal(e) {
        e.preventDefault();
        forgotPasswordModal.classList.add('active');
    }

    // 关闭忘记密码弹窗
    function closeForgotPasswordModal() {
        forgotPasswordModal.classList.remove('active');
        resetPasswordForm.reset();
    }

    // 发送验证码
    let countdown = 0;
    function sendVerificationCode() {
        const phone = document.getElementById('resetPhone').value.trim();

        if (!phone) {
            showMessage('请输入手机号', 'error');
            return;
        }

        // 验证手机号格式
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            showMessage('请输入正确的手机号码', 'error');
            return;
        }

        // 禁用按钮并开始倒计时
        sendCodeBtn.disabled = true;
        countdown = 60;

        const timer = setInterval(() => {
            countdown--;
            sendCodeBtn.textContent = `${countdown}秒后重发`;

            if (countdown <= 0) {
                clearInterval(timer);
                sendCodeBtn.disabled = false;
                sendCodeBtn.textContent = '发送验证码';
            }
        }, 1000);

        // TODO: 调用后端API发送验证码
        console.log('发送验证码到:', phone);
        showMessage('验证码已发送', 'success');
    }

    // 处理重置密码
    function handleResetPassword(e) {
        e.preventDefault();

        const phone = document.getElementById('resetPhone').value.trim();
        const smsCode = document.getElementById('smsCode').value.trim();
        const newPassword = document.getElementById('newPassword').value.trim();

        if (!phone) {
            showMessage('请输入手机号', 'error');
            return;
        }

        if (!smsCode) {
            showMessage('请输入短信验证码', 'error');
            return;
        }

        if (!newPassword) {
            showMessage('请输入新密码', 'error');
            return;
        }

        if (newPassword.length < 6) {
            showMessage('密码长度不能少于6位', 'error');
            return;
        }

        // TODO: 调用后端API重置密码
        console.log('重置密码:', {
            phone,
            smsCode,
            newPassword
        });

        showMessage('密码重置成功', 'success');
        closeForgotPasswordModal();
    }

    // 事件绑定
    function initEventListeners() {
        // 登录表单提交
        loginForm.addEventListener('submit', handleLogin);

        // 切换密码显示
        if (togglePasswordBtn) {
            togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
        }

        // 验证码点击刷新
        if (captchaDisplay) {
            captchaDisplay.addEventListener('click', updateCaptcha);
        }

        // 忘记密码
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', openForgotPasswordModal);
        }

        // 关闭弹窗
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeForgotPasswordModal);
        }

        if (cancelResetBtn) {
            cancelResetBtn.addEventListener('click', closeForgotPasswordModal);
        }

        // 点击遮罩层关闭弹窗
        if (forgotPasswordModal) {
            forgotPasswordModal.querySelector('.modal-overlay').addEventListener('click', closeForgotPasswordModal);
        }

        // 发送验证码
        if (sendCodeBtn) {
            sendCodeBtn.addEventListener('click', sendVerificationCode);
        }

        // 重置密码表单提交
        if (resetPasswordForm) {
            resetPasswordForm.addEventListener('submit', handleResetPassword);
        }

        // 输入框回车提交
        [usernameInput, passwordInput, captchaInput].forEach(input => {
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        handleLogin(e);
                    }
                });
            }
        });
    }

    // 初始化
    function init() {
        updateCaptcha();
        initEventListeners();
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
