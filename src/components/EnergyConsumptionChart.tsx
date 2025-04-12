// src/components/EnergyConsumptionChart.tsx
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

interface EnergyDataPoint {
  date: string;
  value: number;
}

interface EnergyConsumptionChartProps {
  data: EnergyDataPoint[];
}

export default function EnergyConsumptionChart({ data }: EnergyConsumptionChartProps) {
  const [hoverData, setHoverData] = useState<EnergyDataPoint | null>(null);

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-green-700">{`${payload[0].value} kWh`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        /*  onMouseMove={(data: { activePayload: { payload: EnergyDataPoint; }[]; }) => {
            if (data && data.activePayload) {
              setHoverData(data.activePayload[0].payload as EnergyDataPoint);
            }
          }}*/
          onMouseLeave={() => setHoverData(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date: string | number | Date) => {
              const d = new Date(date);
              return `${d.getDate()}/${d.getMonth() + 1}`;
            }}
          />
          <YAxis 
            domain={['dataMin - 20', 'dataMax + 20']}
            tickFormatter={(value: any) => `${value} kWh`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#10B981" 
            strokeWidth={2}
            activeDot={{ r: 6, fill: "#047857" }} 
            dot={{ r: 4, fill: "#10B981" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}