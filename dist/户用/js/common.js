// 户用家庭储能-能源管理系统通用JavaScript

// 全局配置
const CONFIG = {
    apiBaseUrl: '/api',
    refreshInterval: 5000, // 5秒刷新一次数据
    chartColors: {
        primary: '#1890ff',
        success: '#52c41a',
        warning: '#faad14',
        danger: '#ff4d4f',
        info: '#13c2c2'
    }
};

// 工具函数
const Utils = {
    // 格式化数字
    formatNumber: function(num, decimals = 2) {
        if (isNaN(num)) return '--';
        return Number(num).toFixed(decimals);
    },

    // 格式化功率
    formatPower: function(power) {
        if (isNaN(power)) return '--';
        const p = Number(power);
        if (p >= 1000) {
            return (p / 1000).toFixed(2) + 'kW';
        }
        return p.toFixed(2) + 'W';
    },

    // 格式化电量
    formatEnergy: function(energy) {
        if (isNaN(energy)) return '--';
        return Number(energy).toFixed(3) + 'kWh';
    },

    // 格式化电压
    formatVoltage: function(voltage) {
        if (isNaN(voltage)) return '--';
        return Number(voltage).toFixed(2) + 'V';
    },

    // 格式化电流
    formatCurrent: function(current) {
        if (isNaN(current)) return '--';
        return Number(current).toFixed(2) + 'A';
    },

    // 格式化百分比
    formatPercentage: function(value) {
        if (isNaN(value)) return '--';
        return Number(value).toFixed(1) + '%';
    },

    // 格式化温度
    formatTemperature: function(temp) {
        if (isNaN(temp)) return '--';
        return Number(temp).toFixed(1) + '°C';
    },

    // 格式化货币
    formatCurrency: function(amount) {
        if (isNaN(amount)) return '--';
        return '¥' + Number(amount).toFixed(2);
    },

    // 获取当前时间
    getCurrentTime: function() {
        const now = new Date();
        return now.getFullYear() + '/' + 
               String(now.getMonth() + 1).padStart(2, '0') + '/' + 
               String(now.getDate()).padStart(2, '0');
    },

    // 获取当前时间戳
    getCurrentTimestamp: function() {
        return new Date().toLocaleString('zh-CN');
    },

    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// API请求封装
const API = {
    // 基础请求方法
    request: function(url, options = {}) {
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const config = Object.assign(defaultOptions, options);
        
        return fetch(CONFIG.apiBaseUrl + url, config)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('API请求失败:', error);
                throw error;
            });
    },

    // 获取设备状态
    getDeviceStatus: function() {
        return this.request('/device/status');
    },

    // 获取能源数据
    getEnergyData: function(type = 'realtime') {
        return this.request(`/energy/${type}`);
    },

    // 获取历史数据
    getHistoricalData: function(startTime, endTime) {
        return this.request(`/energy/history?start=${startTime}&end=${endTime}`);
    },

    // 获取消息列表
    getMessages: function(page = 1, limit = 10) {
        return this.request(`/messages?page=${page}&limit=${limit}`);
    },

    // 标记消息为已读
    markMessageRead: function(messageId) {
        return this.request(`/messages/${messageId}/read`, {
            method: 'PUT'
        });
    },

    // 删除消息
    deleteMessage: function(messageId) {
        return this.request(`/messages/${messageId}`, {
            method: 'DELETE'
        });
    },

    // 更新设备设置
    updateDeviceSettings: function(deviceId, settings) {
        return this.request(`/devices/${deviceId}/settings`, {
            method: 'PUT',
            body: JSON.stringify(settings)
        });
    },

    // 同步数据
    syncData: function() {
        return this.request('/sync', {
            method: 'POST'
        });
    }
};

