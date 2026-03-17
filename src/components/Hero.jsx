"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Ambient Glowing Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Typography & Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 tracking-wide">Available for work</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
            Building digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
              experiences.
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
            Hi, I'm <strong className="font-semibold text-gray-900 dark:text-white">Avadh Dhameliya</strong>. A Full-Stack Developer specializing in the MERN stack and Next.js, crafting scalable and user-centric applications.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Explore Projects
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <Link
              href="#contact"
              className="px-7 py-3.5 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Glassmorphism Code Snippet */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="hidden lg:block relative"
        >
          {/* The Glass Window */}
          <div className="relative rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-2xl p-6 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
            
            {/* Window Controls (Mac style) */}
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            
            {/* Formatted Code */}
            <div className="font-mono text-[15px] leading-loose text-gray-700 dark:text-gray-300">
              <p><span className="text-purple-600 dark:text-purple-400 font-semibold">const</span> <span className="text-blue-600 dark:text-blue-400">developer</span> = {'{'}</p>
              <p className="pl-6">name: <span className="text-green-600 dark:text-green-400">'Avadh Dhameliya'</span>,</p>
              <p className="pl-6">skills: [<span className="text-green-600 dark:text-green-400">'React'</span>, <span className="text-green-600 dark:text-green-400">'Next.js'</span>, <span className="text-green-600 dark:text-green-400">'Node.js'</span>, <span className="text-green-600 dark:text-green-400">'MongoDB'</span>],</p>
              <p className="pl-6">focus: <span className="text-green-600 dark:text-green-400">'Scalable Architectures'</span>,</p>
              <p className="pl-6">problemSolver: <span className="text-orange-600 dark:text-orange-400">true</span></p>
              <p>{'};'}</p>
            </div>
          </div>
          
          {/* Decoration behind the window */}
          <div className="absolute -z-10 -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-50"></div>
        </motion.div>
        
      </div>
    </section>
  );
}