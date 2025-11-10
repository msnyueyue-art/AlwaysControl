// 历史数据页面交互功能

// 标签页管理器
class TabManager {
    constructor() {
        this.currentTab = 'energy'; // energy, income, carbon
        this.init();
    }

    init() {
        // 绑定标签页点击事件
        document.querySelectorAll('.tab-item').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabType = tab.getAttribute('data-tab');
                this.switchTab(tabType);
            });
        });
    }

    switchTab(tabType) {
        // 移除所有激活状态
        document.querySelectorAll('.tab-item').forEach(tab => {
            tab.classList.remove('active');
        });

        // 激活选中的标签
        const selectedTab = document.querySelector(`.tab-item[data-tab="${tabType}"]`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        this.currentTab = tabType;

        // 更新图表内容
        this.updateChartContent(tabType);

        // 更新KPI卡片显示/隐藏
        this.toggleKPICards(tabType);
        this.updateKPICards(tabType);

        // 更新图例
        this.updateLegend(tabType);
    }

    updateChartContent(tabType) {
        const chartContainer = document.getElementById('chartCanvas');
        if (!chartContainer) return;

        const chart = new SimpleChart('chartCanvas');

        switch(tabType) {
            case 'energy':
                this.drawEnergyChart(chart);
                break;
            case 'income':
                this.drawIncomeChart(chart);
                break;
            case 'carbon':
                this.drawCarbonChart(chart);
                break;
        }
    }

    drawEnergyChart(chart) {
        // 能量统计面积图 - 灰蓝色渐变
        const data = [];
        for (let i = 0; i < 24; i++) {
            let value = 0;
            // 模拟能量曲线：夜间低，白天高
            if (i >= 0 && i < 6) {
                value = 1.0 + Math.random() * 0.5;
            } else if (i >= 6 && i < 12) {
                value = 2.0 + Math.random() * 1.0;
            } else if (i >= 12 && i < 18) {
                value = 2.5 + Math.random() * 0.8;
            } else {
                value = 1.5 + Math.random() * 0.7;
            }
            data.push({
                label: `${i < 10 ? '0' + i : i}:00`,
                value: value,
                deviceName: 'GridOutput'
            });
        }

        chart.drawAreaChart(data, {
            lineColor: '#6ba3d0',
            gradientStart: '#a8c5da',
            gradientEnd: '#e8f1f7',
            lineWidth: 2,
            maxValue: 4.0,
            unit: 'kW'
        });
    }

    drawIncomeChart(chart) {
        // 收益统计堆叠柱状图 - 黄绿双色（月度数据）
        const data = [];
        for (let i = 1; i <= 12; i++) {
            // 模拟月度收益数据
            const sellIncome = Math.random() * 50 + 20; // 卖电收益（黄色）20-70
            const selfIncome = 100 + Math.random() * 100 + i * 10; // 自营电能（绿色）递增

            data.push({
                label: `${i}月`,
                value1: sellIncome,  // 卖电收益
                value2: selfIncome,  // 自营电能
                name1: '卖电收益',
                name2: '自营电能'
            });
        }

        chart.drawStackedBarChart(data, {
            color1: '#faad14',
            color2: '#52c41a',
            barWidth: 40,
            maxValue: 350,
            unit: 'RM'
        });
    }

    drawCarbonChart(chart) {
        // 碳减排柱状图 - 绿色（月度数据）
        const data = [];
        for (let i = 1; i <= 12; i++) {
            // 模拟月度碳减排数据
            const value = 150 + Math.random() * 100 + i * 15; // 递增趋势
            data.push({
                label: `${i}月`,
                value: value,
                carbonType: 'carbon'
            });
        }

        chart.drawBarChart(data, {
            barColor: '#52c41a',
            barWidth: 40,
            showValues: false,
            maxValue: 500,
            unit: 'kg'
        });
    }

    toggleKPICards(tabType) {
        const kpiContainer = document.querySelector('.kpi-card').parentElement;
        if (!kpiContainer) return;

        // 能量统计显示KPI卡片，收益统计和绿色减排隐藏
        if (tabType === 'energy') {
            kpiContainer.style.display = 'grid';
        } else {
            kpiContainer.style.display = 'none';
        }
    }

    updateKPICards(tabType) {
        // 只在能量统计标签页更新KPI数据
        if (tabType !== 'energy') return;

        const kpiData = {
            '家庭负载': '27.738kWh',
            '光伏': '12.551kWh',
            '电网': '26.348kWh',
            '电池': '0.000kWh',
            '充电桩': '11.161kWh'
        };

        document.querySelectorAll('.kpi-card').forEach(card => {
            const name = card.querySelector('.kpi-name').textContent;
            const valueElement = card.querySelector('.kpi-value');
            if (kpiData[name]) {
                valueElement.textContent = kpiData[name];
            }
        });
    }

    updateLegend(tabType) {
        const legendContainer = document.getElementById('chartLegend');
        if (!legendContainer) return;

        const legends = {
            'energy': [
                { color: '#6ba3d0', label: 'GridOutput', icon: '⚡' }
            ],
            'income': [
                { color: '#faad14', label: '卖电收益', icon: '💰' },
                { color: '#52c41a', label: '自营电能', icon: '🏠' }
            ],
            'carbon': [
                { color: '#52c41a', label: '碳减排量', icon: '🌱' }
            ]
        };

        const currentLegends = legends[tabType] || [];

        // 清空并重新生成图例
        legendContainer.innerHTML = currentLegends.map(item => `
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background: ${item.color}; border-radius: 3px;"></div>
                <span style="font-size: 13px; color: #666;">${item.icon} ${item.label}</span>
            </div>
        `).join('');
    }
}

