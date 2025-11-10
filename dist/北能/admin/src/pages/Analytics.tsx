import { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [dataType, setDataType] = useState('power');

  const powerData = [
    { time: '00:00', charge: 120, discharge: 80, net: 40 },
    { time: '02:00', charge: 150, discharge: 70, net: 80 },
    { time: '04:00', charge: 180, discharge: 60, net: 120 },
    { time: '06:00', charge: 220, discharge: 90, net: 130 },
    { time: '08:00', charge: 350, discharge: 150, net: 200 },
    { time: '10:00', charge: 420, discharge: 200, net: 220 },
    { time: '12:00', charge: 380, discharge: 250, net: 130 },
    { time: '14:00', charge: 340, discharge: 280, net: 60 },
    { time: '16:00', charge: 290, discharge: 260, net: 30 },
    { time: '18:00', charge: 250, discharge: 220, net: 30 },
    { time: '20:00', charge: 180, discharge: 150, net: 30 },
    { time: '22:00', charge: 140, discharge: 100, net: 40 }
  ];

  const efficiencyData = [
    { date: '12/06', charging: 96, discharging: 94, system: 95 },
    { date: '12/07', charging: 95, discharging: 93, system: 94 },
    { date: '12/08', charging: 97, discharging: 95, system: 96 },
    { date: '12/09', charging: 96, discharging: 94, system: 95 },
    { date: '12/10', charging: 98, discharging: 96, system: 97 },
    { date: '12/11', charging: 97, discharging: 95, system: 96 },
    { date: '12/12', charging: 96, discharging: 94, system: 95 }
  ];

  const devicePerformance = [
    { name: '储能柜#001', soc: 85, soh: 98, cycles: 1250 },
    { name: '储能柜#002', soc: 72, soh: 96, cycles: 1180 },
    { name: '储能柜#003', soc: 68, soh: 94, cycles: 1450 },
    { name: '逆变器#045', soc: 90, soh: 97, cycles: 980 },
    { name: '充电桩#012', soc: 78, soh: 95, cycles: 1320 }
  ];

  const stats = [
    {
      label: '今日充电量',
      value: '3,456 kWh',
      change: '+12.5%',
      trend: 'up',
      icon: Zap,
      color: 'text-green-500'
    },
    {
      label: '今日放电量',
      value: '2,890 kWh',
      change: '+8.3%',
      trend: 'up',
      icon: Activity,
      color: 'text-blue-500'
    },
    {
      label: '平均效率',
      value: '95.8%',
      change: '+0.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      label: '峰谷差价收益',
      value: '¥12,450',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-background-secondary border border-border-DEFAULT rounded-lg focus:outline-none focus:border-primary text-white"
          >
            <option value="1d">今天</option>
            <option value="7d">最近7天</option>
            <option value="30d">最近30天</option>
            <option value="90d">最近90天</option>
          </select>
          
          <select
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            className="px-4 py-2 bg-background-secondary border border-border-DEFAULT rounded-lg focus:outline-none focus:border-primary text-white"
          >
            <option value="power">功率数据</option>
            <option value="energy">电量数据</option>
            <option value="efficiency">效率分析</option>
          </select>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors text-white">
          <Download size={20} />
          <span>导出报表</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
              <div className="flex items-center justify-between mb-4">
                <Icon size={24} className={stat.color} />
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
          <h3 className="text-lg font-semibold text-white mb-4">充放电功率曲线</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={powerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="time" stroke="#71717A" />
              <YAxis stroke="#71717A" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#18181B', 
                  border: '1px solid #27272A',
                  borderRadius: '8px' 
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="charge" 
                stroke="#22C55E" 
                fill="#22C55E"
                fillOpacity={0.3}
                name="充电功率"
              />
              <Area 
                type="monotone" 
                dataKey="discharge" 
                stroke="#3B82F6" 
                fill="#3B82F6"
                fillOpacity={0.3}
                name="放电功率"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
          <h3 className="text-lg font-semibold text-white mb-4">系统效率趋势</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="date" stroke="#71717A" />
              <YAxis stroke="#71717A" domain={[90, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#18181B', 
                  border: '1px solid #27272A',
                  borderRadius: '8px' 
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="charging" 
                stroke="#22C55E" 
                strokeWidth={2}
                dot={{ fill: '#22C55E' }}
                name="充电效率"
              />
              <Line 
                type="monotone" 
                dataKey="discharging" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
                name="放电效率"
              />
              <Line 
                type="monotone" 
                dataKey="system" 
                stroke="#9333EA" 
                strokeWidth={2}
                dot={{ fill: '#9333EA' }}
                name="系统效率"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
        <h3 className="text-lg font-semibold text-white mb-4">设备性能指标</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={devicePerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
            <XAxis dataKey="name" stroke="#71717A" />
            <YAxis stroke="#71717A" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#18181B', 
                border: '1px solid #27272A',
                borderRadius: '8px' 
              }}
            />
            <Legend />
            <Bar dataKey="soc" fill="#22C55E" name="SOC (%)" />
            <Bar dataKey="soh" fill="#3B82F6" name="SOH (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
          <h3 className="text-lg font-semibold text-white mb-4">能源统计</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">本月充电总量</span>
              <span className="text-white font-medium">89,234 kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">本月放电总量</span>
              <span className="text-white font-medium">76,890 kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">能量损耗</span>
              <span className="text-orange-500 font-medium">4.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">循环次数</span>
              <span className="text-white font-medium">1,234</span>
            </div>
          </div>
        </div>

        <div className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
          <h3 className="text-lg font-semibold text-white mb-4">经济效益</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">本月收益</span>
              <span className="text-green-500 font-medium">¥345,678</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">峰谷套利</span>
              <span className="text-white font-medium">¥234,567</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">需求响应</span>
              <span className="text-white font-medium">¥89,012</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">辅助服务</span>
              <span className="text-white font-medium">¥22,099</span>
            </div>
          </div>
        </div>

        <div className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
          <h3 className="text-lg font-semibold text-white mb-4">环境贡献</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">CO₂减排</span>
              <span className="text-green-500 font-medium">156.8 吨</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">节约标煤</span>
              <span className="text-white font-medium">89.2 吨</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">等效植树</span>
              <span className="text-white font-medium">8,567 棵</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">绿电占比</span>
              <span className="text-white font-medium">78.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;