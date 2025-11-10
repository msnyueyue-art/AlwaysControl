// 首页交互功能和动画

// 数据面板点击弹窗
class DataPanelModal {
    constructor() {
        this.init();
    }

    init() {
        // 创建弹窗HTML
        this.createModalHTML();

        // 绑定点击事件
        this.bindEvents();
    }

    createModalHTML() {
        const modalHTML = `
            <div class="modal-overlay" id="modalOverlay"></div>
            <div class="modal-dialog" id="modalDialog">
                <div class="modal-dialog-header">
                    <h3 class="modal-dialog-title" id="modalTitle">设备详情</h3>
                    <button class="modal-close-btn" id="modalCloseBtn">×</button>
                </div>
                <div class="modal-dialog-body" id="modalBody"></div>
            </div>
        `;

        // 添加到body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    bindEvents() {
        // 数据面板点击事件
        document.querySelectorAll('.data-panel[data-panel]').forEach(panel => {
            panel.addEventListener('click', (e) => {
                const panelType = panel.getAttribute('data-panel');
                this.showModal(panelType);
            });
        });

        // 关闭按钮
        document.getElementById('modalCloseBtn').addEventListener('click', () => {
            this.closeModal();
        });

        // 点击遮罩关闭
        document.getElementById('modalOverlay').addEventListener('click', () => {
            this.closeModal();
        });
    }

    showModal(panelType) {
        const overlay = document.getElementById('modalOverlay');
        const modal = document.getElementById('modalDialog');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');

        // 设置标题和内容
        const data = this.getPanelData(panelType);
        title.innerHTML = `${data.icon} ${data.title}详情`;
        body.innerHTML = this.generateModalContent(data);

        // 显示弹窗
        overlay.classList.add('active');
        modal.classList.add('active');
    }

    closeModal() {
        const overlay = document.getElementById('modalOverlay');
        const modal = document.getElementById('modalDialog');

        overlay.classList.remove('active');
        modal.classList.remove('active');
    }

    getPanelData(panelType) {
        const dataMap = {
            'pv': {
                icon: '☀️',
                title: '光伏',
                items: [
                    { label: '功率1', value: '2.84kW' },
                    { label: '功率2', value: '2.50kW' },
                    { label: '电压1', value: '400.32V' },
                    { label: '电压2', value: '400.26V' },
                    { label: '电流1', value: '5.18A' },
                    { label: '电流2', value: '6.24A' },
                    { label: '总功率', value: '5.34kW' },
                    { label: '今日发电量', value: '12.94kWh' }
                ]
            },
            'grid': {
                icon: '🔌',
                title: '电网',
                items: [
                    { label: '功率', value: '3.32kW' },
                    { label: '电压', value: '232.08V' },
                    { label: '电流', value: '4.77A' },
                    { label: '频率', value: '50.00Hz' },
                    { label: '今日购电', value: '9.74kWh' },
                    { label: '今日卖电', value: '0.00kWh' }
                ]
            },
            'charging': {
                icon: '🔋',
                title: '充电桩',
                items: [
                    { label: '功率1', value: '2.55kW' },
                    { label: '电压1', value: '232.00V' },
                    { label: '电流1', value: '11.02A' },
                    { label: '充电状态', value: '充电中' },
                    { label: '今日充电量', value: '17.83kWh' },
                    { label: '充电时长', value: '5h 23m' }
                ]
            },
            'load': {
                icon: '🏠',
                title: '家庭负载',
                items: [
                    { label: '关键负载', value: '1.23kW' },
                    { label: '关键电压', value: '232.42V' },
                    { label: '关键电流', value: '5.30A' },
                    { label: '普通负载', value: '1.58kW' },
                    { label: '普通电压', value: '232.42V' },
                    { label: '普通电流', value: '6.81A' },
                    { label: '总负载', value: '2.81kW' },
                    { label: '今日用电', value: '26.45kWh' }
                ]
            },
            'battery': {
                icon: '🔋',
                title: '电池',
                items: [
                    { label: '功率', value: '0.00kW' },
                    { label: '电压', value: '0.00V' },
                    { label: '电流', value: '0.91V' },
                    { label: '电量(SOC)', value: '24%' },
                    { label: '健康度(SOH)', value: '100%' },
                    { label: '平均温度', value: '22°C' },
                    { label: '今日充电', value: '12.94kWh' },
                    { label: '今日放电', value: '0.00kWh' }
                ]
            }
        };

        return dataMap[panelType] || { icon: '📊', title: '设备', items: [] };
    }

