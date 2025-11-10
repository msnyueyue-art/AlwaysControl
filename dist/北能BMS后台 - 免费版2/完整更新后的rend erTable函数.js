// 完整的 renderTable 函数 - 替换device-management.html中原有的renderTable函数

function renderTable() {
    const tbody = document.getElementById('deviceTableBody');
    tbody.innerHTML = '';

    currentDevices.forEach(device => {
        const row = document.createElement('tr');

        // SOC 等级样式
        let socClass = 'high';
        if (device.soc < 30) socClass = 'low';
        else if (device.soc < 60) socClass = 'medium';

        // SOH 等级样式
        let sohClass = 'good';
        if (device.soh < 85) sohClass = 'poor';
        else if (device.soh < 92) sohClass = 'fair';

        // 状态显示
        const statusLabels = {
            'charging': '充电',
            'discharging': '放电',
            'standby': '待机',
            'offline': '离线'
        };

        row.innerHTML = `
            <td>
                <input type="checkbox" class="device-checkbox" value="${device.id}"
                       onchange="toggleDeviceSelect(this, '${device.id}')"
                       ${selectedDevices.has(device.id) ? 'checked' : ''}
                       style="cursor: pointer;">
            </td>
            <td><span class="device-id">${device.id}</span></td>
            <td><span class="device-name">${device.name}</span></td>
            <td><span class="soc-value ${socClass}">${device.soc}%</span></td>
            <td><span class="soh-value ${sohClass}">${device.soh}%</span></td>
            <td>
                <div class="status-indicator ${device.status}">
                    <span class="status-dot"></span>
                    <span>${statusLabels[device.status]}</span>
                </div>
            </td>
            <td>${device.createTime || '2024-01-01 00:00:00'}</td>
            <td>
                <div class="table-actions">
                    <button class="table-action-btn" title="查看详情" onclick="viewDevice('${device.id}')">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                    </button>
                    <button class="table-action-btn" title="编辑" onclick="editDevice('${device.id}')">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                    </button>
                    <button class="table-action-btn delete" title="删除" onclick="deleteDevice('${device.id}')">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(row);
    });

    // 更新统计信息
    document.getElementById('totalCount').textContent = currentDevices.length;
    document.getElementById('totalItems').textContent = currentDevices.length;
}
