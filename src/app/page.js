import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Academics from "../components/Academics"; // Import the new section
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <Projects />
      <Skills />
      
      {/* Insert Academics here */}
      <Academics /> 
      
      <Contact />
      
      <footer className="py-8 text-center border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400 text-sm transition-colors duration-500">
        <p>© {new Date().getFullYear()} Avadh Dhameliya. All rights reserved.</p>
      </footer>
    </main>
  );
}