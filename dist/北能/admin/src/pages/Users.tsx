import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone,
  Calendar,
  Shield,
  User as UserIcon,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const users = [
    {
      id: 'USR001',
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '138****1234',
      role: '管理员',
      status: 'active',
      devices: 5,
      lastLogin: '2小时前',
      joinDate: '2023-06-15'
    },
    {
      id: 'USR002',
      name: '李四',
      email: 'lisi@example.com',
      phone: '139****5678',
      role: '操作员',
      status: 'active',
      devices: 3,
      lastLogin: '5分钟前',
      joinDate: '2023-08-20'
    },
    {
      id: 'USR003',
      name: '王五',
      email: 'wangwu@example.com',
      phone: '137****9012',
      role: '用户',
      status: 'inactive',
      devices: 1,
      lastLogin: '3天前',
      joinDate: '2023-09-10'
    },
    {
      id: 'USR004',
      name: '赵六',
      email: 'zhaoliu@example.com',
      phone: '136****3456',
      role: '用户',
      status: 'active',
      devices: 2,
      lastLogin: '1小时前',
      joinDate: '2023-10-05'
    },
    {
      id: 'USR005',
      name: '钱七',
      email: 'qianqi@example.com',
      phone: '135****7890',
      role: '操作员',
      status: 'active',
      devices: 4,
      lastLogin: '刚刚',
      joinDate: '2023-11-12'
    }
  ];

  const roles = [
    { value: 'all', label: '全部角色' },
    { value: '管理员', label: '管理员' },
    { value: '操作员', label: '操作员' },
    { value: '用户', label: '用户' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case '管理员': return 'bg-purple-500/20 text-purple-400';
      case '操作员': return 'bg-blue-500/20 text-blue-400';
      case '用户': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="搜索用户名称、邮箱或ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background-secondary border border-border-DEFAULT rounded-lg focus:outline-none focus:border-primary text-white"
            />
          </div>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 bg-background-secondary border border-border-DEFAULT rounded-lg focus:outline-none focus:border-primary text-white"
          >
            {roles.map(role => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors text-white">
          <Plus size={20} />
          <span>添加用户</span>
        </button>
      </div>

      <div className="bg-background-secondary rounded-xl border border-border-DEFAULT overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-DEFAULT">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">用户</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">联系方式</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">角色</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">状态</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">设备数</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">最后登录</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border-DEFAULT hover:bg-background-tertiary transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-background-tertiary rounded-full flex items-center justify-center">
                        <UserIcon size={20} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Mail size={14} />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Phone size={14} />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${getRoleColor(user.role)}`}>
                      <Shield size={14} />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.status === 'active' ? (
                        <>
                          <CheckCircle size={16} className="text-green-500" />
                          <span className="text-green-500 text-sm">活跃</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={16} className="text-gray-500" />
                          <span className="text-gray-500 text-sm">未激活</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{user.devices}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm">{user.lastLogin}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-background-tertiary rounded-lg transition-colors">
                      <MoreVertical size={20} className="text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">用户统计</h3>
            <UserIcon size={20} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">总用户数</span>
              <span className="text-white font-medium">{users.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">活跃用户</span>
              <span className="text-green-500 font-medium">
                {users.filter(u => u.status === 'active').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">新增用户</span>
              <span className="text-blue-500 font-medium">+12</span>
            </div>
          </div>
        </div>

        <div className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">角色分布</h3>
            <Shield size={20} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">管理员</span>
              <span className="text-purple-400 font-medium">
                {users.filter(u => u.role === '管理员').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">操作员</span>
              <span className="text-blue-400 font-medium">
                {users.filter(u => u.role === '操作员').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">普通用户</span>
              <span className="text-green-400 font-medium">
                {users.filter(u => u.role === '用户').length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">活动统计</h3>
            <Calendar size={20} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">今日登录</span>
              <span className="text-white font-medium">86</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">本周活跃</span>
              <span className="text-white font-medium">234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">月活跃率</span>
              <span className="text-white font-medium">78%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;