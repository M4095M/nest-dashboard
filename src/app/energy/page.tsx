// src/app/dashboard/energy/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { 
  BarChart, 
  ThermometerSnowflake, 
  ThermometerSun,
  Fan,
} from 'lucide-react';
import Link from 'next/link';
import DashboardCard from '../../components/DashboardCard';
import EnergyConsumptionChart from '../../components/EnergyConsumptionChart';
import TemperatureDisplay from '../../components/TemperatureDisplay';

interface EnergyData {
  current: number;
  previous: number;
  history: Array<{
    date: string;
    value: number;
  }>;
}

interface DashboardData {
  energy: EnergyData;
  roomTemp: number;
  outdoorTemp: number;
  predictedOutdoorTemp: number;
  fanStatus: boolean;
  fanSpeed: number;
}

export default function EnergyDashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    energy: { 
      current: 0, 
      previous: 0,
      history: []
    },
    roomTemp: 0,
    outdoorTemp: 0,
    predictedOutdoorTemp: 0,
    fanStatus: false,
    fanSpeed: 0,
  });

  // Load mock data for the energy dashboard initially
  useEffect(() => {
    const loadMockData = () => {
      setDashboardData((prevData) => ({
        ...prevData,
        energy: { 
          current: 245, 
          previous: 210,
          history: [
            { date: '2025-04-05', value: 230 },
            { date: '2025-04-06', value: 245 },
            { date: '2025-04-07', value: 210 },
            { date: '2025-04-08', value: 225 },
            { date: '2025-04-09', value: 260 },
            { date: '2025-04-10', value: 240 },
            { date: '2025-04-11', value: 245 },
          ]
        },
        roomTemp: 22.5,
        outdoorTemp: 28.3,
        predictedOutdoorTemp: 18.31,
        fanStatus: true,
        fanSpeed: 75,
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

    // Listen for real-time predicted temperature updates
    socket.on('temperaturePrediction', (data: { temperature: number; predictedFor?: string }) => {
      console.log('Received temperature prediction:', data);
      setDashboardData((prevData) => ({
        ...prevData,
        predictedOutdoorTemp: data.temperature,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold text-green-700">Loading energy data...</div>
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
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Energy Consumption Dashboard</h1>
            <p className="text-green-600">Real-time monitoring and control</p>
          </div>
          <nav>
            <Link href="/security" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Security Dashboard
            </Link>
          </nav>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Energy Consumption Summary */}
          <DashboardCard 
            title="Energy Consumption by Fan" 
            icon={<BarChart className="text-green-600" />}
            value={`${dashboardData.energy.current} kWh`}
            trend={dashboardData.energy.current > dashboardData.energy.previous ? 'up' : 'down'}
          />
          
          {/* Room Temperature */}
          <DashboardCard 
            title="Room Temperature" 
            icon={<ThermometerSnowflake className="text-blue-500" />}
            value={`${dashboardData.roomTemp}°C`}
          />
          
          {/* Predicted Temperature */}
          <DashboardCard 
            title="Predicted Temperature" 
            icon={<ThermometerSun className="text-orange-500" />}
            value={`${dashboardData.predictedOutdoorTemp}°C`}
          />
          
          {/* Cooling Status */}
          <DashboardCard 
            title="Cooling System" 
            icon={<Fan className={dashboardData.fanStatus ? "text-green-600" : "text-gray-400"} />}
            value={dashboardData.fanStatus ? `Active (${dashboardData.fanSpeed}%)` : "Inactive"}
            status={dashboardData.fanStatus ? "active" : "inactive"}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Energy Consumption Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 h-full">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Energy Consumption Trend by Fan</h2>
              <EnergyConsumptionChart data={dashboardData.energy.history} />
              <div className="m-4 text-sm text-gray-300">
                Note: the kWh is a scaling of the PMW signal from the fan. The higher the kWh, the more power is consumed by the fan.
              </div>
            </div>
          </div>
          
          {/* Right Column - Temperature Display */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-4 h-full">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Temperature Monitoring</h2>
              <TemperatureDisplay 
                roomTemp={dashboardData.roomTemp} 
                outdoorTemp={dashboardData.outdoorTemp}
                predictedTemp={dashboardData.predictedOutdoorTemp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}