// KPI卡片管理器 - 点击切换图表
class KPICardManager {
    constructor() {
        this.selectedCard = null;
        this.init();
    }

    init() {
        // 绑定KPI卡片点击事件
        document.querySelectorAll('.kpi-card').forEach(card => {
            card.addEventListener('click', () => {
                this.selectCard(card);
            });
        });
    }

    selectCard(card) {
        // 移除其他卡片的选中状态
        document.querySelectorAll('.kpi-card').forEach(c => {
            c.classList.remove('selected');
        });

        // 选中当前卡片
        card.classList.add('selected');
        this.selectedCard = card;

        // 获取设备类型
        const deviceType = card.getAttribute('data-device');

        // 更新图表显示该设备的详细数据
        this.updateChartForDevice(deviceType);
    }

    updateChartForDevice(deviceType) {
        const chart = new SimpleChart('chartCanvas');

        // 根据设备类型生成对应的图表数据
        const data = this.generateDeviceData(deviceType);

        chart.drawLineChart(data, {
            lineColor: this.getDeviceColor(deviceType),
            fillColor: this.getDeviceFillColor(deviceType),
            showPoints: true
        });

        // 更新图表标题
        this.updateChartTitle(deviceType);
    }

    generateDeviceData(deviceType) {
        const data = [];

        // 根据不同设备生成不同的数据模式
        const patterns = {
            'load': { base: 2.5, variance: 0.5, trend: 0 },
            'pv': { base: 1.5, variance: 1.0, trend: 0.1 },
            'grid': { base: 3.0, variance: 0.8, trend: -0.05 },
            'battery': { base: 0.5, variance: 0.3, trend: 0 },
            'charging': { base: 2.0, variance: 0.6, trend: 0.05 }
        };

        const pattern = patterns[deviceType] || patterns['load'];

        for (let i = 0; i < 24; i++) {
            let value = pattern.base + Math.random() * pattern.variance + i * pattern.trend;
            if (value < 0) value = 0;

            data.push({
                label: `${i < 10 ? '0' + i : i}:00`,
                value: value
            });
        }

        return data;
    }

    getDeviceColor(deviceType) {
        const colors = {
            'load': '#722ed1',
            'pv': '#faad14',
            'grid': '#1890ff',
            'battery': '#52c41a',
            'charging': '#fa8c16'
        };
        return colors[deviceType] || '#1890ff';
    }

    getDeviceFillColor(deviceType) {
        const colors = {
            'load': 'rgba(114, 46, 209, 0.1)',
            'pv': 'rgba(250, 173, 20, 0.1)',
            'grid': 'rgba(24, 144, 255, 0.1)',
            'battery': 'rgba(82, 196, 26, 0.1)',
            'charging': 'rgba(250, 140, 22, 0.1)'
        };
        return colors[deviceType] || 'rgba(24, 144, 255, 0.1)';
    }

