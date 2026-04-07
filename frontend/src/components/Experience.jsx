import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const Experience = ({ experiences }) => {
  return (
    <section id="experience" className="py-24 bg-slate-900/50 px-6 relative z-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-2">9 Years of Excellence</p>
          <h2 className="text-4xl font-black">Professional Journey</h2>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-sm hover:bg-slate-800/40 hover:border-blue-500/30 transition-all group"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-800/50 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:border-blue-500/50 transition-all overflow-hidden border border-slate-800 shrink-0">
                    {exp.logo ? (
                      <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <Briefcase className="w-6 h-6 text-blue-600 group-hover:text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{exp.role}</h3>
                    <p className="text-blue-600 font-bold text-sm md:text-base">{exp.company}</p>
                  </div>
                </div>
                <span className="px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold h-fit w-fit">{exp.period}</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base md:ml-18">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;