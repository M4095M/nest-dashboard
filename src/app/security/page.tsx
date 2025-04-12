// src/app/dashboard/security/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { 
  Video,
  Bell,
  AlertCircle,
  Users
} from 'lucide-react';
import Link from 'next/link';
import DashboardCard from '../../components/DashboardCard';
import SecurityFeed from '../../components/SecurityFeed';
import AlertsNotifications from '../../components/AlertsNotifications';

interface Notification {
  id: number;
  message: string;
  time: string;
  type: string;
}

interface Alert {
  id: number;
  message: string;
  time: string;
  type: string;
}

interface DashboardData {
  notifications: Notification[];
  alerts: Alert[];
  cameraStatus: boolean;
  cameraData: string | null;
  accessCount: number;
}

export default function SecurityDashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    notifications: [],
    alerts: [],
    cameraStatus: false,
    cameraData: null,
    accessCount: 0
  });

  // Load mock data for the security dashboard initially
  useEffect(() => {
    const loadMockData = () => {
      setDashboardData((prevData) => ({
        ...prevData,
        notifications: [
          { id: 1, message: 'John entered the room', time: '10:23 AM', type: 'normal' },
          { id: 2, message: 'Admin accessed control panel', time: '09:45 AM', type: 'normal' },
          { id: 3, message: 'Maintenance check completed', time: 'Yesterday', type: 'normal' },
        ],
        alerts: [
          { id: 1, message: 'Unauthorized access attempt', time: '11:52 AM', type: 'critical' },
          { id: 2, message: 'Room temperature above threshold', time: 'Yesterday', type: 'warning' },
        ],
        cameraStatus: true,
        cameraData: '/api/placeholder/640/360',
        accessCount: 15,
      }));
      setLoading(false);
    };

    loadMockData();
  }, []);

  // Set up Socket.IO connection to fetch updates via WebSockets
  useEffect(() => {
    const socket = io('http://localhost:8000', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server:', socket.id);
    });

    // Listen for security alerts and notifications
    socket.on('securityAlert', (data: Alert) => {
      console.log('Received security alert:', data);
      setDashboardData((prevData) => ({
        ...prevData,
        alerts: [data, ...prevData.alerts],
      }));
    });

    socket.on('notification', (data: Notification) => {
      console.log('Received notification:', data);
      setDashboardData((prevData) => ({
        ...prevData,
        notifications: [data, ...prevData.notifications],
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold text-green-700">Loading security data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Security Dashboard</h1>
            <p className="text-blue-600">Real-time monitoring and alerts</p>
          </div>
          <nav>
            <Link href="/energy" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Energy Dashboard
            </Link>
          </nav>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Camera Status */}
          <DashboardCard 
            title="Camera Status" 
            icon={<Video className={dashboardData.cameraStatus ? "text-green-600" : "text-gray-400"} />}
            value={dashboardData.cameraStatus ? "Online" : "Offline"}
            status={dashboardData.cameraStatus ? "active" : "inactive"}
          />
          
          {/* Alerts Count */}
          <DashboardCard 
            title="Active Alerts" 
            icon={<AlertCircle className="text-red-500" />}
            value={`${dashboardData.alerts.length} Alerts`}
          />
          
          {/* Access Count */}
          <DashboardCard 
            title="Today's Access" 
            icon={<Users className="text-blue-500" />}
            value={`${dashboardData.accessCount} Entries`}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Security Camera */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-800">Security Camera</h2>
                <div className={`px-3 py-1 rounded-full text-sm ${dashboardData.cameraStatus ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {dashboardData.cameraStatus ? 'Online' : 'Offline'}
                </div>
              </div>
              <SecurityFeed 
                status={dashboardData.cameraStatus} 
                data={dashboardData.cameraData} 
              />
            </div>
          </div>
          
          {/* Alerts and Notifications */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-4 h-full">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Alerts & Notifications</h2>
              <AlertsNotifications 
                notifications={dashboardData.notifications}
                alerts={dashboardData.alerts}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}