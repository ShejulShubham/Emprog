import { Github, GitMerge, GitPullRequestArrow, Scale } from 'lucide-react';
import metaData from '../meta-data.json';

const version = createVersion() || "4.0.4";

function createVersion() {

  // TODO: try to do this by different method. (Hint: turn into array and manipulate the string from metaData)

  // Get current date components
  const now = new Date();
  const year = now.getFullYear();
  const trimmedYear = new String(year).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const newVersion = `${metaData.major}.${trimmedYear}.${month}`;

  return newVersion;
}

export default function Footer() {
  // TODO: Show latest changes in app if the version is clicked.
  return (
    <footer className="p-4 flex flex-wrap gap-4 justify-between items-center bg-gray-50 dark:bg-slate-950 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <p className="text-sm">© {new Date().getFullYear()} Emprog. All rights reserved.</p>

      <div className="flex items-center gap-6">
        {/* Github Link */}
        <div className='group relative'>
          <a
            href="https://github.com/ShejulShubham/Emprog"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 transition-all rounded bg-gray-900 dark:bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-50 whitespace-nowrap">
            Github
          </span>
        </div>

        {/* Version Info */}
        <div className='group relative'>
          <button className='flex items-center hover:text-gray-900 dark:hover:text-white transition-colors'>
            <GitPullRequestArrow size={18} className='mr-2' />
            <p className="text-sm font-medium">v{version}</p>
          </button>
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 transition-all rounded bg-gray-900 dark:bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-50 whitespace-nowrap">
            Current Version
          </span>
        </div>
      </div>
    </footer>
  );
}
