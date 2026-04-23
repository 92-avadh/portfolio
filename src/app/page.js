import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Academics from "../components/Academics";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <Projects />
      <Skills />
      <Academics />
      <Contact />
    </main>
  );
}