import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Download, Upload, RotateCcw } from 'lucide-react'; // Using Lucide icons

const ActionMenu = ({ onDownload, onReload }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu if user clicks outside
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
          className={`p-2 rounded-full transition-colors duration-200 
            ${isOpen ? 'bg-white-800' : 'hover:bg-white-800'} 
            text-white-400 hover:text-black`}
        >
          <MoreVertical size={20} />
        </button>

        {/* Custom "More" Tooltip on Hover */}
        {!isOpen && (
          <span className="absolute -bottom-10 scale-0 transition-all rounded bg-gray-700 p-2 text-xs text-white group-hover:scale-100 z-50">
            More
          </span>
        )}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white border border-white-700 shadow-xl py-2 z-50">
          <button
            onClick={() => { onDownload(); setIsOpen(false); }}
            className="flex items-center w-full px-4 py-3 text-sm text-white-300 hover:bg-white-700 transition-colors"
          >
            <Download size={18} className="mr-3" />
            Export Watchlist
          </button>
          
          <button
            onClick={() => { onReload(); setIsOpen(false); }}
            className="flex items-center w-full px-4 py-3 text-sm text-white-300 hover:bg-white-700 transition-colors"
          >
            <RotateCcw size={18} className="mr-3" />
            Sync Watchlist
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;