    updateChartTitle(deviceType) {
        const names = {
            'load': '家庭负载',
            'pv': '光伏发电',
            'grid': '电网',
            'battery': '电池',
            'charging': '充电桩'
        };

        const titleElement = document.querySelector('.chart-title');
        if (titleElement) {
            titleElement.textContent = `${names[deviceType] || ''}能源数据`;
        }
    }
}

// 图表交互管理器
class ChartInteractionManager {
    constructor(canvasId, tabManager) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.tabManager = tabManager;
        this.tooltip = this.createTooltip();
        this.highlightLine = this.createHighlightLine();
        this.init();
    }

    createTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            background: white;
            color: #333;
            padding: 10px 14px;
            border-radius: 6px;
            font-size: 13px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s;
            z-index: 1000;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
            line-height: 1.6;
            white-space: nowrap;
        `;
        document.body.appendChild(tooltip);
        return tooltip;
    }

    createHighlightLine() {
        const line = document.createElement('div');
        line.className = 'chart-highlight-line';
        line.style.cssText = `
            position: absolute;
            width: 1px;
            background: rgba(24, 144, 255, 0.4);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s;
            z-index: 999;
        `;
        this.canvas.parentElement.appendChild(line);
        return line;
    }

    init() {
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.hideTooltip();
            this.hideHighlightLine();
        });
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 获取图表实例和数据点
        const chart = new SimpleChart('chartCanvas');
        const dataPoint = chart.getDataPointAtPosition(x, y);

        if (dataPoint) {
            this.showHighlightLine(rect, dataPoint.x);
            this.showTooltip(e.clientX, e.clientY, dataPoint);
        } else {
            this.hideTooltip();
            this.hideHighlightLine();
        }
    }

    showHighlightLine(rect, x) {
        this.highlightLine.style.left = `${rect.left + x}px`;
        this.highlightLine.style.top = `${rect.top}px`;
        this.highlightLine.style.height = `${rect.height}px`;
        this.highlightLine.style.opacity = '1';
    }

    hideHighlightLine() {
        this.highlightLine.style.opacity = '0';
    }

    showTooltip(x, y, dataPoint) {
        const currentTab = this.tabManager ? this.tabManager.currentTab : 'energy';
        let content = '';

        if (currentTab === 'energy') {
            // 能量统计 Tooltip
            const deviceName = dataPoint.data.deviceName || 'GridOutput';
            const value = dataPoint.data.value.toFixed(2);
            content = `
                <div style="margin-bottom: 4px; color: #999;">时间: ${dataPoint.data.label}</div>
                <div style="font-weight: 600;">${deviceName}: ${value} kW</div>
            `;
        } else if (currentTab === 'income') {
            // 收益统计 Tooltip（月度）
            const sellIncome = (dataPoint.value1 || 0).toFixed(2);
            const selfIncome = (dataPoint.value2 || 0).toFixed(2);
            content = `
                <div style="margin-bottom: 4px; color: #999;">月份: ${dataPoint.data.label}</div>
                <div style="color: #faad14; font-weight: 600;">${dataPoint.data.name1}: ${sellIncome} RM</div>
                <div style="color: #52c41a; font-weight: 600;">${dataPoint.data.name2}: ${selfIncome} RM</div>
            `;
        } else if (currentTab === 'carbon') {
            // 碳减排 Tooltip（月度）
            const carbonValue = dataPoint.data.value.toFixed(2);
            content = `
                <div style="margin-bottom: 4px; color: #999;">月份: ${dataPoint.data.label}</div>
                <div style="font-weight: 600; color: #52c41a;">碳减排: ${carbonValue} kg</div>
            `;
        }

        this.tooltip.innerHTML = content;
        this.tooltip.style.left = `${x + 15}px`;
        this.tooltip.style.top = `${y - 60}px`;
        this.tooltip.style.opacity = '1';
    }

    hideTooltip() {
        this.tooltip.style.opacity = '0';
    }
}

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化标签页管理器
    const tabManager = new TabManager();

    // 初始化KPI卡片管理器
    const kpiManager = new KPICardManager();

    // 初始化图表交互（传入tabManager以获取当前tab信息）
    const chartInteraction = new ChartInteractionManager('chartCanvas', tabManager);

    // 绘制初始图表
    tabManager.drawEnergyChart(new SimpleChart('chartCanvas'));

    // 初始化图例
    tabManager.updateLegend('energy');
});
