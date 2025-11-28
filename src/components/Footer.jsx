import { Github } from 'lucide-react';
import metaData from '../meta-data.json';

const version = createVersion() || "4.0.4";

function createVersion() {

  // TODO: try to do this by different method. (Hint: turn into array and manipulate the string from metaData)

  // Get current date components
  const now = new Date();
  const year = now.getFullYear();
  const trimmedYear = new String(year).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const newVersion = `${metaData.major}.${trimmedYear}.${month}.${day}`;

  console.log(`Updated version to: ${newVersion}`);

  return newVersion;
}

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
      <p>{version}</p>
    </footer>
  );
}
