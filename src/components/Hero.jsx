"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-1/4 left-[20%] w-[500px] h-[500px] bg-indigo-400/15 dark:bg-indigo-600/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-1/3 right-[20%] w-[400px] h-[400px] bg-violet-400/15 dark:bg-violet-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-start text-left order-2 lg:order-1"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-indigo-100 dark:border-indigo-900/50 shadow-sm mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
              Open to opportunities
            </span>
          </div>

          {/* Greeting */}
          <p className="text-lg md:text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500" />
            Hello, I&apos;m
          </p>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.05] mb-4 tracking-tight">
            Avadh
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400">
              Dhameliya
            </span>
          </h1>

          {/* Role Tag */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-sm font-bold tracking-wide border border-indigo-100 dark:border-indigo-900/50">
              FULL-STACK DEVELOPER
            </span>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-lg leading-relaxed">
            Specializing in the <strong className="font-semibold text-gray-800 dark:text-gray-200">MERN stack & Next.js</strong>,
            I craft scalable, performant, and user-centric digital experiences that turn ideas into production-ready applications.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="group relative flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1"
            >
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#contact"
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white dark:bg-gray-900 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-800 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 shadow-sm"
            >
              <Download size={18} />
              Let&apos;s Talk
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            {[
              { number: "4+", label: "Projects Built" },
              { number: "MERN", label: "Stack Expert" },
              { number: "2025", label: "Graduating" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                  {stat.number}
                </p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-500 mt-1 tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="flex items-center justify-center order-1 lg:order-2"
        >
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="relative"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-3 rounded-full profile-glow-ring opacity-50 blur-sm" />

            {/* Inner gradient border */}
            <div className="relative p-1.5 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600">
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px] rounded-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                <Image
                  src="/profile.jpg"
                  alt="Avadh Dhameliya - Full Stack Developer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 340px"
                />
              </div>
            </div>

            {/* Floating badges — CSS only, no framer-motion */}
            <div className="absolute -top-2 -right-4 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg text-sm font-bold text-gray-800 dark:text-white animate-float">
              ⚛️ React
            </div>

            <div className="absolute -bottom-2 -left-6 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg text-sm font-bold text-gray-800 dark:text-white animate-float animation-delay-2000">
              🚀 Next.js
            </div>

            <div className="absolute top-1/2 -right-10 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg text-sm font-bold text-gray-800 dark:text-white animate-float animation-delay-4000">
              🟢 Node.js
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-600 font-medium">Scroll</span>
        <div className="w-5 h-8 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-indigo-500 rounded-full" />
        </div>
      </div>
    </section>
  );
}