// 数据管理器
const DataManager = {
    // 实时数据缓存
    realtimeData: null,
    
    // 历史数据缓存
    historicalData: null,

    // 初始化
    init: function() {
        this.loadRealtimeData();
        this.startAutoRefresh();
    },

    // 加载实时数据
    loadRealtimeData: function() {
        API.getEnergyData('realtime')
            .then(data => {
                this.realtimeData = data;
                this.updateRealtimeDisplay(data);
            })
            .catch(error => {
                console.error('加载实时数据失败:', error);
            });
    },

    // 更新实时数据显示
    updateRealtimeDisplay: function(data) {
        // 更新光伏数据
        if (data.pv) {
            this.updatePanelData('pv', data.pv);
        }

        // 更新电网数据
        if (data.grid) {
            this.updatePanelData('grid', data.grid);
        }

        // 更新充电桩数据
        if (data.charging) {
            this.updatePanelData('charging', data.charging);
        }

        // 更新家庭负载数据
        if (data.load) {
            this.updatePanelData('load', data.load);
        }

        // 更新电池数据
        if (data.battery) {
            this.updatePanelData('battery', data.battery);
        }

        // 更新工作模式
        if (data.workMode) {
            this.updateWorkMode(data.workMode);
        }
    },

    // 更新面板数据
    updatePanelData: function(type, data) {
        const panel = document.querySelector(`[data-panel="${type}"]`);
        if (!panel) return;

        // 更新状态
        const statusElement = panel.querySelector('.status-indicator');
        if (statusElement && data.status) {
            statusElement.className = `status-indicator ${data.status === 'online' ? 'status-online' : 'status-offline'}`;
            statusElement.innerHTML = `<span class="status-dot"></span>${data.status === 'online' ? '在线' : '离线'}`;
        }

        // 更新数据值
        Object.keys(data).forEach(key => {
            const element = panel.querySelector(`[data-field="${key}"]`);
            if (element && data[key] !== undefined) {
                const value = this.formatValue(key, data[key]);
                element.textContent = value;
            }
        });
    },

    // 格式化数值
    formatValue: function(field, value) {
        switch (field) {
            case 'power':
            case 'totalPower':
                return Utils.formatPower(value);
            case 'voltage':
                return Utils.formatVoltage(value);
            case 'current':
                return Utils.formatCurrent(value);
            case 'soc':
                return Utils.formatPercentage(value);
            case 'soh':
                return Utils.formatPercentage(value);
            case 'temperature':
                return Utils.formatTemperature(value);
            default:
                return value;
        }
    },

    // 更新工作模式
    updateWorkMode: function(mode) {
        const modeElement = document.querySelector('.work-mode-display');
        if (modeElement) {
            modeElement.textContent = this.getModeText(mode);
        }
    },

    // 获取模式文本
    getModeText: function(mode) {
        const modeMap = {
            'self_consumption': '自发自用',
            'economic': '经济模式',
            'emergency': '应急模式'
        };
        return modeMap[mode] || mode;
    },

    // 开始自动刷新
    startAutoRefresh: function() {
        setInterval(() => {
            this.loadRealtimeData();
        }, CONFIG.refreshInterval);
    },

    // 同步数据
    syncData: function() {
        return API.syncData()
            .then(() => {
                this.loadRealtimeData();
                this.showNotification('数据同步成功', 'success');
            })
            .catch(error => {
                console.error('数据同步失败:', error);
                this.showNotification('数据同步失败', 'error');
            });
    },

    // 显示通知
    showNotification: function(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // 添加样式
        Object.assign(notification.style, {
            position: 'fixed',
            top: '80px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '4px',
            color: 'white',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });

        // 设置背景色
        const colors = {
            success: '#52c41a',
            error: '#ff4d4f',
            warning: '#faad14',
            info: '#1890ff'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // 添加到页面
        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
};

// 图表管理器
const ChartManager = {
    charts: {},

    // 初始化图表
    init: function(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`图表容器 ${containerId} 不存在`);
            return;
        }

        // 使用简单的Canvas绘制图表
        const canvas = document.createElement('canvas');
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        this.charts[containerId] = {
            canvas: canvas,
            ctx: ctx,
            options: options
        };

        return this.charts[containerId];
    },

    // 绘制面积图
    drawAreaChart: function(containerId, data, options = {}) {
        const chart = this.charts[containerId];
        if (!chart) return;

        const { ctx, canvas } = chart;
        const { width, height } = canvas;

        // 清除画布
        ctx.clearRect(0, 0, width, height);

        // 设置默认选项
        const defaultOptions = {
            color: CONFIG.chartColors.primary,
            maxValue: Math.max(...data.map(d => d.value)),
            showGrid: true,
            showLabels: true
        };

        const config = Object.assign(defaultOptions, options);

        // 绘制网格
        if (config.showGrid) {
            ctx.strokeStyle = '#f0f0f0';
            ctx.lineWidth = 1;
            
            // 水平网格线
            for (let i = 0; i <= 5; i++) {
                const y = (height / 5) * i;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // 垂直网格线
            const step = width / (data.length - 1);
            for (let i = 0; i < data.length; i++) {
                const x = step * i;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
        }

        // 绘制面积图
        if (data.length > 1) {
            ctx.fillStyle = config.color + '40'; // 半透明
            ctx.strokeStyle = config.color;
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(0, height);

            data.forEach((point, index) => {
                const x = (width / (data.length - 1)) * index;
                const y = height - (point.value / config.maxValue) * height;
                ctx.lineTo(x, y);
            });

            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fill();

            // 绘制线条
            ctx.beginPath();
            ctx.moveTo(0, height - (data[0].value / config.maxValue) * height);
            data.forEach((point, index) => {
                const x = (width / (data.length - 1)) * index;
                const y = height - (point.value / config.maxValue) * height;
                ctx.lineTo(x, y);
            });
            ctx.stroke();
        }

        // 绘制标签
        if (config.showLabels) {
            ctx.fillStyle = '#666';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';

            data.forEach((point, index) => {
                const x = (width / (data.length - 1)) * index;
                const y = height - (point.value / config.maxValue) * height - 10;
                ctx.fillText(point.label || '', x, y);
            });
        }
    },

    // 绘制饼图
    drawPieChart: function(containerId, data, options = {}) {
        const chart = this.charts[containerId];
        if (!chart) return;

        const { ctx, canvas } = chart;
        const { width, height } = canvas;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 20;

        // 清除画布
        ctx.clearRect(0, 0, width, height);

        let currentAngle = 0;
        const total = data.reduce((sum, item) => sum + item.value, 0);

        data.forEach((item, index) => {
            const sliceAngle = (item.value / total) * 2 * Math.PI;

            // 绘制扇形
            ctx.fillStyle = item.color || CONFIG.chartColors.primary;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();

            // 绘制标签
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
            const labelY = centerY + Math.sin(labelAngle) * (radius + 30);

            ctx.fillStyle = '#333';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, labelX, labelY);

            currentAngle += sliceAngle;
        });

        // 绘制中心文字
        ctx.fillStyle = '#333';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('100%', centerX, centerY);
    }
};

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化数据管理器
    DataManager.init();

    // 更新当前时间显示
    const timeElements = document.querySelectorAll('.date-display');
    timeElements.forEach(element => {
        element.textContent = Utils.getCurrentTime();
    });

    // 绑定同步数据按钮
    const syncButtons = document.querySelectorAll('.sync-data-btn');
    syncButtons.forEach(button => {
        button.addEventListener('click', function() {
            DataManager.syncData();
        });
    });

    // 初始化图表
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        ChartManager.init(container.id);
    });

    console.log('户用家庭储能-能源管理系统初始化完成');
});
