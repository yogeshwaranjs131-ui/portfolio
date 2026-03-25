import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';

const App = () => {
  // YOUR PHOTO URL
  const userPhoto = "/myphoto.png.jpeg"; 

  return (
    <div className="min-h-screen bg-[#0b1121] text-white font-sans selection:bg-purple-500/30">
      <Navbar />
      <Hero userPhoto={userPhoto} />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Footer />
    </div>
  );
};

export default App;