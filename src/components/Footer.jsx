import { Github } from 'lucide-react';
import metaData from '../meta-data.json';

export default function Footer() {
  return (
    <footer className="flex justify-between bg-gray-800 text-gray-400 text-center p-4 mt-6">
      <p>© {new Date().getFullYear()} Emprog. All rights reserved.</p>
      <a
        href="https://github.com/ShejulShubham/Emprog"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
      </a>
      <p>{metaData.version}</p>
    </footer>
  );
}
