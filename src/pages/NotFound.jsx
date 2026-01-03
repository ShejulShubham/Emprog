import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { MoveLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  usePageTitle("Not Found!")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <div className="text-center">
        {/* Large 404 Background Text */}
        <h1 className="text-9xl font-bold text-gray-200 dark:text-slate-900 selection:bg-blue-500/30">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
          Uncharted Territory
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-md mx-auto">
          You have reached the edge of the known universe.
          There is nothing here but empty space and stardust.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Go Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-slate-800 transition duration-300 flex items-center justify-center gap-2"
          >
            <MoveLeft size={20} /> Turn Back
          </button>

          {/* Go Home Button */}
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg bg-blue-600 dark:bg-blue-700 text-white font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300 shadow-lg shadow-blue-500/20"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}