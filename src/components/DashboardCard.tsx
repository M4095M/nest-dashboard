// src/components/DashboardCard.tsx
import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  value: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  subtext?: string;
  status?: 'active' | 'inactive';
}

export default function DashboardCard({ 
  title, 
  icon, 
  value, 
  trend, 
  trendValue, 
  subtext, 
  status 
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              <span className={trend === 'up' ? 'text-red-500' : 'text-green-500'}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs previous</span>
            </div>
          )}
          {status && (
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          )}
        </div>
        <div className="p-2 rounded-full bg-green-50">{icon}</div>
      </div>
    </div>
  );
}