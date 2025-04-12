// src/components/AlertsNotifications.tsx
import { Bell, AlertTriangle } from 'lucide-react';

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

interface AlertsNotificationsProps {
  notifications: Notification[];
  alerts: Alert[];
}

export default function AlertsNotifications({ notifications, alerts }: AlertsNotificationsProps) {
  return (
    <div className="space-y-6">
      {/* Alerts Section */}
      <div>
        <h3 className="text-red-600 font-medium flex items-center mb-2">
          <AlertTriangle size={16} className="mr-1" />
          Alerts
        </h3>
        
        {alerts.length === 0 ? (
          <div className="text-gray-500 text-sm">No active alerts</div>
        ) : (
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className="bg-red-50 border-l-4 border-red-500 p-3 rounded"
              >
                <div className="flex justify-between">
                  <span className="font-medium text-red-700">{alert.message}</span>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Notifications Section */}
      <div>
        <h3 className="text-green-600 font-medium flex items-center mb-2">
          <Bell size={16} className="mr-1" />
          Notifications
        </h3>
        
        {notifications.length === 0 ? (
          <div className="text-gray-500 text-sm">No recent notifications</div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="border-b border-gray-100 pb-2 last:border-0"
              >
                <div className="flex justify-between">
                  <span className="text-gray-700">{notification.message}</span>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}