"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, FolderGit2, ArrowUpRight } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Local Service Finder",
      description:
        "A comprehensive platform connecting customers with local service providers. Features include Google authentication, role-based dashboards, and a complete booking system.",
      tags: ["MongoDB", "Express", "React", "Node.js", "Google Auth"],
      github: "https://github.com/92-avadh/Service-finder-app",
      live: "",
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Campus Management System",
      description:
        "An end-to-end academic portal with dedicated interfaces for students, faculty, and administrators. Includes real-time notice boards and digital attendance tracking.",
      tags: ["React", "Node.js", "Express", "Tailwind CSS"],
      github: "https://github.com/92-avadh/campus-management-system",
      live: "",
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "SpendWithMe",
      description:
        "A personal finance and expense tracking application. Designed to manage individual income/expenses, split group transactions, and generate detailed financial reports.",
      tags: ["Next.js", "MERN Stack", "REST API"],
      github: "https://github.com/92-avadh/Spendwithme",
      live: "",
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Algorithmic Trading Bot",
      description:
        "An automated trading script that interfaces with the Groww platform, executing trades in real-time based on programmatic signals parsed from Telegram channels.",
      tags: ["Python", "API Integration", "Automation", "Webhooks"],
      github: "https://github.com/92-avadh/automation",
      live: "",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section
      id="projects"
      className="py-28 bg-gray-50/50 dark:bg-gray-900/50 transition-colors duration-500 relative"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wider uppercase mb-4 border border-indigo-100 dark:border-indigo-900/50">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-5">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              Projects
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A curated selection of recent work — scalable backends, polished
            frontends, and complex integrations.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-7">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full"
            >
              {/* Gradient accent top bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Top Row: Icon & Links */}
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`p-3.5 bg-gradient-to-br ${project.color} bg-opacity-10 rounded-2xl`}
                >
                  <FolderGit2 size={26} className="text-white" />
                </div>
                <div className="flex gap-3 text-gray-400 dark:text-gray-500">
                  {project.github && (
                    <a
                      href={project.github}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Repo"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                {project.title}
                <ArrowUpRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-grow text-[15px]">
                {project.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}