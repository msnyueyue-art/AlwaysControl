import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Download, Check, Eye, CheckCircle, AlertCircle as AlertIcon } from 'lucide-react';

// 告警数据类型
interface Alarm {
  id: string;
  type: string;
  description: string;
  level: 'critical' | 'important' | 'normal';
  deviceName: string;
  deviceId: string;
  status: 'unsolved' | 'solved';
  alarmTime: string;
}

// 告警详情数据类型
interface AlarmDetail extends Alarm {
  currentValue?: string;
  threshold?: string;
  processingRecords?: Array<{
    time: string;
    content: string;
  }>;
}

// 级别和状态的标签样式
const levelStyles = {
  critical: 'bg-red-50 text-red-600',
  important: 'bg-orange-50 text-orange-600',
  normal: 'bg-blue-50 text-blue-600'
};

const levelLabels = {
  critical: '严重',
  important: '重要',
  normal: '一般'
};

const statusStyles = {
  unsolved: 'bg-red-50 text-red-600',
  solved: 'bg-green-50 text-green-600'
};

const statusLabels = {
  unsolved: '未解决',
  solved: '已解决'
};

export default function AlarmManagement() {
  // 筛选条件状态
  const [levelFilter, setLevelFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [deviceFilter, setDeviceFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedAlarms, setSelectedAlarms] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState<AlarmDetail | null>(null);
  const pageSize = 10;

  // 模拟告警数据
  const mockAlarms: Alarm[] = [
    {
      id: 'ALM001',
      type: '电压异常',
      description: '电池单体电压过高',
      level: 'critical',
      deviceName: 'BMS - A区 - 01',
      deviceId: 'BMS001',
      status: 'unsolved',
      alarmTime: '2025-10-28 15:45:23'
    },
    {
      id: 'ALM002',
      type: '温度异常',
      description: '电池温度超过阈值',
      level: 'important',
      deviceName: 'BMS - A区 - 02',
      deviceId: 'BMS002',
      status: 'unsolved',
      alarmTime: '2025-10-28 14:30:15'
    },
    {
      id: 'ALM003',
      type: '通讯故障',
      description: '设备通讯中断',
      level: 'critical',
      deviceName: 'BMS - B区 - 01',
      deviceId: 'BMS003',
      status: 'solved',
      alarmTime: '2025-10-28 12:15:42'
    },
    {
      id: 'ALM004',
      type: 'SOC异常',
      description: 'SOC值偏低',
      level: 'normal',
      deviceName: 'BMS - B区 - 02',
      deviceId: 'BMS004',
      status: 'solved',
      alarmTime: '2025-10-28 10:22:18'
    },
    {
      id: 'ALM005',
      type: '电流异常',
      description: '充电电流过大',
      level: 'important',
      deviceName: 'BMS - C区 - 01',
      deviceId: 'BMS005',
      status: 'unsolved',
      alarmTime: '2025-10-28 09:05:37'
    },
    {
      id: 'ALM006',
      type: '均衡异常',
      description: '电池均衡失败',
      level: 'normal',
      deviceName: 'BMS - C区 - 02',
      deviceId: 'BMS006',
      status: 'unsolved',
      alarmTime: '2025-10-27 18:50:11'
    },
    {
      id: 'ALM007',
      type: '电压异常',
      description: '电池单体电压过低',
      level: 'critical',
      deviceName: 'BMS - D区 - 01',
      deviceId: 'BMS007',
      status: 'solved',
      alarmTime: '2025-10-27 16:35:28'
    },
    {
      id: 'ALM008',
      type: '绝缘异常',
      description: '绝缘阻值异常',
      level: 'important',
      deviceName: 'BMS - D区 - 02',
      deviceId: 'BMS008',
      status: 'unsolved',
      alarmTime: '2025-10-27 14:20:55'
    }
  ];

  // 筛选逻辑
  const filteredAlarms = useMemo(() => {
    let result = [...mockAlarms];

    // 级别筛选
    if (levelFilter) {
      result = result.filter(alarm => alarm.level === levelFilter);
    }

    // 状态筛选
    if (statusFilter) {
      result = result.filter(alarm => alarm.status === statusFilter);
    }

    // 设备筛选
    if (deviceFilter) {
      const keyword = deviceFilter.toLowerCase();
      result = result.filter(
        alarm =>
          alarm.deviceName.toLowerCase().includes(keyword) ||
          alarm.deviceId.toLowerCase().includes(keyword)
      );
    }

    // 日期范围筛选
    if (startDate && endDate) {
      result = result.filter(alarm => {
        const alarmDate = alarm.alarmTime.split(' ')[0];
        return alarmDate >= startDate && alarmDate <= endDate;
      });
    }

    return result;
  }, [levelFilter, statusFilter, deviceFilter, startDate, endDate]);

  // 分页逻辑
  const paginatedAlarms = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredAlarms.slice(start, end);
  }, [filteredAlarms, currentPage]);

  const totalPages = Math.ceil(filteredAlarms.length / pageSize);

  // 重置筛选
  const handleReset = () => {
    setLevelFilter('');
    setStatusFilter('');
    setDeviceFilter('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  // 全选/取消全选
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(paginatedAlarms.map(alarm => alarm.id));
      setSelectedAlarms(allIds);
    } else {
      setSelectedAlarms(new Set());
    }
  };

  // 单行选择
  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedAlarms);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedAlarms(newSelected);
  };

  // 批量解决
  const handleBatchSolve = () => {
    if (selectedAlarms.size === 0) {
      alert('请先选择要解决的告警');
      return;
    }
    alert(`已批量解决 ${selectedAlarms.size} 条告警`);
    setSelectedAlarms(new Set());
  };

  // 导出功能
  const handleExport = () => {
    if (selectedAlarms.size === 0) {
      alert('请先选择要导出的告警');
      return;
    }
    alert('导出告警数据');
  };

  // 查看详情
  const handleViewDetail = (alarm: Alarm) => {
    // 模拟完整告警详情数据
    const detailData: AlarmDetail = {
      ...alarm,
      currentValue: alarm.type === '电压异常' ? '3.8V' : alarm.type === '温度异常' ? '55°C' : '异常值',
      threshold: alarm.type === '电压异常' ? '3.6V' : alarm.type === '温度异常' ? '50°C' : '阈值',
      processingRecords: [
        {
          time: alarm.alarmTime,
          content: '系统自动生成告警'
        }
      ]
    };
    setSelectedAlarm(detailData);
    setShowDetailModal(true);
  };

  // 解决单个告警
  const handleSolveAlarm = (id: string) => {
    alert(`告警 ${id} 已标记为已解决`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">告警管理</h1>
      </div>

      <div className="bg-[#18181B] rounded-lg p-6">
        {/* 筛选区域 */}
        <div className="mb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* 告警级别 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400 font-medium">告警级别</label>
              <select
                value={levelFilter}
                onChange={e => setLevelFilter(e.target.value)}
                className="h-10 px-3 bg-[#27272A] border border-[#3F3F46] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
              >
                <option value="">全部级别</option>
                <option value="critical">严重</option>
                <option value="important">重要</option>
                <option value="normal">一般</option>
              </select>
            </div>

            {/* 告警状态 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400 font-medium">告警状态</label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="h-10 px-3 bg-[#27272A] border border-[#3F3F46] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
              >
                <option value="">全部状态</option>
                <option value="unsolved">未解决</option>
                <option value="solved">已解决</option>
              </select>
            </div>

            {/* 设备 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400 font-medium">设备</label>
              <input
                type="text"
                placeholder="请输入设备名称"
                value={deviceFilter}
                onChange={e => setDeviceFilter(e.target.value)}
                className="h-10 px-3 bg-[#27272A] border border-[#3F3F46] rounded-md text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* 时间范围 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400 font-medium">时间范围</label>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="h-10 px-3 bg-[#27272A] border border-[#3F3F46] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                />
                <span className="text-zinc-500 text-sm">至</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="h-10 px-3 bg-[#27272A] border border-[#3F3F46] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 查询和重置按钮 - 独立一行 */}
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentPage(1)}
              className="h-10 px-5 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              查询
            </button>
            <button
              onClick={handleReset}
              className="h-10 px-5 bg-[#27272A] text-white border border-[#3F3F46] rounded-md text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              重置
            </button>
          </div>
        </div>

        {/* 操作按钮区 */}
        <div className="flex justify-between items-center mb-5 pb-4 border-b border-[#27272A]">
          <div className="flex gap-3">
            <button
              onClick={handleBatchSolve}
              className="h-10 px-5 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              批量解决
            </button>
            <button
              onClick={handleExport}
              className="h-10 px-5 bg-[#27272A] text-white border border-[#3F3F46] rounded-md text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              导出
            </button>
          </div>
          <div className="text-sm text-zinc-400">
            共找到 <strong className="text-purple-600">{filteredAlarms.length}</strong> 条告警
          </div>
        </div>

        {/* 表格 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#27272A] border-b border-[#3F3F46]">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedAlarms.size === paginatedAlarms.length && paginatedAlarms.length > 0}
                    onChange={e => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap">告警类型</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap">告警描述</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap">级别</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap">设备名称</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap">设备ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap">状态</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap">告警时间</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAlarms.map(alarm => (
                <tr
                  key={alarm.id}
                  className="border-b border-[#27272A] hover:bg-[#27272A] transition-colors"
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedAlarms.has(alarm.id)}
                      onChange={e => handleSelectRow(alarm.id, e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-600 bg-zinc-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-zinc-300">{alarm.type}</td>
                  <td className="px-4 py-4 text-sm text-zinc-300">{alarm.description}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${levelStyles[alarm.level]}`}>
                      {levelLabels[alarm.level]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-zinc-300">{alarm.deviceName}</td>
                  <td className="px-4 py-4 text-sm text-zinc-300">{alarm.deviceId}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${statusStyles[alarm.status]}`}>
                      {statusLabels[alarm.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-zinc-300">{alarm.alarmTime}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetail(alarm)}
                        className="w-8 h-8 border border-[#3F3F46] bg-[#27272A] rounded flex items-center justify-center text-zinc-400 hover:border-purple-600 hover:text-purple-600 transition-colors"
                        title="查看"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSolveAlarm(alarm.id)}
                        disabled={alarm.status === 'solved'}
                        className="w-8 h-8 border border-[#3F3F46] bg-[#27272A] rounded flex items-center justify-center text-zinc-400 hover:border-purple-600 hover:text-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="解决"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div className="flex justify-between items-center mt-5 pt-4 border-t border-[#27272A]">
          <div className="text-sm text-zinc-400">
            显示 {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredAlarms.length)} 条，共 {filteredAlarms.length} 条
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

      {/* 告警详情弹框 */}
      {showDetailModal && selectedAlarm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDetailModal(false)}>
          <div className="bg-[#18181B] rounded-lg p-6 w-full max-w-2xl mx-4" onClick={e => e.stopPropagation()}>
            {/* 弹框标题 */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#27272A]">
              <h2 className="text-xl font-semibold text-white">告警详情</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* 告警基本信息 */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-4">告警基本信息</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-zinc-500">告警ID</span>
                  <span className="text-sm text-zinc-300">{selectedAlarm.id}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-zinc-500">告警时间</span>
                  <span className="text-sm text-zinc-300">{selectedAlarm.alarmTime}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-zinc-500">设备名称</span>
                  <span className="text-sm text-zinc-300">{selectedAlarm.deviceName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-zinc-500">设备ID</span>
                  <span className="text-sm text-zinc-300">{selectedAlarm.deviceId}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-zinc-500">告警类型</span>
                  <span className="text-sm text-zinc-300">{selectedAlarm.type}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-zinc-500">告警级别</span>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${levelStyles[selectedAlarm.level]}`}>
                      {levelLabels[selectedAlarm.level]}
                    </span>
                    {selectedAlarm.level === 'important' && (
                      <AlertIcon className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-zinc-500">当前状态</span>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${statusStyles[selectedAlarm.status]}`}>
                      {statusLabels[selectedAlarm.status]}
                    </span>
                    {selectedAlarm.status === 'solved' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-zinc-500">告警描述</span>
                  <span className="text-sm text-zinc-300">{selectedAlarm.description}</span>
                </div>
                {selectedAlarm.currentValue && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-zinc-500">当前值</span>
                    <span className="text-sm text-zinc-300">{selectedAlarm.currentValue}</span>
                  </div>
                )}
                {selectedAlarm.threshold && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-zinc-500">阈值</span>
                    <span className="text-sm text-zinc-300">{selectedAlarm.threshold}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 处理记录 */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-4">处理记录</h3>
              <div className="space-y-3">
                {selectedAlarm.processingRecords?.map((record, index) => (
                  <div key={index} className="bg-[#27272A] rounded-lg p-4">
                    <div className="text-xs text-zinc-500 mb-1">{record.time}</div>
                    <div className="text-sm text-zinc-300">{record.content}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="h-10 px-6 bg-[#27272A] text-white border border-[#3F3F46] rounded-md text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
