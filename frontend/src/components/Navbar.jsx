import React from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';

const Navbar = ({ activeSection, isScrolled, isMenuOpen, setIsMenuOpen, githubUrl, linkedinUrl }) => {
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-slate-950/90 backdrop-blur-lg border-b border-slate-800 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <span className="text-xl font-black tracking-tighter text-blue-500 uppercase">YOGESHWARAN.DEV</span>
        <div className="hidden md:flex items-center space-x-8">
          {['home', 'experience', 'projects', 'skills', 'contact'].map((item) => (
            <a key={item} href={`#${item}`} className={`text-xs uppercase tracking-widest font-bold transition-colors ${activeSection === item ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'}`}>
              {item}
            </a>
          ))}
          <div className="flex items-center gap-3">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              <Linkedin className="w-3 h-3" /> LINKEDIN
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-400 hover:text-white">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-6 gap-4">
          {['home', 'experience', 'projects', 'skills', 'contact'].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setIsMenuOpen(false)} className="text-sm uppercase tracking-widest font-bold text-slate-400 hover:text-blue-500 transition-colors">
              {item}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-xs font-black text-blue-500">LINKEDIN</a>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="text-xs font-black text-slate-400">GITHUB</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;