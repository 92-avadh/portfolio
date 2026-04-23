"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, Presentation, GraduationCap, Calendar } from "lucide-react";

export default function Academics() {
  const writingProjects = [
    {
      title: "Understanding ACM Style Referencing in Technical Reports",
      type: "Academic Project Report",
      icon: <FileText size={22} />,
      color: "from-indigo-500 to-blue-500",
      iconBg: "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400",
      description:
        "A comprehensive, final-year IT/Computer Science project report detailing the nuances of ACM citation styles, ensuring academic rigor and proper attribution in technical documentation.",
    },
    {
      title: "Referencing Styles & Best Practices",
      type: "Technical Presentation",
      icon: <Presentation size={22} />,
      color: "from-violet-500 to-purple-500",
      iconBg: "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400",
      description:
        "A highly refined, condensed presentation designed to communicate complex documentation standards to a collegiate audience, aligning visual slides directly with technical report structures.",
    },
  ];

  return (
    <section
      id="academics"
      className="py-28 bg-gray-50/50 dark:bg-gray-900/50 transition-colors duration-500"
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
            Education
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-5">
            Academics &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Writing
            </span>
          </h2>
        </motion.div>

        {/* Education card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl text-white">
            <GraduationCap size={28} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Bachelor of Computer Application
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              SDJ International College, Vesu, Surat
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-semibold">
            <Calendar size={16} />
            <span>2023 – 2026</span>
          </div>
        </motion.div>

        {/* Writing Projects */}
        <div className="grid md:grid-cols-2 gap-7">
          {writingProjects.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient top accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="flex items-center gap-4 mb-5">
                <div className={`p-3 rounded-xl ${item.iconBg}`}>
                  {item.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {item.type}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}