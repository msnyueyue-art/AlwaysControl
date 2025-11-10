import { useState } from 'react';
import { 
  Save,
  Bell,
  Shield,
  Database,
  Globe,
  Moon,
  Sun,
  Mail,
  Smartphone,
  Key,
  Users,
  Server,
  Zap
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    deviceAlerts: true,
    systemAlerts: true,
    maintenanceReminders: true
  });

  const [general, setGeneral] = useState({
    siteName: '北能能源管理系统',
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
    dateFormat: 'YYYY-MM-DD',
    theme: 'dark'
  });

  const tabs = [
    { id: 'general', label: '常规设置', icon: Globe },
    { id: 'notifications', label: '通知设置', icon: Bell },
    { id: 'security', label: '安全设置', icon: Shield },
    { id: 'system', label: '系统设置', icon: Server },
    { id: 'energy', label: '能源设置', icon: Zap }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">站点名称</label>
              <input
                type="text"
                value={general.siteName}
                onChange={(e) => setGeneral({...general, siteName: e.target.value})}
                className="w-full px-4 py-2 bg-background-tertiary border border-border-DEFAULT rounded-lg focus:outline-none focus:border-primary text-white"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">时区</label>
                <select
                  value={general.timezone}
                  onChange={(e) => setGeneral({...general, timezone: e.target.value})}
                  className="w-full px-4 py-2 bg-background-tertiary border border-border-DEFAULT rounded-lg focus:outline-none focus:border-primary text-white"
                >
                  <option value="Asia/Shanghai">中国标准时间 (UTC+8)</option>
                  <option value="Asia/Tokyo">日本标准时间 (UTC+9)</option>
                  <option value="UTC">协调世界时 (UTC)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">语言</label>
                <select
                  value={general.language}
                  onChange={(e) => setGeneral({...general, language: e.target.value})}
                  className="w-full px-4 py-2 bg-background-tertiary border border-border-DEFAULT rounded-lg focus:outline-none focus:border-primary text-white"
                >
                  <option value="zh-CN">简体中文</option>
                  <option value="en-US">English</option>
                  <option value="ja-JP">日本語</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">主题设置</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setGeneral({...general, theme: 'light'})}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    general.theme === 'light' 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-background-tertiary border-border-DEFAULT text-gray-400'
                  }`}
                >
                  <Sun size={20} />
                  <span>浅色主题</span>
                </button>
                <button
                  onClick={() => setGeneral({...general, theme: 'dark'})}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    general.theme === 'dark' 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-background-tertiary border-border-DEFAULT text-gray-400'
                  }`}
                >
                  <Moon size={20} />
                  <span>深色主题</span>
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">通知渠道</h3>
              
              <label className="flex items-center justify-between p-4 bg-background-tertiary rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <p className="text-white">邮件通知</p>
                    <p className="text-sm text-gray-400">接收系统邮件通知</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="w-5 h-5 text-primary bg-background-primary border-border-DEFAULT rounded focus:ring-primary"
                />
              </label>
              
              <label className="flex items-center justify-between p-4 bg-background-tertiary rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="text-gray-400" size={20} />
                  <div>
                    <p className="text-white">推送通知</p>
                    <p className="text-sm text-gray-400">浏览器推送通知</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  className="w-5 h-5 text-primary bg-background-primary border-border-DEFAULT rounded focus:ring-primary"
                />
              </label>
              
              <label className="flex items-center justify-between p-4 bg-background-tertiary rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-gray-400" size={20} />
                  <div>
                    <p className="text-white">短信通知</p>
                    <p className="text-sm text-gray-400">重要事件短信提醒</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  className="w-5 h-5 text-primary bg-background-primary border-border-DEFAULT rounded focus:ring-primary"
                />
              </label>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">通知类型</h3>
              
              <label className="flex items-center justify-between p-4 bg-background-tertiary rounded-lg">
                <div>
                  <p className="text-white">设备告警</p>
                  <p className="text-sm text-gray-400">设备异常和故障通知</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.deviceAlerts}
                  onChange={(e) => setNotifications({...notifications, deviceAlerts: e.target.checked})}
                  className="w-5 h-5 text-primary bg-background-primary border-border-DEFAULT rounded focus:ring-primary"
                />
              </label>
              
              <label className="flex items-center justify-between p-4 bg-background-tertiary rounded-lg">
                <div>
                  <p className="text-white">系统告警</p>
                  <p className="text-sm text-gray-400">系统级别的重要通知</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.systemAlerts}
                  onChange={(e) => setNotifications({...notifications, systemAlerts: e.target.checked})}
                  className="w-5 h-5 text-primary bg-background-primary border-border-DEFAULT rounded focus:ring-primary"
                />
              </label>
              
              <label className="flex items-center justify-between p-4 bg-background-tertiary rounded-lg">
                <div>
                  <p className="text-white">维护提醒</p>
                  <p className="text-sm text-gray-400">设备维护和保养提醒</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.maintenanceReminders}
                  onChange={(e) => setNotifications({...notifications, maintenanceReminders: e.target.checked})}
                  className="w-5 h-5 text-primary bg-background-primary border-border-DEFAULT rounded focus:ring-primary"
                />
              </label>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-background-tertiary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">密码策略</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-gray-400">最小密码长度</span>
                  <input
                    type="number"
                    defaultValue="8"
                    min="6"
                    max="20"
                    className="w-20 px-3 py-1 bg-background-primary border border-border-DEFAULT rounded-lg text-white text-center"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-400">密码过期时间（天）</span>
                  <input
                    type="number"
                    defaultValue="90"
                    min="30"
                    max="365"
                    className="w-20 px-3 py-1 bg-background-primary border border-border-DEFAULT rounded-lg text-white text-center"
                  />
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-400">要求包含大小写字母</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-400">要求包含数字</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-400">要求包含特殊字符</span>
                </label>
              </div>
            </div>
            
            <div className="bg-background-tertiary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">登录安全</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-gray-400">登录失败锁定次数</span>
                  <input
                    type="number"
                    defaultValue="5"
                    min="3"
                    max="10"
                    className="w-20 px-3 py-1 bg-background-primary border border-border-DEFAULT rounded-lg text-white text-center"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-400">锁定时长（分钟）</span>
                  <input
                    type="number"
                    defaultValue="30"
                    min="5"
                    max="60"
                    className="w-20 px-3 py-1 bg-background-primary border border-border-DEFAULT rounded-lg text-white text-center"
                  />
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-400">启用双因素认证</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-400">记录登录日志</span>
                </label>
              </div>
            </div>
          </div>
        );
        
      case 'system':
        return (
          <div className="space-y-6">
            <div className="bg-background-tertiary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">数据库配置</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">数据库类型</label>
                  <select className="w-full px-4 py-2 bg-background-primary border border-border-DEFAULT rounded-lg text-white">
                    <option>MongoDB</option>
                    <option>PostgreSQL</option>
                    <option>MySQL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">连接字符串</label>
                  <input
                    type="text"
                    defaultValue="mongodb://localhost:27017/beineng"
                    className="w-full px-4 py-2 bg-background-primary border border-border-DEFAULT rounded-lg text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">连接池大小</label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full px-4 py-2 bg-background-primary border border-border-DEFAULT rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">超时时间（秒）</label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-4 py-2 bg-background-primary border border-border-DEFAULT rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background-tertiary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">系统维护</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white">自动备份</p>
                    <p className="text-sm text-gray-400">每日凌晨2点自动备份数据</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white">日志清理</p>
                    <p className="text-sm text-gray-400">自动清理30天前的日志</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white">性能监控</p>
                    <p className="text-sm text-gray-400">实时监控系统性能指标</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'energy':
        return (
          <div className="space-y-6">
            <div className="bg-background-tertiary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">充放电策略</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">充电功率限制 (kW)</label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full px-4 py-2 bg-background-primary border border-border-DEFAULT rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">放电功率限制 (kW)</label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full px-4 py-2 bg-background-primary border border-border-DEFAULT rounded-lg text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">最低SOC (%)</label>
                    <input
                      type="number"
                      defaultValue="20"
                      min="10"
                      max="30"
                      className="w-full px-4 py-2 bg-background-primary border border-border-DEFAULT rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">最高SOC (%)</label>
                    <input
                      type="number"
                      defaultValue="95"
                      min="90"
                      max="100"
                      className="w-full px-4 py-2 bg-background-primary border border-border-DEFAULT rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background-tertiary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">电价设置</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">峰时电价 (元/kWh)</label>
                    <input
                      type="number"
                      defaultValue="1.2"
                      step="0.01"
                      className="w-full px-4 py-2 bg-background-primary border border-border-DEFAULT rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">平时电价 (元/kWh)</label>
                    <input
                      type="number"
                      defaultValue="0.8"
                      step="0.01"
                      className="w-full px-4 py-2 bg-background-primary border border-border-DEFAULT rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">谷时电价 (元/kWh)</label>
                    <input
                      type="number"
                      defaultValue="0.4"
                      step="0.01"
                      className="w-full px-4 py-2 bg-background-primary border border-border-DEFAULT rounded-lg text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">时段设置</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 w-16">峰时:</span>
                      <span className="text-white">08:00-11:00, 18:00-21:00</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 w-16">平时:</span>
                      <span className="text-white">06:00-08:00, 11:00-18:00, 21:00-23:00</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 w-16">谷时:</span>
                      <span className="text-white">23:00-06:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-background-secondary rounded-xl border border-border-DEFAULT">
        <div className="flex border-b border-border-DEFAULT overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-white bg-background-tertiary'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg transition-colors text-white">
          <Save size={20} />
          <span>保存设置</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;