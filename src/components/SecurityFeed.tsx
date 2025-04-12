// src/components/SecurityFeed.tsx
interface SecurityFeedProps {
    status: boolean;
    data: string | null;
  }
  
  export default function SecurityFeed({ status, data }: SecurityFeedProps) {
    if (!status) {
      return (
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 text-lg font-medium">Camera Offline</div>
            <p className="text-gray-400 text-sm mt-2">The security camera is currently inactive</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="relative">
        <img 
          src={data || '/api/placeholder/640/360'} 
          alt="Security camera feed" 
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2">
          <div className="flex items-center bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
            LIVE
          </div>
        </div>
      </div>
    );
  }