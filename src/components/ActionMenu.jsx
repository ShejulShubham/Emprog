import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Download, Upload, RotateCcw } from 'lucide-react'; // Using Lucide icons

const ActionMenu = ({ onDownload, onReload }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block float-right" ref={menuRef}>
      {/* Trigger Button */}
      <div className="group relative flex flex-col items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-full transition-all duration-200 
        ${isOpen
              ? 'bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
            }`}
        >
          <MoreVertical size={20} />
        </button>

        {/* Custom "More" Tooltip on Hover */}
        {!isOpen && (
          <span className="absolute -bottom-10 scale-0 transition-all rounded bg-gray-900 dark:bg-slate-800 p-2 text-xs text-white group-hover:scale-100 z-50 whitespace-nowrap shadow-lg">
            More Options
          </span>
        )}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xl py-2 z-50 transition-all">
          <button
            onClick={() => { onDownload(); setIsOpen(false); }}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Download size={18} className="mr-3 text-gray-500 dark:text-gray-400" />
            Export Watchlist
          </button>

          <button
            onClick={() => { onReload(); setIsOpen(false); }}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw size={18} className="mr-3 text-gray-500 dark:text-gray-400" />
            Sync Watchlist
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;