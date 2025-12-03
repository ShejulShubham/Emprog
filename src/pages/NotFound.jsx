import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { MoveLeft } from 'lucide-react';

export default function NotFound(){
  const navigate = useNavigate();
  usePageTitle("Not Found!")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        
        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          Uncharted Territory
        </h2>
        
        <p className="text-gray-600 mt-4 max-w-md mx-auto">
          You have reached the edge of the known universe. 
          There is nothing here but empty space and stardust.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Go Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-300 transition duration-300 flex gap-2"
          >
            <MoveLeft /> Turn Back
          </button>

          {/* Go Home Button */}
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-900 transition duration-300 shadow-lg"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}