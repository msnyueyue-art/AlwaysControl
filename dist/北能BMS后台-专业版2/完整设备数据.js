// 完整的模拟设备数据 - 替换device-management.html中的mockDevices数组

const mockDevices = [
    {
        id: 'BMS001',
        name: 'BMS - A区 - 01',
        soc: 85,
        soh: 98,
        status: 'charging',
        createTime: '2024-01-15 08:30:25',
        version: 'v1.2.3'
    },
    {
        id: 'BMS002',
        name: 'BMS - A区 - 02',
        soc: 72,
        soh: 96,
        status: 'discharging',
        createTime: '2024-01-18 09:15:42',
        version: 'v1.2.3'
    },
    {
        id: 'BMS003',
        name: 'BMS - B区 - 01',
        soc: 45,
        soh: 97,
        status: 'standby',
        createTime: '2024-02-05 14:22:11',
        version: 'v1.2.2'
    },
    {
        id: 'BMS004',
        name: 'BMS - B区 - 02',
        soc: 92,
        soh: 95,
        status: 'charging',
        createTime: '2024-02-10 10:48:33',
        version: 'v1.2.3'
    },
    {
        id: 'BMS005',
        name: 'BMS - C区 - 01',
        soc: 28,
        soh: 89,
        status: 'offline',
        createTime: '2024-02-20 16:05:57',
        version: 'v1.1.8'
    },
    {
        id: 'BMS006',
        name: 'BMS - C区 - 02',
        soc: 68,
        soh: 94,
        status: 'discharging',
        createTime: '2024-03-01 11:37:28',
        version: 'v1.2.3'
    },
    {
        id: 'BMS007',
        name: 'BMS - D区 - 01',
        soc: 91,
        soh: 99,
        status: 'charging',
        createTime: '2024-03-08 13:42:16',
        version: 'v1.2.4'
    },
    {
        id: 'BMS008',
        name: 'BMS - D区 - 02',
        soc: 55,
        soh: 92,
        status: 'standby',
        createTime: '2024-03-12 15:19:50',
        version: 'v1.2.3'
    },
    {
        id: 'BMS009',
        name: 'BMS - E区 - 01',
        soc: 78,
        soh: 97,
        status: 'discharging',
        createTime: '2024-03-18 08:55:34',
        version: 'v1.2.3'
    },
    {
        id: 'BMS010',
        name: 'BMS - E区 - 02',
        soc: 88,
        soh: 96,
        status: 'charging',
        createTime: '2024-03-25 12:28:45',
        version: 'v1.2.4'
    },
    {
        id: 'BMS011',
        name: 'BMS - F区 - 01',
        soc: 15,
        soh: 85,
        status: 'charging',
        createTime: '2024-04-02 09:10:22',
        version: 'v1.2.2'
    },
    {
        id: 'BMS012',
        name: 'BMS - F区 - 02',
        soc: 63,
        soh: 93,
        status: 'discharging',
        createTime: '2024-04-08 14:33:17',
        version: 'v1.2.3'
    }
];

let currentDevices = [...mockDevices];
let selectedDevices = new Set();
