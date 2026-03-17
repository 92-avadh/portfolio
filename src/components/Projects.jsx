"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Local Service Finder",
      description: "A comprehensive platform connecting customers with local service providers. Features include Google authentication, role-based dashboards, and a complete booking system.",
      tags: ["MongoDB", "Express", "React", "Node.js", "Google Auth"],
      github: "https://github.com/92-avadh/Service-finder-app", 
      live: "",   
    },
    {
      title: "Campus Management System",
      description: "An end-to-end academic portal with dedicated interfaces for students, faculty, and administrators. Includes real-time notice boards and digital attendance tracking.",
      tags: ["React", "Node.js", "Express", "Tailwind CSS"],
      github: "https://github.com/92-avadh/campus-management-system",
      live: "", 
    },
    {
      title: "spendwithme",
      description: "A personal finance and expense tracking application. Designed to manage individual income/expenses, split group transactions, and generate detailed financial reports.",
      tags: ["Next.js", "MERN Stack", "REST API"],
      github: "https://github.com/92-avadh/Spendwithme",
      live: "", 
    },
    {
      title: "Algorithmic Trading Automation",
      description: "An automated trading script that interfaces with the Groww platform, executing trades in real-time based on programmatic signals parsed from Telegram channels.",
      tags: ["Python", "API Integration", "Automation", "Webhooks"],
      github: "https://github.com/92-avadh/automation",
      live: "", 
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            A selection of my recent work, focusing on scalable backend architectures, seamless user interfaces, and complex integrations.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full"
            >
              {/* Top Row: Icon & Links */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <FolderGit2 size={28} />
                </div>
                <div className="flex gap-3 text-gray-500 dark:text-gray-400">
                  
                  {/* GitHub Link (Always visible if a link is provided) */}
                  {project.github && (
                    <a href={project.github} className="hover:text-gray-900 dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repo">
                      <Github size={22} />
                    </a>
                  )}
                  
                  {/* Live Link (Hidden because project.live is "") */}
                  {project.live && (
                    <a href={project.live} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                      <ExternalLink size={22} />
                    </a>
                  )}

                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              
              {/* flex-grow pushes the tags to the bottom evenly across all cards */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-grow">
                {project.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-xs font-semibold bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded-full"
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