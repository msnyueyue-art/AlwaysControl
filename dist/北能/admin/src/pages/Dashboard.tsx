import { 
  TrendingUp, 
  Users, 
  Cpu, 
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const stats = [
    {
      label: '总用户数',
      value: '12,345',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      label: '在线设备',
      value: '8,932',
      change: '+5%',
      trend: 'up',
      icon: Cpu,
      color: 'bg-green-500',
    },
    {
      label: '今日发电量',
      value: '458.2 MWh',
      change: '-3%',
      trend: 'down',
      icon: Activity,
      color: 'bg-purple-500',
    },
    {
      label: '系统效率',
      value: '96.5%',
      change: '+1.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const lineData = [
    { name: '00:00', value: 400 },
    { name: '04:00', value: 300 },
    { name: '08:00', value: 600 },
    { name: '12:00', value: 800 },
    { name: '16:00', value: 650 },
    { name: '20:00', value: 450 },
    { name: '24:00', value: 350 },
  ];

  const barData = [
    { name: '周一', value: 4000 },
    { name: '周二', value: 3000 },
    { name: '周三', value: 5000 },
    { name: '周四', value: 2780 },
    { name: '周五', value: 4890 },
    { name: '周六', value: 3390 },
    { name: '周日', value: 3490 },
  ];

  const pieData = [
    { name: '光伏', value: 400, color: '#9333EA' },
    { name: '储能', value: 300, color: '#3B82F6' },
    { name: '风电', value: 200, color: '#22C55E' },
    { name: '其他', value: 100, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} bg-opacity-20 p-3 rounded-lg`}>
                  <Icon size={24} className={`${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
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
          <h3 className="text-lg font-semibold text-white mb-4">24小时发电趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
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
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#9333EA" 
                strokeWidth={2}
                dot={{ fill: '#9333EA' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
          <h3 className="text-lg font-semibold text-white mb-4">本周发电统计</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
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
              <Bar dataKey="value" fill="#9333EA" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
          <h3 className="text-lg font-semibold text-white mb-4">能源分布</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#18181B', 
                  border: '1px solid #27272A',
                  borderRadius: '8px' 
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-400 text-sm">{item.name}</span>
                </div>
                <span className="text-white font-medium">{item.value} MW</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
          <h3 className="text-lg font-semibold text-white mb-4">最近活动</h3>
          <div className="space-y-3">
            {[
              { user: '张三', action: '添加了新设备', device: '逆变器#125', time: '5分钟前' },
              { user: '李四', action: '修改了设备状态', device: '储能柜#089', time: '15分钟前' },
              { user: '王五', action: '导出了数据报表', device: '2024年1月报表', time: '1小时前' },
              { user: '系统', action: '自动备份完成', device: '数据库备份', time: '2小时前' },
              { user: '赵六', action: '更新了用户权限', device: '用户组:操作员', time: '3小时前' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border-DEFAULT last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-background-tertiary rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">{activity.user[0]}</span>
                  </div>
                  <div>
                    <p className="text-white">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-400 mx-2">{activity.action}</span>
                      <span className="text-primary">{activity.device}</span>
                    </p>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;