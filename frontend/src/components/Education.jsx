import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
  return (
    <section id="education" className="py-24 bg-slate-900/30 px-6 relative z-10 scroll-mt-24 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-2">Academic Foundation</p>
          <h2 className="text-4xl font-black uppercase tracking-tight">Education</h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-sm hover:bg-slate-800/40 hover:border-blue-500/30 transition-all group"
          >
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-slate-800 shrink-0 overflow-hidden group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
                  <img
                    src="/vivekanandha-logo.png"
                    alt="Vivekanandha Logo"
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://img.icons8.com/fluency/96/graduation-cap.png"; }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Vivekanandha Polytechnic College</h3>
                  <p className="text-blue-600 font-bold">Diploma in Computer Application Engineering</p>
                </div>
              </div>
              <span className="px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold h-fit">2014</span>
            </div>
            <p className="text-slate-500 leading-relaxed ml-0 md:ml-18 italic">Seplanatham, Vadalur</p>
          </motion.div>
          {/* School Education (SSLC/HSC) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-sm hover:bg-slate-800/40 hover:border-blue-500/30 transition-all group"
          >
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-slate-700 shrink-0 overflow-hidden group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all">
                  <img
                    src="/nlc-logo.png"
                    alt="NLC Logo"
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://img.icons8.com/color/96/school.png"; }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">NLC BOYS HSSC., BLOCK-10</h3>
                  <p className="text-blue-600 font-bold">SSLC / HSC</p>
                </div>
              </div>
              <span className="px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold h-fit">2007</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;