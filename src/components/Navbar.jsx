import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-[#0b1121]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="text-xl font-semibold tracking-tight uppercase">Y.U. portfolio</span>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          {['About me', 'Skills & Tools', 'Experience', 'Projects', 'Education'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase().split(' ')[0])}
              className="hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0b1121] border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl">
          {['About me', 'Skills & Tools', 'Experience', 'Projects', 'Education'].map((item) => (
            <button
              key={item}
              onClick={() => {
                scrollTo(item.toLowerCase().split(' ')[0]);
                setIsMenuOpen(false);
              }}
              className="text-left text-gray-400 hover:text-white transition-colors py-2 text-lg font-medium"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;