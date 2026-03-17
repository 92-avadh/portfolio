import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Your Logo/Name */}
        <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
          Avadh.
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
          <Link href="#about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="#projects" className="hover:text-blue-600 transition-colors">Projects</Link>
          <Link href="#skills" className="hover:text-blue-600 transition-colors">Skills</Link>
          <Link href="#contact" className="hover:text-blue-600 transition-colors">Contact</Link>
        </div>

        {/* Mobile Menu Button (We can make this functional later) */}
        <button className="md:hidden text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </nav>
  );
}