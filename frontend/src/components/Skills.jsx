import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Briefcase, CheckCircle, Server, Database } from 'lucide-react';

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-slate-950 px-6 z-10 relative border-t border-slate-900 scroll-mt-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-2">Technical Expertise</p>
          <h2 className="text-4xl font-black mb-8 italic">Multi-Disciplinary Expertise</h2>
          <div className="space-y-10">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-400"><Code className="w-5 h-5" /> Web Development</h3>
              <div className="grid grid-cols-2 gap-3">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Tailwind CSS'].map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800"><CheckCircle className="w-4 h-4 text-blue-500" /> <span className="font-bold text-sm text-slate-300">{skill}</span></div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-400"><Cpu className="w-5 h-5" /> IT Infrastructure</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Networking', 'SD WAN', 'Active Directory', 'Hardware Support', 'O365', 'IT Security'].map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-xl border border-slate-800"><Server className="w-4 h-4 text-blue-500" /> <span className="font-bold text-sm text-slate-300">{skill}</span></div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-400"><Briefcase className="w-5 h-5" /> Office Administration</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Payroll & Budgeting', 'HR & Recruitment', 'Front Desk Ops', 'Financial Reporting', 'Guest Relations', 'Office Management'].map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-xl border border-slate-800"><CheckCircle className="w-4 h-4 text-blue-500" /> <span className="font-bold text-sm text-slate-300">{skill}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-blue-600 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <h3 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Professional Advantage</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="text-3xl font-black opacity-30">01</span>
                <div><p className="font-bold text-lg">Full-Stack Capability</p><p className="text-blue-100 text-sm">Certified in MERN stack development for modern, interactive web solutions.</p></div>
              </li>
              <li className="flex gap-4">
                <span className="text-3xl font-black opacity-30">02</span>
                <div><p className="font-bold text-lg">Infrastructure Knowledge</p><p className="text-blue-100 text-sm">Deep understanding of deployment environments and network security.</p></div>
              </li>
              <li className="flex gap-4">
                <span className="text-3xl font-black opacity-30">03</span>
                <div><p className="font-bold text-lg">9+ Years Experience</p><p className="text-blue-100 text-sm">A veteran IT engineer with a proven track record in high-stakes environments.</p></div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;