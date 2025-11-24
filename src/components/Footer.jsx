import { Github } from 'lucide-react';

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
      <p>Version 1.25.11</p>
    </footer>
  );
}
