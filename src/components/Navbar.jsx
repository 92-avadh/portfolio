import Link from 'next/link';
import ThemeToggle from './ThemeToggle'; // Import the new toggle

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm z-50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          Avadh.
        </Link>
        
        {/* Right Side: Links + Toggle */}
        <div className="flex items-center space-x-6">
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300 mr-4">
            <Link href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
            <Link href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</Link>
            <Link href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</Link>
            <Link href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
          </div>

          {/* Dark/Light Mode Button */}
          <ThemeToggle />

          {/* Mobile Menu Button (Hamburger) */}
          <button className="md:hidden text-gray-600 dark:text-gray-300 ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

      </div>
    </nav>
  );
}