    generateModalContent(data) {
        let html = '<div class="modal-data-grid">';

        data.items.forEach(item => {
            html += `
                <div class="modal-data-item">
                    <div class="modal-data-label">${item.label}</div>
                    <div class="modal-data-value">${item.value}</div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }
}

// 能量流动动画
class EnergyFlowAnimation {
    constructor() {
        this.svgNS = "http://www.w3.org/2000/svg";
        this.init();
    }

    init() {
        // 在house-container中创建SVG
        const houseContainer = document.querySelector('.house-container');
        if (!houseContainer) return;

        // 创建SVG元素
        this.svg = document.createElementNS(this.svgNS, 'svg');
        this.svg.setAttribute('class', 'energy-flow-line');
        this.svg.style.width = '100%';
        this.svg.style.height = '100%';
        this.svg.style.position = 'absolute';
        this.svg.style.top = '0';
        this.svg.style.left = '0';

        houseContainer.appendChild(this.svg);

        // 添加电网负荷指示器
        this.addGridLoadIndicator(houseContainer);

        // 启动动画
        this.startAnimation();
    }

    addGridLoadIndicator(container) {
        const indicator = document.createElement('div');
        indicator.className = 'grid-load-indicator';
        indicator.innerHTML = `
            <div class="grid-load-label">电网负荷</div>
            <div class="grid-load-value">15.00%</div>
        `;
        container.appendChild(indicator);
    }

    startAnimation() {
        // 创建动画路径
        this.createFlowPath([
            { x: '20%', y: '15%' }, // 光伏位置
            { x: '50%', y: '45%' }  // 中心
        ], '#4CAF50', 0);

        this.createFlowPath([
            { x: '50%', y: '45%' }, // 中心
            { x: '80%', y: '50%' }  // 负载
        ], '#2196F3', 0.5);

        this.createFlowPath([
            { x: '50%', y: '45%' }, // 中心
            { x: '30%', y: '70%' }  // 充电桩
        ], '#FF9800', 1);

        this.createFlowPath([
            { x: '50%', y: '45%' }, // 中心
            { x: '70%', y: '75%' }  // 电池
        ], '#9C27B0', 1.5);
    }

    createFlowPath(points, color, delay) {
        // 创建路径
        const path = document.createElementNS(this.svgNS, 'path');
        const d = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
        path.setAttribute('d', d);
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', '2');
        path.setAttribute('opacity', '0.3');

        this.svg.appendChild(path);

        // 创建移动的粒子
        this.createParticle(points, color, delay);
    }

    createParticle(points, color, delay) {
        const particle = document.createElementNS(this.svgNS, 'circle');
        particle.setAttribute('r', '4');
        particle.setAttribute('fill', color);
        particle.setAttribute('class', 'energy-flow-particle');
        particle.style.animationDelay = `${delay}s`;

        this.svg.appendChild(particle);

        // 设置粒子沿路径移动
        this.animateParticle(particle, points);
    }

    animateParticle(particle, points) {
        const animateMotion = document.createElementNS(this.svgNS, 'animateMotion');
        animateMotion.setAttribute('dur', '3s');
        animateMotion.setAttribute('repeatCount', 'indefinite');

        const path = document.createElementNS(this.svgNS, 'mpath');
        const pathElement = document.createElementNS(this.svgNS, 'path');
        const d = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
        pathElement.setAttribute('d', d);
        pathElement.setAttribute('id', `path-${Math.random()}`);

        this.svg.appendChild(pathElement);
        path.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${pathElement.id}`);
        animateMotion.appendChild(path);
        particle.appendChild(animateMotion);
    }
}

// 实时数据模拟更新
class DataSimulator {
    constructor() {
        this.init();
    }

    init() {
        // 每5秒更新一次数据
        setInterval(() => {
            this.updateData();
        }, 5000);
    }

    updateData() {
        // 更新光伏数据
        this.updatePanelValue('pv', this.randomValue(4, 8));

        // 更新电网数据
        this.updatePanelValue('grid', this.randomValue(2, 5));

        // 更新充电桩数据
        this.updatePanelValue('charging', this.randomValue(2, 5));

        // 更新家庭负载
        this.updatePanelValue('load', this.randomValue(2, 4));

        // 更新电池数据
        this.updatePanelValue('battery', this.randomValue(0, 2));

        // 更新电网负荷百分比
        this.updateGridLoad();
    }

    randomValue(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2);
    }

    updatePanelValue(panelType, value) {
        const panel = document.querySelector(`.data-panel[data-panel="${panelType}"]`);
        if (!panel) return;

        const mainValue = panel.querySelector('.main-value-number');
        if (mainValue) {
            const unit = mainValue.querySelector('.main-value-unit');
            const unitText = unit ? unit.textContent : 'kw';
            mainValue.innerHTML = `${value}<span class="main-value-unit">${unitText}</span>`;
        }
    }

    updateGridLoad() {
        const indicator = document.querySelector('.grid-load-value');
        if (indicator) {
            const value = this.randomValue(10, 20);
            indicator.textContent = `${value}%`;
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化弹窗
    new DataPanelModal();

    // 初始化能量流动动画
    new EnergyFlowAnimation();

    // 初始化数据模拟器
    new DataSimulator();
});
