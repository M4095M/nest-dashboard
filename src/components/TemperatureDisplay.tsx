// src/components/TemperatureDisplay.tsx
interface TemperatureDisplayProps {
  roomTemp: number;
  outdoorTemp: number;
  predictedTemp: number;
}

export default function TemperatureDisplay({
  roomTemp,
  outdoorTemp,
  predictedTemp,
}: TemperatureDisplayProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-block rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-8">
          <div className="text-4xl font-bold text-green-700">{roomTemp}°C</div>
          <div className="text-sm text-green-600 mt-1">Current Room</div>
        </div>
      </div>

      <div className="text-center">
        <div className="bg-gradient-to-br inline-block p-8 from-orange-50 to-orange-100 rounded-lg text-center">
          <div className="text-4xl font-semibold text-orange-700">
            {predictedTemp}°C
          </div>
          <div className="text-xs text-orange-600">Predicted High</div>
        </div>
      </div>
    </div>
  );
}
