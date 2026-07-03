import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp, X, Music, Utensils, Columns, ExternalLink, CheckCircle, Globe,
  Briefcase, Plane, Car
} from 'lucide-react';

import './App.css'

// Import Components
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Education from './components/Education.jsx';
import Footer from './components/Footer.jsx';
import LoginPage from './components/LoginPage.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

const TITLES = ["Admin Assistant", "Full Stack Developer", "IT Infrastructure Engineer"];

const Portfolio = ({ dynamicProjects, isProjectsLoading, API_BASE_URL, githubUrl, linkedinUrl, profilePhotoUrl, resumeUrl, nsdcCertificateImageUrl, selectedProject, setSelectedProject, canvasRef }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({ success: false, message: 'Failed to send message.' });
      }
    } catch {
      setSubmitStatus({ success: false, message: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fallbackProjects = [
    {
      title: "Hotel Management Software",
      description: "A comprehensive hotel management system for room booking, guest management, and billing. Features an intuitive dashboard for staff.",
      tech: ["React", "Node.js", "MongoDB", "JWT"],
      image: "https://images.unsplash.com/photo-1563911302283-d256c5824135?w=800&q=80",
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
      liveLink: "#",
      featured: true
    },
    {
      title: "Flight Ticket Booking",
      description: "A flight booking platform offering real-time flight search, price comparison, and secure seat reservation.",
      tech: ["React", "Amadeus API", "Context API", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1609951659574-103b73554b01?w=800&q=80",
      icon: <Plane className="w-5 h-5 text-blue-600" />,
      liveLink: "#",
      featured: true
    },
    {
      title: "Car Rental Software",
      description: "A complete car rental solution with vehicle availability tracking, online booking, and payment processing.",
      tech: ["React", "Redux", "Node.js", "Stripe API"],
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      icon: <Car className="w-5 h-5 text-blue-600" />,
      liveLink: "#",
      featured: true
    },
    {
      title: "Music Streaming App",
      description: "A premium audio platform with high-fidelity streaming, playlist curation, and a modern 'Glassmorphic' UI design using React.",
      tech: ["React", "Web Audio API", "Context API", "Tailwind"],
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
      icon: <Music className="w-5 h-5 text-blue-600" />,
      liveLink: "https://musicappstream.netlify.app/"
    },
    {
      title: "Recipe App (React P2)",
      description: "A sophisticated food discovery application featuring API integration, advanced search filters, and recipe bookmarking functionality.",
      tech: ["React", "REST API", "Redux", "Axios"],
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
      icon: <Utensils className="w-5 h-5 text-blue-600" />,
      liveLink: "https://create-recipeapp.netlify.app/"
    },
    {
      title: "Kanban Board (React P1)",
      description: "A robust task management application with drag-and-drop capabilities, persistent state, and multi-column organization for agile teams.",
      tech: ["React", "DnD Library", "Local Storage", "SCSS"],
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
      icon: <Columns className="w-5 h-5 text-blue-600" />,
      liveLink: "https://createkanbanapp.netlify.app/"
    }
  ];

  // Use dynamic data if available, otherwise use fallback
  const displayProjects = Array.isArray(dynamicProjects) && dynamicProjects.length > 0 ? dynamicProjects : fallbackProjects;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    const mouse = { x: null, y: null, isOver: false };
    let lastMouseMove = 0;

    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * (window.innerWidth),
      y: Math.random() * (window.innerHeight),
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.4 - 0.2,
      speedY: Math.random() * 0.4 - 0.2,
      initialAlpha: Math.random() * 0.2 + 0.05,
      color: `59, 130, 246`
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      drawStaticParticles();
    };

    const handleMouseMove = (e) => {
      if (Date.now() - lastMouseMove > 16) { // Throttle to ~60fps
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.isOver = true;
        lastMouseMove = Date.now();
      }
    };

    const handleMouseLeave = () => {
      mouse.isOver = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    resize();

    function drawStaticParticles() {
      if (!offscreenCtx) return;
      offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            offscreenCtx.beginPath();
            offscreenCtx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 120)})`;
            offscreenCtx.lineWidth = 0.3;
            offscreenCtx.moveTo(particles[i].x, particles[i].y);
            offscreenCtx.lineTo(particles[j].x, particles[j].y);
            offscreenCtx.stroke();
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreenCanvas, 0, 0);

      particles.forEach(p => {
        let currentAlpha = p.initialAlpha;

        if (mouse.isOver && mouse.x !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const attractionRadius = 250;
          const highlightRadius = 150;

          if (distance < attractionRadius) {
            p.x += dx * 0.02;
            p.y += dy * 0.02;

            if (distance < highlightRadius) {
              const proximity = 1 - (distance / highlightRadius);
              currentAlpha = p.initialAlpha + (0.7 - p.initialAlpha) * proximity;
            }
          }
        }

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    drawStaticParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
      const sections = ['home', 'experience', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 400;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Typing Animation State
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % TITLES.length;
      const fullText = TITLES[i];

      setDisplayText(isDeleting
        ? fullText.substring(0, displayText.length - 1)
        : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  const experiences = [
    {
      role: "Admin Assistant",
      company: "Winterfeel Hotel And Resort Pvt. Ltd.",
      period: "February 4, 2026 – Present",
      logo: "https://graph.facebook.com/winterfeelhotelsandresorts/picture?type=large",
      description: "Directing front-desk operations, guest relations, and resort administration. Managing financial reporting, payroll, and staff onboarding while optimizing room pricing strategies."
    },

{
      role: "IT Engineer",
      company: "Care Infotech Pvt. Ltd.",
      logo: "https://media.licdn.com/dms/image/v2/C4E0BAQFC07r755Ia7w/company-logo_200_200/company-logo_200_200/0/1644488611278?e=2147483647&v=beta&t=EBEUDI7AjnAvA600qdaUv-l4-BCHZGUAMqJ5AxkPdtY",
      period: "April 2025 - August 2025",
      description: "Orchestrated enterprise IT infrastructure and SD-WAN configurations. Spearheaded network security protocols and resolved complex system bottlenecks for global-scale operations."
    },
    {
      role: "Desktop Support Engineer",
      company: "IT Techies Services Pvt. Ltd.",
      logo: "https://media.licdn.com/dms/image/v2/D560BAQH-UN7ngi-q3w/company-logo_200_200/company-logo_200_200/0/1684309453088/ittechies_logo?e=2147483647&v=beta&t=CaSHyDR8VmXMXPA3B1YexyJCTY447eOZOkmbvi8nRhU",
      period: "2023 - 2024",
      description: "Delivered high-level technical support and hardware lifecycle management. Optimized network performance and enforced rigorous system security and user access controls."
    },
    {
      role: "Service Engineer",
      company: "Craze Computers",
      logo: "/craze computer logo.png",
      period: "2014 - 2020",
      description: "NOC operations, L1 support, and peak hour traffic monitoring. Specialized in troubleshooting call failures and ticketing system management."
    }
  ];

  return (
    <>
      <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden font-sans">

        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-colors border border-blue-400/20"
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl z-10"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white z-20 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-full bg-slate-800 overflow-hidden">
                    <img src={selectedProject.image || selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh]">
                    <h3 className="text-3xl font-black mb-4 text-white uppercase">{selectedProject.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.tech?.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-500 uppercase tracking-widest">{t}</span>
                      ))}
                    </div>
                    <p className="text-slate-400 leading-relaxed mb-8">{selectedProject.description}</p>
                    <div className="flex gap-4">
                      <a href={selectedProject.liveLink || selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all">Live Demo <ExternalLink className="w-5 h-5" /></a>
                      {selectedProject.githubUrl && (
                        <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-slate-700 text-white py-4 rounded-2xl font-bold hover:bg-slate-600 transition-all">Frontend <Globe className="w-5 h-5" /></a>
                      )}
                      {selectedProject.backendGithubUrl && (
                        <a href={selectedProject.backendGithubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-slate-700 text-white py-4 rounded-2xl font-bold hover:bg-slate-600 transition-all">Backend <Globe className="w-5 h-5" /></a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40" />

        {/* Navigation */}
        <Navbar
          activeSection={activeSection}
          isScrolled={isScrolled}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          githubUrl={githubUrl}
          linkedinUrl={linkedinUrl}
        />

        {/* Hero Section */}
        <Hero
          displayText={displayText}
          resumeUrl={resumeUrl}
          linkedinUrl={linkedinUrl}
          githubUrl={githubUrl}
          profilePhotoUrl={profilePhotoUrl}
        />

        {/* Experience Section */}
        <Experience experiences={experiences} />

        {/* Certification Section */}
        <section className="py-24 px-6 z-10 relative bg-slate-950 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative flex flex-col md:flex-row items-center gap-12">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
              <div className="flex-1 z-10">
                <div className="inline-block px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-blue-500/20">Credential</div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">MERN Stack Certified</h2>
                <p className="text-slate-400 text-lg mb-8 max-w-xl">
                  Successfully completed the <strong>Master of Full Stack Development</strong> program at <strong>GUVI Geek Networks</strong>, an IIT-M & IIM-A incubated company. Specialized in high-performance web applications and backend architecture.
                </p>
                <div className="flex flex-wrap gap-4">
                <a
                  href="https://drive.google.com/file/d/1SC6Qx0CM__ctupSJRTndkbUAd1ODScNw/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors"
                >
                    <img src="https://cdn.brandfetch.io/guvi.io/logo" alt="GUVI Logo" className="w-5 h-5 bg-white rounded p-0.5 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                    <span className="text-sm font-bold">GUVI Certified</span>

                    {/* Certificate Preview Hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 transform scale-95 group-hover:scale-100">
                      <img src="https://drive.google.com/uc?export=view&id=1SC6Qx0CM__ctupSJRTndkbUAd1ODScNw" alt="GUVI Certificate Preview" className="rounded-lg shadow-2xl border-4 border-blue-600 bg-white min-h-25" />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rotate-45"></div>
                    </div>
                </a>
                <a
                  href="https://drive.google.com/uc?export=download&id=14NdEuZQP1SULtDxUtrl0eCaPEFGMFnvw" // NSDC சான்றிதழுக்கான நேரடி பார்வை/பதிவிறக்க இணைப்பு
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors"
                >
                  <img src={nsdcCertificateImageUrl} alt="NSDC Logo" className="w-5 h-5 transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" /> {/* NSDC படத்தைச் சேர்க்கிறோம் */}
                  <span className="text-sm font-bold">NSDC Certified</span>

                  {/* Certificate Preview Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 transform scale-95 group-hover:scale-100">
                    <img src="https://drive.google.com/uc?export=view&id=14NdEuZQP1SULtDxUtrl0eCaPEFGMFnvw" alt="NSDC Certificate Preview" className="rounded-lg shadow-2xl border-4 border-blue-600 bg-white min-h-25" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rotate-45"></div>
                  </div>
                </a>
                  <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-bold">IIT-M Incubated</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-80 h-auto aspect-square bg-slate-800 rounded-3xl border border-slate-700 flex flex-col items-center justify-center p-8 text-center group transition-transform hover:scale-105">
                 <Globe className="w-20 h-20 text-blue-500 mb-4 animate-pulse" />
                 <p className="text-xl font-black mb-2">Full Stack Developer</p>
                 <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">GUVI Certified</p>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <Education />

        {/* Projects Showcase */}
        <Projects
          displayProjects={displayProjects}
          isProjectsLoading={isProjectsLoading}
          setSelectedProject={setSelectedProject}
        />

        {/* Skills */}
        <Skills />

        {/* Footer / Contact */}
        <Footer
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
          linkedinUrl={linkedinUrl}
          githubUrl={githubUrl}
        />
      </div>
    </>
  )
}

/* --- Admin Components --- */

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [dynamicProjects, setDynamicProjects] = useState([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const canvasRef = useRef(null);

  // Define missing URLs/constants
  const githubUrl = "https://github.com/yogeshwaranjs131-ui"; // 
  const linkedinUrl = "https://www.linkedin.com/in/yogeshwaran-udayakumar-25b94b170"; // 
  const profilePhotoUrl = "/myphoto.png.jpeg"; // 
  const resumeUrl = "https://drive.google.com/file/d/1oDQnHcwCz8TJ5B-0ZuFFCB4JDlMdgKRM/view?usp=sharing"; 
  const nsdcCertificateImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/NSDC_Logo.png/640px-NSDC_Logo.png";

  //
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend-name.onrender.com';

  const fetchProjects = useCallback(() => {
    setIsProjectsLoading(true);
    fetch(`${API_BASE_URL}/api/projects`, { signal: AbortSignal.timeout(5000) })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setDynamicProjects(Array.isArray(data) ? data : []);
        setIsProjectsLoading(false);
      })
      .catch(() => {
        // Using console.warn instead of error for connection issues
        console.warn('API connection failed, using fallback projects.');
        setIsProjectsLoading(false);
      });
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // 
  const basename = window.location.pathname.includes('/my-portfolio') ? '/my-portfolio' : '';

  return (
    <Router basename={basename || undefined}>
      <Routes>
        <Route path="/" element={
          <Portfolio 
            dynamicProjects={dynamicProjects}
            isProjectsLoading={isProjectsLoading}
            API_BASE_URL={API_BASE_URL}
            githubUrl={githubUrl}
            linkedinUrl={linkedinUrl}
            profilePhotoUrl={"/Profile.png"}
            resumeUrl={"https://drive.google.com/uc?export=download&id=1CRoXhH5q1sKj1FLCp1T5vKvmR_FW31Nh"}
            nsdcCertificateImageUrl={nsdcCertificateImageUrl}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            canvasRef={canvasRef}
          />
        } />
        <Route path="/login" element={<LoginPage API_BASE_URL={API_BASE_URL} />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard
              API_BASE_URL={API_BASE_URL}
              projects={dynamicProjects}
              fetchProjects={fetchProjects}
            />
          </ProtectedRoute>
        } />
        {/* */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;