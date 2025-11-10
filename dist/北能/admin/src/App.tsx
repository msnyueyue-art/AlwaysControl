import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Devices from './pages/Devices';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import OperationLogs from './pages/OperationLogs';
import AlarmManagement from './pages/AlarmManagement';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/operation-logs" element={<OperationLogs />} />
          <Route path="/device-logs" element={<OperationLogs />} />
          <Route path="/alarms" element={<AlarmManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
