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
    <footer className="p-4 mt-8 flex flex-wrap gap-4 justify-between bg-gray-800 text-gray-400 text-center">
      <p>© {new Date().getFullYear()} Emprog. All rights reserved.</p>
      <div className='group relative hover:bg-white-300' >
        <a
          href="https://github.com/ShejulShubham/Emprog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>
        <span className="absolute -top-10 -left-5 scale-0 transition-all rounded bg-gray-700 p-2 text-xs text-white group-hover:scale-100 z-50">
          Github
        </span>
      </div>
      <div className='group relative' >
        <button className='flex'>
          <GitPullRequestArrow className='pr-2' />
          <p>v{version}</p>
        </button>
        <span className="absolute -top-10 -left-5 scale-0 transition-all rounded bg-gray-700 p-2 text-xs text-white group-hover:scale-100 z-50">
          Current Version
        </span>
      </div>
    </footer>
  );
}
