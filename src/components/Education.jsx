import React from 'react';
import { ExternalLink } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-24 px-6 bg-[#0d1529]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">Education & Certifications</h2>
        <div className="space-y-6">
          <div className="bg-[#161e33] border border-slate-800 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold text-gray-300">IIT Madras Pravartak</h4>
              <img src="https://www.guvi.in/images/guvi-logo-new.png" alt="Guvi" className="h-8 bg-white rounded-md p-1" />
            </div>
            <p className="text-gray-400 mb-2">Full Stack Development Course with AI Tools</p>
            <a 
              href="https://drive.google.com/file/d/1SC6Qx0CM__ctupSJRTndkbUAd1ODScNw/view?usp=drivesdk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              Certificate Earned <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="bg-[#161e33] border border-slate-800 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold text-gray-300">NSDC</h4>
              <img src="https://cdn.brandfetch.io/nsdcindia.org/logo" alt="NSDC" className="h-10 bg-white rounded-md p-1" />
            </div>
            <p className="text-gray-400 mb-2">Full Stack Developer Certification</p>
            <a 
              href="https://drive.google.com/file/d/1ZwDnqn3J4zgJ7SA1E03FTEBseuvonw4P/view?usp=drivesdk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              Certificate Earned <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;