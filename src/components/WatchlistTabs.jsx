import React, { useState } from 'react';

export default function WatchlistTabs() {
  const [activeTab, setActiveTab] = useState('ongoing');

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Tab Container */}
      <div className="radio-inputs relative flex w-[300px] flex-wrap rounded-lg bg-gray-200 p-1 text-sm shadow-sm dark:bg-gray-800">
        
        {/* Ongoing Tab */}
        <label className="flex-1 text-center cursor-pointer">
          <input 
            type="radio" 
            name="watchlist-state" 
            className="hidden" 
            checked={activeTab === 'ongoing'}
            onChange={() => setActiveTab('ongoing')}
          />
          <span className={`flex items-center justify-center rounded-md py-2 transition-all duration-150 ease-in-out
            ${activeTab === 'ongoing' 
              ? 'bg-white font-semibold text-slate-900 shadow dark:bg-gray-600 dark:text-white' 
              : 'text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}>
            Ongoing
          </span>
        </label>

        {/* Complete Tab */}
        <label className="flex-1 text-center cursor-pointer">
          <input 
            type="radio" 
            name="watchlist-state" 
            className="hidden" 
            checked={activeTab === 'complete'}
            onChange={() => setActiveTab('complete')}
          />
          <span className={`flex items-center justify-center rounded-md py-2 transition-all duration-150 ease-in-out
            ${activeTab === 'complete' 
              ? 'bg-white font-semibold text-slate-900 shadow dark:bg-gray-600 dark:text-white' 
              : 'text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}>
            Complete
          </span>
        </label>
      </div>

      {/* Content Rendering */}
      <div className="w-full max-w-md text-center">
        {activeTab === 'ongoing' ? (
          <p className="text-gray-800 dark:text-gray-100">Displaying your active watchlist...</p>
        ) : (
          <p className="text-gray-800 dark:text-gray-100">Displaying your finished shows/movies...</p>
        )}
      </div>
    </div>
  );
};