"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // 'idle', 'submitting', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Gather form data
    const formData = new FormData(e.target);
    
    // Add your specific Web3Forms Access Key
    formData.append("access_key", "8e6e1d99-6646-4ba5-a38c-117c1e8ea073");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        e.target.reset(); // Clear the form
        
        // Reset the success message after 5 seconds
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
    <section id="contact" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
              Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">together.</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              I'm currently available for freelance work and full-time opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              <a href="mailto:your.email@example.com" className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                  <Mail size={24} />
                </div>
                <span className="text-lg font-medium">your.email@example.com</span>
              </a>
              
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <MapPin size={24} />
                </div>
                <span className="text-lg font-medium">Ahmedabad, Gujarat, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-10">
              <a href="#" className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-all hover:-translate-y-1">
                <Github size={24} />
              </a>
              <a href="#" className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all hover:-translate-y-1">
                <Linkedin size={24} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 lg:p-10 shadow-lg relative overflow-hidden"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-900 dark:text-white">Your Name</label>
                  <input type="text" name="name" id="name" required placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-900 dark:text-white">Your Email</label>
                  <input type="email" name="email" id="email" required placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold text-gray-900 dark:text-white">Subject</label>
                <input type="text" name="subject" id="subject" required placeholder="Project Inquiry" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-900 dark:text-white">Message</label>
                <textarea name="message" id="message" required rows="5" placeholder="Tell me about your project..." className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"></textarea>
              </div>

              {/* Dynamic Submit Button */}
              <button 
                type="submit" 
                disabled={status === "submitting" || status === "success"}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-md ${
                  status === "success" 
                    ? "bg-green-500 text-white hover:bg-green-600" 
                    : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5"
                } disabled:opacity-70 disabled:hover:-translate-y-0 disabled:cursor-not-allowed`}
              >
                {status === "idle" && <><Send size={18} /> Send Message</>}
                {status === "submitting" && <><Loader2 size={18} className="animate-spin" /> Sending...</>}
                {status === "success" && <><CheckCircle2 size={18} /> Message Sent!</>}
                {status === "error" && <><Send size={18} /> Error, Try Again</>}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}