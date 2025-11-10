import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Cpu,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  User,
  FileText,
  AlertCircle,
  ScrollText
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: '仪表盘' },
    { path: '/users', icon: Users, label: '用户管理' },
    { path: '/devices', icon: Cpu, label: '设备管理' },
    { path: '/analytics', icon: BarChart3, label: '数据分析' },
    { path: '/alarms', icon: AlertCircle, label: '告警管理' },
    { path: '/device-logs', icon: ScrollText, label: '设备日志' },
    { path: '/operation-logs', icon: FileText, label: '操作日志' },
    { path: '/settings', icon: Settings, label: '系统设置' },
  ];

  return (
    <div className="flex h-screen bg-background-primary">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-background-secondary border-r border-border-DEFAULT`}>
        <div className="flex items-center justify-between p-4 border-b border-border-DEFAULT">
          <h1 className={`text-xl font-bold text-white ${!sidebarOpen && 'hidden'}`}>
            北能管理
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-background-tertiary rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 mb-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-400 hover:bg-background-tertiary hover:text-white'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-background-secondary border-b border-border-DEFAULT px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {menuItems.find(item => item.path === location.pathname)?.label || '仪表盘'}
            </h2>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-background-tertiary rounded-lg transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">管理员</p>
                  <p className="text-xs text-gray-400">admin@beineng.com</p>
                </div>
                <div className="w-10 h-10 bg-background-tertiary rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-background-primary p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;