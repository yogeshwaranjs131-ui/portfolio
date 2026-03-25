import React from 'react';
import { Download } from 'lucide-react';

const Hero = ({ userPhoto }) => {
  return (
    <section id="home" className="relative pt-20 pb-32 px-6">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80" 
          alt="Background" 
          className="w-full h-full object-cover object-left opacity-20" 
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
            Hi, I'm Yogeshwaran,
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-purple-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8">
            Full-Stack Software Engineer
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
            I specialize in building scalable web applications from scratch—handling everything from intuitive UI/UX design to robust backend architecture and database management. I turn complex problems into elegant, functional digital solutions.
          </p>
          <a 
            href="https://drive.google.com/file/d/1CRoXhH5q1sKj1FLCp1T5vKvmR_FW31Nh/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-8 py-3.5 bg-linear-to-r from-purple-600 to-cyan-500 rounded-full font-bold items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 text-white"
          >
            Download CV <Download className="w-5 h-5" />
          </a>
        </div>
        
        {/* Profile Photo */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-72 h-72 md:w-112.5 md:h-112.5 md:ml-28">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent bg-linear-to-tr from-purple-600 via-blue-500 to-cyan-400 p-0.5 opacity-80">
              <div className="w-full h-full rounded-full bg-[#0b1121]"></div>
            </div>
            {/* Inner Glow Ring */}
            <div className="absolute inset-4 rounded-full border-10 border-slate-800/50"></div>
            {/* Image */}
            <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-[#1a2333]">
              <img 
                src={userPhoto} 
                alt="Profile" 
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;