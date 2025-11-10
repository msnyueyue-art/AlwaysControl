import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Download, Clipboard } from 'lucide-react';

// 操作日志数据类型
interface OperationLog {
  id: number;
  deviceId: string;
  module: string;
  type: 'modify' | 'add' | 'delete' | 'upgrade';
  typeName: string;
  content: string;
  operator: string;
  operateTime: string;
}

// 标签样式映射
const tagStyles = {
  modify: 'bg-blue-50 text-blue-600',
  add: 'bg-green-50 text-green-600',
  delete: 'bg-red-50 text-red-600',
  upgrade: 'bg-orange-50 text-orange-600'
};

export default function OperationLogs() {
  // 筛选条件状态
  const [searchKeyword, setSearchKeyword] = useState('');
  const [operationType, setOperationType] = useState<string>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 模拟操作日志数据
  const mockLogs: OperationLog[] = [
    {
      id: 1,
      deviceId: 'BMS001',
      module: '设备管理',
      type: 'modify',
      typeName: '修改指令',
      content: '修改设备充电参数:最大充电电流从80A调整为100A',
      operator: '管理员',
      operateTime: '2025-10-29 14:32:15'
    },
    {
      id: 2,
      deviceId: 'BMS002',
      module: '告警管理',
      type: 'add',
      typeName: '添加',
      content: '添加新的告警规则:SOC低于10%触发严重告警',
      operator: '管理员',
      operateTime: '2025-10-29 13:18:42'
    },
    {
      id: 3,
      deviceId: 'BMS003',
      module: '设备管理',
      type: 'delete',
      typeName: '删除',
      content: '删除离线设备BMS-C区-01',
      operator: '管理员',
      operateTime: '2025-10-29 11:25:33'
    },
    {
      id: 4,
      deviceId: 'BMS004',
      module: '设备管理',
      type: 'upgrade',
      typeName: '升级',
      content: 'OTA固件升级:版本v1.2.3升级至v1.2.4',
      operator: '管理员',
      operateTime: '2025-10-29 10:45:18'
    },
    {
      id: 5,
      deviceId: 'BMS005',
      module: '保护参数',
      type: 'modify',
      typeName: '修改指令',
      content: '修改一级保护参数:过压告警值从3600mV调整为3650mV',
      operator: '管理员',
      operateTime: '2025-10-29 09:52:07'
    },
    {
      id: 6,
      deviceId: 'BMS006',
      module: '设备管理',
      type: 'add',
      typeName: '添加',
      content: '新增设备BMS-F区-03',
      operator: '管理员',
      operateTime: '2025-10-28 16:38:29'
    },
    {
      id: 7,
      deviceId: 'BMS007',
      module: '逆变器参数',
      type: 'modify',
      typeName: '修改指令',
      content: '修改逆变器通信协议:CANBUS从Pylon切换为Growatt',
      operator: '管理员',
      operateTime: '2025-10-28 15:22:51'
    },
    {
      id: 8,
      deviceId: 'BMS008',
      module: '告警管理',
      type: 'modify',
      typeName: '修改指令',
      content: '标记告警ALM005为已解决状态',
      operator: '管理员',
      operateTime: '2025-10-28 14:10:44'
    },
    {
      id: 9,
      deviceId: 'BMS009',
      module: '设备管理',
      type: 'upgrade',
      typeName: '升级',
      content: '批量OTA升级:5台设备从v1.2.2升级至v1.2.3',
      operator: '管理员',
      operateTime: '2025-10-28 10:05:33'
    },
    {
      id: 10,
      deviceId: 'BMS010',
      module: '保护参数',
      type: 'modify',
      typeName: '修改指令',
      content: '导出一级(MCU)保护参数配置',
      operator: '管理员',
      operateTime: '2025-10-27 17:48:16'
    }
  ];

  // 筛选逻辑
  const filteredLogs = useMemo(() => {
    let result = [...mockLogs];

    // 关键词筛选
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      result = result.filter(
        log =>
          log.content.toLowerCase().includes(keyword) ||
          log.module.toLowerCase().includes(keyword) ||
          log.deviceId.toLowerCase().includes(keyword)
      );
    }

    // 操作类型筛选
    if (operationType !== 'all') {
      result = result.filter(log => log.type === operationType);
    }

    // 日期范围筛选
    if (startDate && endDate) {
      result = result.filter(log => {
        const logDate = log.operateTime.split(' ')[0];
        return logDate >= startDate && logDate <= endDate;
      });
    }

    return result;
  }, [searchKeyword, operationType, startDate, endDate]);

  // 分页逻辑
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredLogs.slice(start, end);
  }, [filteredLogs, currentPage]);

  const totalPages = Math.ceil(filteredLogs.length / pageSize);

  // 重置筛选
  const handleReset = () => {
    setSearchKeyword('');
    setOperationType('all');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  // 全选/取消全选
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(paginatedLogs.map(log => log.id));
      setSelectedRows(allIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  // 单行选择
  const handleSelectRow = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  // 导出功能
  const handleExport = () => {
    if (selectedRows.size === 0) {
      alert('请先选择要导出的日志');
      return;
    }

    // 构建CSV内容
    let csvContent = '\uFEFF设备ID,操作模块,操作类型,操作内容,操作人,操作时间\n';

    const selectedLogs = paginatedLogs.filter(log => selectedRows.has(log.id));
    selectedLogs.forEach(log => {
      const row = [
        log.deviceId,
        log.module,
        log.typeName,
        log.content,
        log.operator,
        log.operateTime
      ].join(',');
      csvContent += row + '\n';
    });

    // 创建下载
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 10);

    link.setAttribute('href', url);
    link.setAttribute('download', `操作日志_${timestamp}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('操作日志导出成功!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">操作日志</h1>
      </div>

      <div className="bg-[#18181B] rounded-lg p-6">
        {/* 筛选区域 */}
        <div className="flex flex-wrap gap-4 mb-5">
          {/* 关键词搜索 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400 font-medium">关键词搜索</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="搜索操作内容"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                className="w-[280px] h-9 pl-10 pr-3 bg-[#27272A] border border-[#3F3F46] rounded-md text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 操作类型 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400 font-medium">操作类型</label>
            <select
              value={operationType}
              onChange={e => setOperationType(e.target.value)}
              className="w-[180px] h-9 px-3 bg-[#27272A] border border-[#3F3F46] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
            >
              <option value="all">全部</option>
              <option value="modify">修改指令</option>
              <option value="add">添加</option>
              <option value="delete">删除</option>
              <option value="upgrade">升级</option>
            </select>
          </div>

          {/* 日期范围 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400 font-medium">日期范围</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-[150px] h-9 px-3 bg-[#27272A] border border-[#3F3F46] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
              />
              <span className="text-zinc-500">-</span>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-[150px] h-9 px-3 bg-[#27272A] border border-[#3F3F46] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
              />
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-end gap-3">
            <button
              onClick={() => setCurrentPage(1)}
              className="h-9 px-5 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              查询
            </button>
            <button
              onClick={handleReset}
              className="h-9 px-5 bg-[#27272A] text-white border border-[#3F3F46] rounded-md text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              重置
            </button>
          </div>
        </div>

        {/* 导出按钮 */}
        <div className="flex justify-between items-center mb-5">
          <button
            onClick={handleExport}
            className="h-9 px-5 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            导出
          </button>
        </div>

        {/* 表格 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#27272A] border-b border-[#3F3F46]">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedLogs.length && paginatedLogs.length > 0}
                    onChange={e => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">设备ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">操作模块</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">操作类型</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">操作内容</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">操作人</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">操作时间</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.map(log => (
                <tr
                  key={log.id}
                  className="border-b border-[#27272A] hover:bg-[#27272A] transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(log.id)}
                      onChange={e => handleSelectRow(log.id, e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-600 bg-zinc-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-300">{log.deviceId}</td>
                  <td className="px-4 py-3 text-sm text-zinc-300">{log.module}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${tagStyles[log.type]}`}>
                      {log.typeName}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-300">{log.content}</td>
                  <td className="px-4 py-3 text-sm text-zinc-300">{log.operator}</td>
                  <td className="px-4 py-3 text-sm text-zinc-300">{log.operateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div className="flex justify-between items-center mt-5">
          <div className="text-sm text-zinc-400">
            显示 {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredLogs.length)} 条，共 {filteredLogs.length} 条
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 border border-[#3F3F46] bg-[#27272A] rounded flex items-center justify-center text-white hover:border-purple-600 hover:text-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 border rounded flex items-center justify-center text-sm transition-colors ${
                  currentPage === page
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-[#3F3F46] bg-[#27272A] text-white hover:border-purple-600 hover:text-purple-600'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 border border-[#3F3F46] bg-[#27272A] rounded flex items-center justify-center text-white hover:border-purple-600 hover:text-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
