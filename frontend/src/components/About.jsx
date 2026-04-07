import React from 'react';
import { Code2, Cpu } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-[#0b1121]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <p>
              I am a dedicated Full Stack Developer with a strong foundation in MERN stack technologies. 
              My journey in tech has been driven by a curiosity to understand how things work under the hood 
              and a passion for creating seamless user experiences.
            </p>
            <p>
              With a background in IT support and administration, I bring a unique perspective to development, 
              focusing not just on code quality but also on system reliability and user satisfaction.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-[#161e33] rounded-xl border border-slate-800">
                <Code2 className="w-8 h-8 text-purple-500 mb-2" />
                <h4 className="font-bold text-white">Frontend</h4>
                <p className="text-sm">React, Tailwind</p>
              </div>
              <div className="p-4 bg-[#161e33] rounded-xl border border-slate-800">
                <Cpu className="w-8 h-8 text-cyan-500 mb-2" />
                <h4 className="font-bold text-white">Backend</h4>
                <p className="text-sm">Node.js, MongoDB</p>
              </div>
            </div>
          </div>
          <div className="bg-[#161e33] p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-600/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-cyan-600/20 rounded-full blur-xl"></div>
            <h3 className="text-2xl font-bold mb-6 text-white">Why Hire Me?</h3>
            <ul className="space-y-4">
              {[
                "Problem-solving mindset developed through years of IT support",
                "Certified Full Stack Developer from IIT Madras Pravartak",
                "Strong attention to detail in UI/UX design",
                "Commitment to writing clean, maintainable code"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></div>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;