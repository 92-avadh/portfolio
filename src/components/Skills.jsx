"use client";

import { motion } from "framer-motion";
import { Layout, Server, Database, Wrench } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Layout size={22} />,
      skills: ["React.js", "Next.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5/CSS3"],
      color: "from-indigo-500 to-blue-500",
      iconBg: "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Backend",
      icon: <Server size={22} />,
      skills: ["Node.js", "Express.js", "RESTful APIs", "Authentication (JWT/OAuth)"],
      color: "from-violet-500 to-purple-500",
      iconBg: "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400",
    },
    {
      title: "Database",
      icon: <Database size={22} />,
      skills: ["MongoDB", "Mongoose", "Data Modeling", "Aggregation Pipeline"],
      color: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Tools & Others",
      icon: <Wrench size={22} />,
      skills: ["Git & GitHub", "Postman", "Vercel / Netlify", "Algorithmic Automation"],
      color: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <section id="skills" className="py-28 bg-white dark:bg-gray-950 transition-colors duration-500 relative">
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
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-5">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              Arsenal
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The core technologies and tools I use to build scalable, full-stack
            applications and automate complex workflows.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-7 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient top accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="flex items-center gap-3.5 mb-7 pb-5 border-b border-gray-200 dark:border-gray-800">
                <div className={`p-2.5 rounded-xl ${category.iconBg} transition-colors`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <ul className="space-y-3.5">
                {category.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 font-medium text-[15px]"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color} flex-shrink-0`} />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Tech Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 overflow-hidden relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10" />

          <div className="flex animate-marquee">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6 pr-6 flex-shrink-0">
                {[
                  "React", "Next.js", "Node.js", "MongoDB", "Express",
                  "JavaScript", "TypeScript", "Tailwind", "Git", "REST API",
                  "Python", "JWT", "Mongoose", "Vercel",
                ].map((tech, i) => (
                  <span
                    key={`${setIndex}-${i}`}
                    className="px-5 py-2.5 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}