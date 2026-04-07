import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, MapPin, Briefcase, CheckCircle } from 'lucide-react';

const Hero = ({ displayText, resumeUrl, linkedinUrl, githubUrl, profilePhotoUrl }) => {
  return (
    <section id="home" className="relative pt-32 md:pt-48 pb-32 px-6 z-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6 border border-blue-900/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Certified MERN Stack Developer
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]"
          >
            Yogeshwaran <br /> <span className="text-blue-500 typing-cursor">{displayText}</span>
          </motion.h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-medium">
            Bridging 9+ years of IT Engineering expertise with modern <strong>MERN Stack Development</strong>. Certified by GUVI, specializing in scalable web architectures.
          </p>
          <a href={resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 mb-6 w-fit">
            Download Resume <FileText className="w-5 h-5" />
          </a>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 shadow-xl shadow-blue-900/10">
              Contact Me <Mail className="w-5 h-5" />
            </a>
            <div className="flex gap-2">
              <a href={linkedinUrl} target="_blank" className="p-4 bg-slate-900 border border-slate-800 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href={githubUrl} target="_blank" className="px-8 py-4 bg-slate-900 border border-slate-800 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm">
                View Code <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>

          <div className="relative w-full max-w-md">
            <div className="absolute -top-6 -left-6 z-20 bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-800 hidden md:block animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                  <p className="text-sm font-black text-white">Available for Hire</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-12 -right-8 z-20 bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-800 hidden md:block animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Experience</p>
                  <p className="text-sm font-black text-white">9+ Years IT Eng.</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-4/5 rounded-[3rem] overflow-hidden border-12 border-blue-500/20 shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-5px_rgba(59,130,246,0.6)] hover:border-blue-500/40 transition-all duration-500 z-10 bg-slate-800 group">
              <img
                src={profilePhotoUrl}
                alt="Yogeshwaran U"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-60"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Based In</span>
                </div>
                <h3 className="text-xl font-black">Neyveli, Tamil Nadu</h3>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;