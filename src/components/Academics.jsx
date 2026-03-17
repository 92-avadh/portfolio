"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, Presentation } from "lucide-react";

export default function Academics() {
  const writingProjects = [
    {
      title: "Understanding ACM Style Referencing in Technical Reports",
      type: "Academic Project Report",
      icon: <FileText size={24} className="text-blue-500" />,
      description: "A comprehensive, final-year IT/Computer Science project report detailing the nuances of ACM citation styles, ensuring academic rigor and proper attribution in technical documentation."
    },
    {
      title: "Referencing Styles & Best Practices",
      type: "Technical Presentation",
      icon: <Presentation size={24} className="text-purple-500" />,
      description: "A highly refined, condensed presentation designed to communicate complex documentation standards to a collegiate audience, aligning visual slides directly with technical report structures."
    }
  ];

  return (
    <section id="academics" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-xl">
            <BookOpen size={28} className="text-gray-900 dark:text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Academics & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Writing</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {writingProjects.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white dark:bg-gray-950 rounded-lg shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.type}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{item.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}