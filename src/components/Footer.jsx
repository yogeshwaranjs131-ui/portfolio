import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="py-20 border-t border-slate-800 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 italic">Let's Connect</h2>
        <div className="flex justify-center gap-6 mb-12">
          <a href="https://linkedin.com/in/yogeshwaran-uthayakumar-25b94b170" className="p-3 bg-slate-800 rounded-full hover:bg-purple-600 transition-colors"><Linkedin className="w-6 h-6" /></a>
          <a href="https://github.com/yogeshwaranjs131-u" className="p-3 bg-slate-800 rounded-full hover:bg-cyan-600 transition-colors"><Github className="w-6 h-6" /></a>
          <a href="mailto:yogeshwaranjs131@gmail.com" className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"><Mail className="w-6 h-6" /></a>
        </div>
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Handcrafted with React & Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;