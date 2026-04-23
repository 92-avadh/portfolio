"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle2, Loader2, Heart } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // 'idle', 'submitting', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.target);
    formData.append("access_key", "8e6e1d99-6646-4ba5-a38c-117c1e8ea073");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        e.target.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus("error");
    }
  };

  return (
    <>
      <section
        id="contact"
        className="py-28 bg-white dark:bg-gray-950 transition-colors duration-500 relative"
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
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-5">
              Let&apos;s Build Something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                Together
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Have a project idea, question, or opportunity? I&apos;d love to hear from you.
              Fill out the form below and I&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left Column: Contact Info (2 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Info Cards */}
              <div className="space-y-4">
                <a
                  href="mailto:dhameliyaavadh592@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all group"
                >
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:scale-110 transition-transform">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      dhameliyaavadh592@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Surat, Gujarat, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-4">
                  Follow Me
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/92-avadh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    aria-label="GitHub"
                  >
                    <Github size={22} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/avadh-dhameliya-3560893a2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-[#0A66C2] dark:hover:bg-[#0A66C2] border border-gray-200 dark:border-gray-800 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#0A66C2]"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={22} />
                  </a>
                  <a
                    href="mailto:dhameliyaavadh592@gmail.com"
                    className="p-3.5 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-red-500 dark:hover:bg-red-500 border border-gray-200 dark:border-gray-800 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-red-500"
                    aria-label="Email"
                  >
                    <Mail size={22} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form (3 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 lg:p-10 relative overflow-hidden"
            >
              {/* Hidden email field for Web3Forms - sends to your email */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="to" value="dhameliyaavadh592@gmail.com" />
                <input type="hidden" name="subject_prefix" value="[Portfolio Contact]" />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-bold text-gray-700 dark:text-gray-300"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-bold text-gray-700 dark:text-gray-300"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-bold text-gray-700 dark:text-gray-300"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    placeholder="Project Inquiry"
                    className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-bold text-gray-700 dark:text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows="5"
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all resize-none placeholder:text-gray-400"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className={`w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-md ${
                    status === "success"
                      ? "bg-emerald-500 text-white shadow-emerald-500/25"
                      : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                  } disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed`}
                >
                  {status === "idle" && (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                  {status === "submitting" && (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending...
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <CheckCircle2 size={18} /> Message Sent Successfully!
                    </>
                  )}
                  {status === "error" && (
                    <>
                      <Send size={18} /> Error — Try Again
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-500">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Left: Brand */}
            <div className="text-center md:text-left">
              <p className="text-xl font-extrabold text-gray-900 dark:text-white mb-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                  A
                </span>
                vadh
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                  .
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Full-Stack Developer · MERN & Next.js
              </p>
            </div>

            {/* Center: Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/92-avadh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/avadh-dhameliya-3560893a2"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-gray-500 dark:text-gray-500 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:dhameliyaavadh592@gmail.com"
                className="p-3 text-gray-500 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>

            {/* Right: Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1.5 justify-center md:justify-end">
                © {new Date().getFullYear()} Avadh Dhameliya. Made with
                <Heart size={14} className="text-red-500 fill-red-500" />
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}