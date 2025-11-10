import { useState } from 'react';
import {
  Search,
  Plus,
  MoreVertical,
  Power,
  Battery,
  Wifi,
  WifiOff,
  Zap,
  ArrowDownToLine,
  Pause,
  AlertCircle,
  Eye
} from 'lucide-react';
import DeviceDetailModal from '../components/DeviceDetailModal';

const Devices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const devices = [
    {
      id: 'DEV001',
      name: '储能柜#001',
      type: '储能设备',
      status: 'online',
      operatingStatus: 'charging',
      soc: 85,
      soh: 98,
      power: '2.5 kW',
      location: 'A区1号位',
      lastUpdate: '2分钟前'
    },
    {
      id: 'DEV002',
      name: '逆变器#045',
      type: '逆变器',
      status: 'online',
      operatingStatus: 'discharging',
      soc: 72,
      soh: 96,
      power: '5.0 kW',
      location: 'B区3号位',
      lastUpdate: '5分钟前'
    },
    {
      id: 'DEV003',
      name: '储能柜#002',
      type: '储能设备',
      status: 'offline',
      operatingStatus: 'offline',
      soc: 0,
      soh: 0,
      power: '0 kW',
      location: 'A区2号位',
      lastUpdate: '2小时前'
    },
    {
      id: 'DEV004',
      name: '充电桩#012',
      type: '充电设备',
      status: 'online',
      operatingStatus: 'standby',
      soc: 100,
      soh: 99,
      power: '7.0 kW',
      location: 'C区充电站',
      lastUpdate: '刚刚'
    },
    {
      id: 'DEV005',
      name: '储能柜#003',
      type: '储能设备',
      status: 'warning',
      operatingStatus: 'charging',
      soc: 45,
      soh: 88,
      power: '1.2 kW',
      location: 'A区3号位',
      lastUpdate: '10分钟前'
    }
  ];

  const deviceTypes = [
    { value: 'all', label: '全部设备' },
    { value: '储能设备', label: '储能设备' },
    { value: '逆变器', label: '逆变器' },
    { value: '充电设备', label: '充电设备' }
  ];

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          device.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || device.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-gray-500';
      case 'warning': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500/20';
      case 'offline': return 'bg-gray-500/20';
      case 'warning': return 'bg-yellow-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const handleViewDetail = (device: any) => {
    setSelectedDevice(device);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="搜索设备名称或ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background-secondary border border-border-DEFAULT rounded-lg focus:outline-none focus:border-primary text-white"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-background-secondary border border-border-DEFAULT rounded-lg focus:outline-none focus:border-primary text-white"
          >
            {deviceTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors text-white">
          <Plus size={20} />
          <span>添加设备</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDevices.map((device) => (
          <div key={device.id} className="bg-background-secondary rounded-xl p-6 border border-border-DEFAULT">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{device.name}</h3>
                <p className="text-sm text-gray-400">{device.id}</p>
              </div>
              <button className="p-1 hover:bg-background-tertiary rounded-lg transition-colors">
                <MoreVertical size={20} className="text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">类型</span>
                <span className="text-white">{device.type}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">状态</span>
                <div className={`flex items-center gap-2 px-2 py-1 rounded-lg ${getStatusBgColor(device.status)}`}>
                  {device.status === 'online' ? <Wifi size={14} /> : <WifiOff size={14} />}
                  <span className={getStatusColor(device.status)}>
                    {device.status === 'online' ? '在线' : device.status === 'offline' ? '离线' : '告警'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">功率</span>
                <div className="flex items-center gap-2">
                  <Power className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{device.power}</span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border-DEFAULT">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-gray-400 text-xs mb-1">状态</div>
                    <div className="flex justify-center">
                      {device.operatingStatus === 'charging' && <Zap className="w-5 h-5 text-green-500" />}
                      {device.operatingStatus === 'discharging' && <ArrowDownToLine className="w-5 h-5 text-blue-500" />}
                      {device.operatingStatus === 'standby' && <Pause className="w-5 h-5 text-yellow-500" />}
                      {device.operatingStatus === 'offline' && <AlertCircle className="w-5 h-5 text-gray-500" />}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-xs mb-1">SOC</div>
                    <div className="text-white font-semibold">{device.soc}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-xs mb-1">SOH</div>
                    <div className="text-white font-semibold">{device.soh}%</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3">
                <span className="text-gray-400 text-sm">{device.location}</span>
                <span className="text-gray-500 text-xs">{device.lastUpdate}</span>
              </div>

              <button
                onClick={() => handleViewDetail(device)}
                className="w-full mt-3 h-9 px-4 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                查看详情
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 设备详情弹框 */}
      {showDetailModal && selectedDevice && (
        <DeviceDetailModal
          device={selectedDevice}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
};

export default Devices;