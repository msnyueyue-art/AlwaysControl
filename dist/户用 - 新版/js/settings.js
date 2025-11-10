// 设置页面交互功能

// 家庭最大输入电流调节
function adjustInputCurrent(delta) {
    const input = document.getElementById('inputCurrent');
    if (!input) return;

    let value = parseInt(input.value) || 32;
    value += delta;

    // 限制范围
    if (value < 6) value = 6;
    if (value > 32) value = 32;

    input.value = value;
}

// 工作模式切换
class WorkingModeManager {
    constructor() {
        this.currentMode = 'self_consumption';
        this.init();
    }

    init() {
        // 绑定所有模式卡片的点击事件
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.getAttribute('data-mode');
                this.switchMode(mode);
            });
        });
    }

    switchMode(mode) {
        // 移除所有激活状态
        document.querySelectorAll('.mode-card').forEach(card => {
            card.classList.remove('active');
        });

        // 激活选中的模式
        const selectedCard = document.querySelector(`.mode-card[data-mode="${mode}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
            this.currentMode = mode;

            // 更新说明文字
            this.updateModeDescription(mode);

            // 显示确认消息
            this.showConfirmation(mode);
        }
    }

    updateModeDescription(mode) {
        const descriptions = {
            'self_consumption': '选择自发自用模式后, 会最大利用光伏发的电给家庭使用。一般带有光伏的家庭会选择这个模式。',
            'economic': '经济模式会根据电价峰谷时段智能调节电池充放电，在电价低时充电，电价高时使用电池供电，帮您节省电费。',
            'emergency': '应急模式会优先保证电池电量充足，在突然停电时为您的家庭提供应急电力保障。'
        };

        const descriptionElement = document.querySelector('.mode-card + div + div');
        if (descriptionElement) {
            descriptionElement.textContent = descriptions[mode] || '';
        }
    }

    showConfirmation(mode) {
        const modeNames = {
            'self_consumption': '自发自用',
            'economic': '经济模式',
            'emergency': '应急模式'
        };

        // 创建简单的确认提示
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            right: 24px;
            background: #52c41a;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        toast.textContent = `已切换到${modeNames[mode]}`;

        document.body.appendChild(toast);

        // 3秒后自动移除
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// 电池充电时段滑块
class BatteryChargingSchedule {
    constructor(sliderId, labelId) {
        this.slider = document.getElementById(sliderId);
        this.label = document.getElementById(labelId);

        if (this.slider && this.label) {
            this.init();
        }
    }

    init() {
        this.slider.addEventListener('input', () => {
            this.updateLabel();
        });

        this.updateLabel();
    }

    updateLabel() {
        const value = parseInt(this.slider.value);
        this.label.textContent = `${value}%`;

        // 更新进度条颜色
        const percentage = ((value - parseInt(this.slider.min)) / (parseInt(this.slider.max) - parseInt(this.slider.min))) * 100;
        this.slider.style.background = `linear-gradient(to right, #1890ff 0%, #1890ff ${percentage}%, #f0f0f0 ${percentage}%, #f0f0f0 100%)`;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化工作模式管理器
    new WorkingModeManager();

    // 初始化电池充电滑块（如果存在）
    const chargeSlider = document.getElementById('chargeSlider');
    const dischargeSlider = document.getElementById('dischargeSlider');

    if (chargeSlider) {
        new BatteryChargingSchedule('chargeSlider', 'chargeLabel');
    }

    if (dischargeSlider) {
        new BatteryChargingSchedule('dischargeSlider', 'dischargeLabel');
    }
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
