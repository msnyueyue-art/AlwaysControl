// 简单图表绘制库

class SimpleChart {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.padding = { top: 20, right: 20, bottom: 40, left: 60 };
    }

    // 绘制柱状图
    drawBarChart(data, options = {}) {
        const {
            barColor = '#52c41a',
            barWidth = 40,
            showValues = true,
            maxValue = null,
            unit = 'KG'
        } = options;

        // 清空画布
        this.ctx.clearRect(0, 0, this.width, this.height);

        // 计算绘图区域
        const chartWidth = this.width - this.padding.left - this.padding.right;
        const chartHeight = this.height - this.padding.top - this.padding.bottom;

        // 找到最大值
        const max = maxValue || Math.max(...data.map(d => d.value));

        // 绘制网格线
        this.drawGrid(max, chartHeight);

        // 绘制柱子
        const barSpacing = chartWidth / data.length;
        const actualBarWidth = Math.min(barWidth, barSpacing * 0.8);

        const points = [];

        data.forEach((item, index) => {
            const barHeight = (item.value / max) * chartHeight;
            const x = this.padding.left + barSpacing * index + (barSpacing - actualBarWidth) / 2;
            const y = this.padding.top + chartHeight - barHeight;

            // 绘制柱子
            this.ctx.fillStyle = barColor;
            this.ctx.fillRect(x, y, actualBarWidth, barHeight);

            // 绘制标签
            this.ctx.fillStyle = '#666';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(item.label, x + actualBarWidth / 2, this.height - 10);

            // 绘制数值
            if (showValues) {
                this.ctx.fillStyle = '#333';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.fillText(item.value.toFixed(3), x + actualBarWidth / 2, y - 5);
            }

            // 保存数据点
            points.push({
                x: x + actualBarWidth / 2,
                y: y,
                data: item
            });
        });

        // 绘制Y轴标签
        this.drawYAxis(max, unit);

        // 保存点数据供tooltip使用
        this.dataPoints = points;
    }

    // 绘制网格线
    drawGrid(maxValue, chartHeight) {
        const steps = 5;
        const stepValue = maxValue / steps;

        this.ctx.strokeStyle = '#f0f0f0';
        this.ctx.lineWidth = 1;

        for (let i = 0; i <= steps; i++) {
            const y = this.padding.top + (chartHeight / steps) * i;

            this.ctx.beginPath();
            this.ctx.moveTo(this.padding.left, y);
            this.ctx.lineTo(this.width - this.padding.right, y);
            this.ctx.stroke();
        }
    }

    // 绘制Y轴
    drawYAxis(maxValue, unit = 'KG') {
        const steps = 5;
        const stepValue = maxValue / steps;
        const chartHeight = this.height - this.padding.top - this.padding.bottom;

        this.ctx.fillStyle = '#666';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'right';

        for (let i = 0; i <= steps; i++) {
            const value = maxValue - (stepValue * i);
            const y = this.padding.top + (chartHeight / steps) * i;

            this.ctx.fillText(value.toFixed(1) + ' ' + unit, this.padding.left - 10, y + 4);
        }
    }

    // 绘制折线图
    drawLineChart(data, options = {}) {
        const {
            lineColor = '#1890ff',
            fillColor = 'rgba(24, 144, 255, 0.1)',
            lineWidth = 2,
            showPoints = true,
            maxValue = null
        } = options;

        // 清空画布
        this.ctx.clearRect(0, 0, this.width, this.height);

        const chartWidth = this.width - this.padding.left - this.padding.right;
        const chartHeight = this.height - this.padding.top - this.padding.bottom;

        // 找到最大值
        const max = maxValue || Math.max(...data.map(d => d.value));

        // 绘制网格
        this.drawGrid(max, chartHeight);

        // 绘制填充区域
        const points = data.map((item, index) => {
            const x = this.padding.left + (chartWidth / (data.length - 1)) * index;
            const y = this.padding.top + chartHeight - (item.value / max) * chartHeight;
            return { x, y };
        });

        // 绘制填充
        this.ctx.fillStyle = fillColor;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, this.padding.top + chartHeight);

        points.forEach(point => {
            this.ctx.lineTo(point.x, point.y);
        });

        this.ctx.lineTo(points[points.length - 1].x, this.padding.top + chartHeight);
        this.ctx.closePath();
        this.ctx.fill();

        // 绘制线条
        this.ctx.strokeStyle = lineColor;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);

        points.forEach(point => {
            this.ctx.lineTo(point.x, point.y);
        });

        this.ctx.stroke();

        // 绘制点
        if (showPoints) {
            points.forEach(point => {
                this.ctx.fillStyle = lineColor;
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
                this.ctx.fill();
            });
        }

        // 绘制Y轴
        this.drawYAxis(max);
    }

    // 绘制面积图 (Area Chart) - 灰蓝色渐变
    drawAreaChart(data, options = {}) {
        const {
            lineColor = '#6ba3d0',
            gradientStart = '#a8c5da',
            gradientEnd = '#e8f1f7',
            lineWidth = 2,
            maxValue = null,
            unit = 'kW'
        } = options;

        // 清空画布
        this.ctx.clearRect(0, 0, this.width, this.height);

        const chartWidth = this.width - this.padding.left - this.padding.right;
        const chartHeight = this.height - this.padding.top - this.padding.bottom;

        // 找到最大值
        const max = maxValue || Math.max(...data.map(d => d.value));

        // 绘制网格
        this.drawGrid(max, chartHeight);

        // 计算所有数据点
        const points = data.map((item, index) => {
            const x = this.padding.left + (chartWidth / (data.length - 1)) * index;
            const y = this.padding.top + chartHeight - (item.value / max) * chartHeight;
            return { x, y, data: item };
        });

        // 创建渐变填充
        const gradient = this.ctx.createLinearGradient(0, this.padding.top, 0, this.padding.top + chartHeight);
        gradient.addColorStop(0, gradientStart);
        gradient.addColorStop(1, gradientEnd);

        // 绘制填充区域
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, this.padding.top + chartHeight);

        points.forEach(point => {
            this.ctx.lineTo(point.x, point.y);
        });

        this.ctx.lineTo(points[points.length - 1].x, this.padding.top + chartHeight);
        this.ctx.closePath();
        this.ctx.fill();

        // 绘制顶部线条
        this.ctx.strokeStyle = lineColor;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);

        points.forEach(point => {
            this.ctx.lineTo(point.x, point.y);
        });

        this.ctx.stroke();

        // 绘制X轴标签
        this.drawXAxisLabels(data);

        // 绘制Y轴
        this.drawYAxis(max, unit);

        // 保存点数据供tooltip使用
        this.dataPoints = points;
    }

    // 绘制堆叠柱状图 - 黄绿双色
    drawStackedBarChart(data, options = {}) {
        const {
            color1 = '#faad14', // 黄色 - 卖电收益
            color2 = '#52c41a', // 绿色 - 自营电能
            barWidth = 30,
            maxValue = null,
            unit = 'RM'
        } = options;

        // 清空画布
        this.ctx.clearRect(0, 0, this.width, this.height);

        const chartWidth = this.width - this.padding.left - this.padding.right;
        const chartHeight = this.height - this.padding.top - this.padding.bottom;

        // 找到最大叠加值
        const max = maxValue || Math.max(...data.map(d => (d.value1 || 0) + (d.value2 || 0)));

        // 绘制网格
        this.drawGrid(max, chartHeight);

        // 绘制堆叠柱子
        const barSpacing = chartWidth / data.length;
        const actualBarWidth = Math.min(barWidth, barSpacing * 0.7);

        const points = [];

        data.forEach((item, index) => {
            const x = this.padding.left + barSpacing * index + (barSpacing - actualBarWidth) / 2;

            const value1 = item.value1 || 0;
            const value2 = item.value2 || 0;
            const totalValue = value1 + value2;

            // 计算高度
            const totalHeight = (totalValue / max) * chartHeight;
            const height1 = (value1 / max) * chartHeight;
            const height2 = (value2 / max) * chartHeight;

            const y = this.padding.top + chartHeight - totalHeight;

            // 绘制第二部分（绿色 - 底部）
            this.ctx.fillStyle = color2;
            this.ctx.fillRect(x, y, actualBarWidth, height2);

            // 绘制第一部分（黄色 - 顶部）
            this.ctx.fillStyle = color1;
            this.ctx.fillRect(x, y + height2, actualBarWidth, height1);

            // 保存数据点
            points.push({
                x: x + actualBarWidth / 2,
                y: y,
                data: item,
                value1,
                value2
            });
        });

        // 绘制X轴标签
        this.drawXAxisLabels(data);

        // 绘制Y轴
        this.drawYAxis(max, unit);

        // 保存点数据供tooltip使用
        this.dataPoints = points;
    }

    // 绘制X轴标签
    drawXAxisLabels(data) {
        const chartWidth = this.width - this.padding.left - this.padding.right;
        const spacing = chartWidth / (data.length - 1);

        this.ctx.fillStyle = '#666';
        this.ctx.font = '11px Arial';
        this.ctx.textAlign = 'center';

        data.forEach((item, index) => {
            const x = this.padding.left + spacing * index;
            this.ctx.fillText(item.label, x, this.height - 15);
        });
    }

    // 获取鼠标位置对应的数据点
    getDataPointAtPosition(x, y) {
        if (!this.dataPoints || this.dataPoints.length === 0) return null;

        const chartHeight = this.height - this.padding.top - this.padding.bottom;

        // 检查是否在图表区域内
        if (y < this.padding.top || y > this.padding.top + chartHeight) {
            return null;
        }

        // 查找最近的数据点
        let closest = null;
        let minDistance = Infinity;

        this.dataPoints.forEach(point => {
            const distance = Math.abs(point.x - x);
            if (distance < minDistance && distance < 30) { // 30px容差
                minDistance = distance;
                closest = point;
            }
        });

        return closest;
    }
}

// 全局导出
window.SimpleChart = SimpleChart;
