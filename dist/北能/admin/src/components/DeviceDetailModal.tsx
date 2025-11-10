import React, { useState } from 'react';
import { X, Eye, Pause, Download, Save } from 'lucide-react';

interface DeviceDetailModalProps {
  device: any;
  onClose: () => void;
}

type TabType = 'history' | 'protection' | 'inverter';
type ProtectionLevel = 'level1' | 'level2';

export default function DeviceDetailModal({ device, onClose }: DeviceDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('history');
  const [protectionLevel, setProtectionLevel] = useState<ProtectionLevel>('level1');
  const [isPaused, setIsPaused] = useState(false);

  // 模拟历史记录数据
  const historyData = [
    {
      date: '2025-10-28 15:30',
      voltage: 53.2,
      current: 25.5,
      soc: 85,
      soh: 100,
      capacity: 300,
      cycles: 120,
      alarm: '无',
      level1Protection: '无',
      level2Protection: '无',
      fault: '无',
      system: '正常',
      tempFET: 42.5,
      ambientTemp: 25.3
    },
    {
      date: '2025-10-28 14:20',
      voltage: 51.8,
      current: -18.3,
      soc: 72,
      soh: 100,
      capacity: 300,
      cycles: 120,
      alarm: '无',
      level1Protection: '无',
      level2Protection: '无',
      fault: '无',
      system: '正常',
      tempFET: 38.2,
      ambientTemp: 24.8
    },
    {
      date: '2025-10-28 12:10',
      voltage: 48.5,
      current: 0,
      soc: 45,
      soh: 99,
      capacity: 300,
      cycles: 120,
      alarm: '电压过低',
      level1Protection: '无',
      level2Protection: '无',
      fault: '无',
      system: '正常',
      tempFET: 35.8,
      ambientTemp: 24.2
    }
  ];

  // 历史记录操作函数
  const handleReadHistory = () => {
    alert('正在读取历史数据...');
  };

  const handlePauseHistory = () => {
    setIsPaused(!isPaused);
    alert(isPaused ? '已恢复数据读取' : '已暂停数据读取');
  };

  const handleExportHistory = () => {
    const csvContent = '\uFEFF日期,电压(V),电流(A),电量(%),SOH(%),满充容量(AH),循环次数,告警,一级保护,二级保护,故障,系统,TempFET(℃),环境温度(℃)\n';
    const rows = historyData.map(row =>
      `${row.date},${row.voltage},${row.current},${row.soc},${row.soh},${row.capacity},${row.cycles},${row.alarm},${row.level1Protection},${row.level2Protection},${row.fault},${row.system},${row.tempFET},${row.ambientTemp}`
    ).join('\n');

    const blob = new Blob([csvContent + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `历史记录_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('历史数据导出成功!');
  };

  // 保护参数操作函数
  const handleReadProtection = (module: string) => {
    alert(`正在读取${module}参数...`);
  };

  const handleSetProtection = (module: string) => {
    if (confirm(`确认要设置${module}参数吗?`)) {
      alert(`正在写入${module}参数...`);
    }
  };

  const handleReadAllProtection = () => {
    const levelName = protectionLevel === 'level1' ? '一级(MCU)' : '二级(AFE)';
    alert(`正在读取全部${levelName}保护参数...`);
  };

  const handleWriteAllProtection = () => {
    const levelName = protectionLevel === 'level1' ? '一级(MCU)' : '二级(AFE)';
    if (confirm(`确认要写入全部${levelName}保护参数吗?\n\n此操作将更新设备所有保护参数,请谨慎操作!`)) {
      alert(`正在写入全部${levelName}保护参数...`);
    }
  };

  const handleImportProtection = () => {
    alert('导入保护参数');
  };

  const handleExportProtection = () => {
    alert('导出保护参数');
  };

  const handleSetDefault = () => {
    if (confirm('确认要恢复一级(MCU)保护参数为默认值吗?')) {
      alert('正在恢复默认参数...');
    }
  };

  // 逆变器参数操作函数
  const handleReadInverter = () => {
    alert('正在读取逆变器参数...');
  };

  const handleSetInverter = () => {
    if (confirm('确认要设置逆变器参数吗?')) {
      alert('正在写入逆变器参数...');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#18181B] rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* 弹框头部 */}
        <div className="flex items-center justify-between p-6 border-b border-[#27272A]">
          <div>
            <h2 className="text-xl font-semibold text-white">{device.name} - 详情</h2>
            <p className="text-sm text-zinc-400 mt-1">{device.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-[#27272A] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab 导航 */}
        <div className="flex gap-1 px-6 pt-4 border-b border-[#27272A]">
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === 'history'
                ? 'bg-[#27272A] text-white'
                : 'text-zinc-400 hover:text-white hover:bg-[#27272A]/50'
            }`}
          >
            历史记录
          </button>
          <button
            onClick={() => setActiveTab('protection')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === 'protection'
                ? 'bg-[#27272A] text-white'
                : 'text-zinc-400 hover:text-white hover:bg-[#27272A]/50'
            }`}
          >
            保护参数
          </button>
          <button
            onClick={() => setActiveTab('inverter')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === 'inverter'
                ? 'bg-[#27272A] text-white'
                : 'text-zinc-400 hover:text-white hover:bg-[#27272A]/50'
            }`}
          >
            逆变器参数
          </button>
        </div>

        {/* Tab 内容 */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* 历史记录 Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {/* 按钮区域 - 靠右对齐 */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleReadHistory}
                  className="h-9 px-4 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  读取
                </button>
                <button
                  onClick={handlePauseHistory}
                  className={`h-9 px-4 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    isPaused
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-[#27272A] text-white border border-[#3F3F46] hover:border-purple-600 hover:text-purple-600'
                  }`}
                >
                  <Pause className="w-4 h-4" />
                  {isPaused ? '恢复' : '暂停'}
                </button>
                <button
                  onClick={handleExportHistory}
                  className="h-9 px-4 bg-[#27272A] text-white border border-[#3F3F46] rounded-md text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  导出数据
                </button>
              </div>

              {/* 表格 - 列宽可调通过resize样式 */}
              <div className="overflow-x-auto border border-[#27272A] rounded-lg">
                <table className="w-full text-sm" style={{ tableLayout: 'auto' }}>
                  <thead className="bg-[#27272A]">
                    <tr>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap resize-x overflow-hidden" style={{ minWidth: '140px' }}>日期</th>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap" style={{ minWidth: '80px' }}>电压(V)</th>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap" style={{ minWidth: '80px' }}>电流(A)</th>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap" style={{ minWidth: '70px' }}>电量(%)</th>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap" style={{ minWidth: '70px' }}>SOH(%)</th>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap" style={{ minWidth: '100px' }}>满充容量(AH)</th>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap" style={{ minWidth: '80px' }}>循环次数</th>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap" style={{ minWidth: '80px' }}>告警</th>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap" style={{ minWidth: '80px' }}>一级保护</th>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap" style={{ minWidth: '80px' }}>二级保护</th>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap" style={{ minWidth: '60px' }}>故障</th>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap" style={{ minWidth: '60px' }}>系统</th>
                      <th className="px-3 py-3 text-left text-white font-semibold border-r border-[#3F3F46] whitespace-nowrap" style={{ minWidth: '90px' }}>TempFET(℃)</th>
                      <th className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap" style={{ minWidth: '100px' }}>环境温度(℃)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((row, index) => (
                      <tr key={index} className="border-b border-[#27272A] hover:bg-[#27272A]/50">
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46] whitespace-nowrap">{row.date}</td>
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46]">{row.voltage}</td>
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46]">{row.current}</td>
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46]">{row.soc}</td>
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46]">{row.soh}</td>
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46]">{row.capacity}</td>
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46]">{row.cycles}</td>
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46]">{row.alarm}</td>
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46]">{row.level1Protection}</td>
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46]">{row.level2Protection}</td>
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46]">{row.fault}</td>
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46]">{row.system}</td>
                        <td className="px-3 py-3 text-zinc-300 border-r border-[#3F3F46]">{row.tempFET}</td>
                        <td className="px-3 py-3 text-zinc-300">{row.ambientTemp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-sm text-zinc-400">
                数据总数量: <strong className="text-purple-600">{historyData.length}</strong>
              </div>
            </div>
          )}

          {/* 保护参数 Tab */}
          {activeTab === 'protection' && (
            <div className="space-y-4">
              {/* 顶部操作栏 */}
              <div className="flex items-center justify-between">
                <select
                  value={protectionLevel}
                  onChange={e => setProtectionLevel(e.target.value as ProtectionLevel)}
                  className="px-4 py-2 bg-[#27272A] border border-[#3F3F46] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="level1">一级 (MCU) 保护参数</option>
                  <option value="level2">二级 (AFE) 保护参数</option>
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={handleImportProtection}
                    className="h-9 px-4 bg-[#27272A] text-white border border-[#3F3F46] rounded-md text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-colors"
                  >
                    导入参数
                  </button>
                  <button
                    onClick={handleExportProtection}
                    className="h-9 px-4 bg-[#27272A] text-white border border-[#3F3F46] rounded-md text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-colors"
                  >
                    导出参数
                  </button>
                  <button
                    onClick={handleReadAllProtection}
                    className="h-9 px-4 bg-[#27272A] text-white border border-[#3F3F46] rounded-md text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-colors"
                  >
                    读取全部
                  </button>
                  <button
                    onClick={handleWriteAllProtection}
                    className="h-9 px-4 bg-[#27272A] text-white border border-[#3F3F46] rounded-md text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-colors"
                  >
                    写入全部
                  </button>
                  {protectionLevel === 'level1' && (
                    <button
                      onClick={handleSetDefault}
                      className="h-9 px-4 bg-[#27272A] text-white border border-[#3F3F46] rounded-md text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-colors"
                    >
                      设置默认参数
                    </button>
                  )}
                </div>
              </div>

              {/* 一级 (MCU) 保护参数 */}
              {protectionLevel === 'level1' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {['充电过流一级', '放电过流一级', '充电过温一级', '放电过温一级', '过压一级', '欠压一级', '充电低温一级', '放电低温一级', 'SOC 过低一级', 'SOC 过高一级'].map((module) => (
                    <div key={module} className="bg-[#27272A] rounded-lg p-4 border border-[#3F3F46]">
                      {/* 标题和按钮在顶部 */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-white">{module}</h3>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <button
                          onClick={() => handleReadProtection(module)}
                          className="flex-1 h-8 px-2 bg-blue-500/20 text-blue-400 rounded text-xs font-medium hover:bg-blue-500/30 transition-colors"
                        >
                          读取
                        </button>
                        <button
                          onClick={() => handleSetProtection(module)}
                          className="flex-1 h-8 px-2 bg-green-500/20 text-green-400 rounded text-xs font-medium hover:bg-green-500/30 transition-colors"
                        >
                          设置
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">告警值</label>
                          <input
                            type="text"
                            defaultValue="100"
                            className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">保护值</label>
                          <input
                            type="text"
                            defaultValue="120"
                            className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">恢复值</label>
                          <input
                            type="text"
                            defaultValue="80"
                            className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">延时(秒)</label>
                          <input
                            type="text"
                            defaultValue="5"
                            className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 二级 (AFE) 保护参数 - 3列布局 */}
              {protectionLevel === 'level2' && (
                <div className="space-y-4">
                  {/* 第一行 - 3列 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* 芯片选择 - 无按钮 */}
                    <div className="bg-[#27272A] rounded-lg p-4 border border-[#3F3F46]">
                      <h3 className="text-sm font-semibold text-white mb-3">芯片选择</h3>
                      <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">选择芯片</label>
                          <select className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500">
                            <option value="1">芯片1</option>
                            <option value="2">芯片2</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* 充电过流二级 */}
                    <div className="bg-[#27272A] rounded-lg p-4 border border-[#3F3F46]">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-white">充电过流二级</h3>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <button onClick={() => handleReadProtection('充电过流二级')} className="flex-1 h-8 px-2 bg-blue-500/20 text-blue-400 rounded text-xs font-medium hover:bg-blue-500/30 transition-colors">读取</button>
                        <button onClick={() => handleSetProtection('充电过流二级')} className="flex-1 h-8 px-2 bg-green-500/20 text-green-400 rounded text-xs font-medium hover:bg-green-500/30 transition-colors">设置</button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">保护值</label>
                          <input type="text" defaultValue="150" className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">延时(ms)</label>
                          <input type="text" defaultValue="100" className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                        </div>
                      </div>
                    </div>

                    {/* 放电过流二级 */}
                    <div className="bg-[#27272A] rounded-lg p-4 border border-[#3F3F46]">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-white">放电过流二级</h3>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <button onClick={() => handleReadProtection('放电过流二级')} className="flex-1 h-8 px-2 bg-blue-500/20 text-blue-400 rounded text-xs font-medium hover:bg-blue-500/30 transition-colors">读取</button>
                        <button onClick={() => handleSetProtection('放电过流二级')} className="flex-1 h-8 px-2 bg-green-500/20 text-green-400 rounded text-xs font-medium hover:bg-green-500/30 transition-colors">设置</button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">保护值</label>
                          <input type="text" defaultValue="150" className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">延时(ms)</label>
                          <input type="text" defaultValue="100" className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 第二行 - 3列(短路保护在第二行) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-[#27272A] rounded-lg p-4 border border-[#3F3F46]">
                      <h3 className="text-sm font-semibold text-white mb-3">过压二级</h3>
                      <div className="flex gap-2 mb-3">
                        <button onClick={() => handleReadProtection('过压二级')} className="flex-1 h-8 px-2 bg-blue-500/20 text-blue-400 rounded text-xs font-medium hover:bg-blue-500/30 transition-colors">读取</button>
                        <button onClick={() => handleSetProtection('过压二级')} className="flex-1 h-8 px-2 bg-green-500/20 text-green-400 rounded text-xs font-medium hover:bg-green-500/30 transition-colors">设置</button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">保护值</label>
                          <input type="text" defaultValue="4200" className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">延时(ms)</label>
                          <input type="text" defaultValue="100" className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#27272A] rounded-lg p-4 border border-[#3F3F46]">
                      <h3 className="text-sm font-semibold text-white mb-3">欠压二级</h3>
                      <div className="flex gap-2 mb-3">
                        <button onClick={() => handleReadProtection('欠压二级')} className="flex-1 h-8 px-2 bg-blue-500/20 text-blue-400 rounded text-xs font-medium hover:bg-blue-500/30 transition-colors">读取</button>
                        <button onClick={() => handleSetProtection('欠压二级')} className="flex-1 h-8 px-2 bg-green-500/20 text-green-400 rounded text-xs font-medium hover:bg-green-500/30 transition-colors">设置</button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">保护值</label>
                          <input type="text" defaultValue="2500" className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">延时(ms)</label>
                          <input type="text" defaultValue="100" className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                        </div>
                      </div>
                    </div>

                    {/* 短路保护 - 在第二行 */}
                    <div className="bg-[#27272A] rounded-lg p-4 border border-[#3F3F46]">
                      <h3 className="text-sm font-semibold text-white mb-3">短路保护</h3>
                      <div className="flex gap-2 mb-3">
                        <button onClick={() => handleReadProtection('短路保护')} className="flex-1 h-8 px-2 bg-blue-500/20 text-blue-400 rounded text-xs font-medium hover:bg-blue-500/30 transition-colors">读取</button>
                        <button onClick={() => handleSetProtection('短路保护')} className="flex-1 h-8 px-2 bg-green-500/20 text-green-400 rounded text-xs font-medium hover:bg-green-500/30 transition-colors">设置</button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">保护值</label>
                          <input type="text" defaultValue="200" className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-500">延时(us)</label>
                          <input type="text" defaultValue="50" className="h-8 px-2 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 逆变器参数 Tab - 2列布局 */}
          {activeTab === 'inverter' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 左侧：参数与操作区 */}
                <div className="space-y-4">
                  <div className="bg-[#27272A] rounded-lg p-4 border border-[#3F3F46]">
                    <h3 className="text-sm font-semibold text-white mb-3">通信协议配置</h3>
                    <div className="space-y-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500">CANBUS</label>
                        <select className="h-9 px-3 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500">
                          <option value="1">1. Pylon</option>
                          <option value="2" selected>2. Growatt</option>
                          <option value="3">3. SMA</option>
                          <option value="4">4. Victron</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500">RS485</label>
                        <select className="h-9 px-3 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500">
                          <option value="1">1. Pylon</option>
                          <option value="2" selected>2. Growatt</option>
                          <option value="3">3. SMA</option>
                          <option value="4">4. Victron</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#27272A] rounded-lg p-4 border border-[#3F3F46]">
                    <h3 className="text-sm font-semibold text-white mb-3">充放电参数</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500">充电截止电压(V)</label>
                        <input type="text" defaultValue="58.4" className="h-9 px-3 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500">充电最大电流(A)</label>
                        <input type="text" defaultValue="100" className="h-9 px-3 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500">放电最大电流(A)</label>
                        <input type="text" defaultValue="100" className="h-9 px-3 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500">放电截止电压(V)</label>
                        <input type="text" defaultValue="44.0" className="h-9 px-3 bg-[#18181B] border border-[#3F3F46] rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleReadInverter}
                      className="flex-1 h-10 px-4 bg-blue-500/20 text-blue-400 rounded-md text-sm font-medium hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      读取
                    </button>
                    <button
                      onClick={handleSetInverter}
                      className="flex-1 h-10 px-4 bg-green-500/20 text-green-400 rounded-md text-sm font-medium hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      设置
                    </button>
                  </div>
                </div>

                {/* 右侧：版本与开关区 */}
                <div className="space-y-4">
                  <div className="bg-[#27272A] rounded-lg p-4 border border-[#3F3F46]">
                    <h3 className="text-sm font-semibold text-white mb-3">版本信息</h3>
                    <div className="space-y-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500">Hardware version</label>
                        <input type="text" value="v2.1.0" disabled className="h-9 px-3 bg-[#18181B]/50 border border-[#3F3F46] rounded text-sm text-zinc-500 cursor-not-allowed" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500">Software version</label>
                        <input type="text" value="v1.5.8" disabled className="h-9 px-3 bg-[#18181B]/50 border border-[#3F3F46] rounded text-sm text-zinc-500 cursor-not-allowed" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500">Protocol version</label>
                        <input type="text" value="v3.2" disabled className="h-9 px-3 bg-[#18181B]/50 border border-[#3F3F46] rounded text-sm text-zinc-500 cursor-not-allowed" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#27272A] rounded-lg p-4 border border-[#3F3F46]">
                    <h3 className="text-sm font-semibold text-white mb-3">功能开关</h3>
                    <div className="space-y-3">
                      {[
                        { name: '充电 MOS', checked: true },
                        { name: '放电 MOS', checked: true },
                        { name: '加热开关', checked: false },
                        { name: '风扇开关', checked: false },
                        { name: 'Equalizer', checked: false },
                        { name: 'Current limit', checked: false },
                        { name: '一键强启', checked: false }
                      ].map((toggle) => (
                        <div key={toggle.name} className="flex items-center justify-between">
                          <span className="text-sm text-zinc-300">{toggle.name}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={toggle.checked} className="sr-only peer" />
                            <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
