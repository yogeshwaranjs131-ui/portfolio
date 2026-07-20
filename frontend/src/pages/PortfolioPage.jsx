import React, { useState, useEffect } from 'react';
import { Briefcase, Plane, Car, Music, Utensils, Columns } from 'lucide-react';

import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Experience from '../components/Experience.jsx';
import Projects from '../components/Projects.jsx';
import Skills from '../components/Skills.jsx';
import Education from '../components/Education.jsx';
import Footer from '../components/Footer.jsx';
import CertificationSection from '../components/CertificationSection.jsx';
import ScrollToTopButton from '../components/ScrollToTopButton.jsx';
import ProjectDetailsModal from '../components/ProjectDetailsModal.jsx';

const TITLES = ['Admin Assistant', 'Full Stack Developer', 'IT Infrastructure Engineer'];

const PortfolioPage = ({
  dynamicProjects,
  isProjectsLoading,
  API_BASE_URL,
  githubUrl,
  linkedinUrl,
  profilePhotoUrl,
  resumeUrl,
  nsdcCertificateImageUrl,
  selectedProject,
  setSelectedProject,
  canvasRef,
}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

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
      title: 'Hotel Management Software',
      description: 'A comprehensive hotel management system for room booking, guest management, and billing. Features an intuitive dashboard for staff.',
      tech: ['React', 'Node.js', 'MongoDB', 'JWT'],
      image: 'https://images.unsplash.com/photo-1563911302283-d256c5824135?w=800&q=80',
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
      liveLink: '#',
      featured: true,
    },
    {
      title: 'Flight Ticket Booking',
      description: 'A flight booking platform offering real-time flight search, price comparison, and secure seat reservation.',
      tech: ['React', 'Amadeus API', 'Context API', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1609951659574-103b73554b01?w=800&q=80',
      icon: <Plane className="w-5 h-5 text-blue-600" />,
      liveLink: '#',
      featured: true,
    },
    {
      title: 'Car Rental Software',
      description: 'A complete car rental solution with vehicle availability tracking, online booking, and payment processing.',
      tech: ['React', 'Redux', 'Node.js', 'Stripe API'],
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      icon: <Car className="w-5 h-5 text-blue-600" />,
      liveLink: '#',
      featured: true,
    },
    {
      title: 'Music Streaming App',
      description: "A premium audio platform with high-fidelity streaming, playlist curation, and a modern 'Glassmorphic' UI design using React.",
      tech: ['React', 'Web Audio API', 'Context API', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
      icon: <Music className="w-5 h-5 text-blue-600" />,
      liveLink: 'https://musicappstream.netlify.app/',
    },
    {
      title: 'Recipe App (React P2)',
      description: 'A sophisticated food discovery application featuring API integration, advanced search filters, and recipe bookmarking functionality.',
      tech: ['React', 'REST API', 'Redux', 'Axios'],
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
      icon: <Utensils className="w-5 h-5 text-blue-600" />,
      liveLink: 'https://create-recipeapp.netlify.app/',
    },
    {
      title: 'Kanban Board (React P1)',
      description: 'A robust task management application with drag-and-drop capabilities, persistent state, and multi-column organization for agile teams.',
      tech: ['React', 'DnD Library', 'Local Storage', 'SCSS'],
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
      icon: <Columns className="w-5 h-5 text-blue-600" />,
      liveLink: 'https://createkanbanapp.netlify.app/',
    },
  ];

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
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.4 - 0.2,
      speedY: Math.random() * 0.4 - 0.2,
      initialAlpha: Math.random() * 0.2 + 0.05,
      color: '59, 130, 246',
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      drawStaticParticles();
    };

    const handleMouseMove = (e) => {
      if (Date.now() - lastMouseMove > 16) {
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

      particles.forEach((p) => {
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
      const current = sections.find((section) => {
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

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % TITLES.length;
      const fullText = TITLES[i];

      setDisplayText(isDeleting ? fullText.substring(0, displayText.length - 1) : fullText.substring(0, displayText.length + 1));
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
      role: 'Admin Assistant',
      company: 'Winterfeel Hotel And Resort Pvt. Ltd.',
      period: 'February 4, 2026 – Present',
      logo: 'https://graph.facebook.com/winterfeelhotelsandresorts/picture?type=large',
      description: 'Directing front-desk operations, guest relations, and resort administration. Managing financial reporting, payroll, and staff onboarding while optimizing room pricing strategies.',
    },
    {
      role: 'IT Engineer',
      company: 'Care Infotech Pvt. Ltd.',
      logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQFC07r755Ia7w/company-logo_200_200/company-logo_200_200/0/1644488611278?e=2147483647&v=beta&t=EBEUDI7AjnAvA600qdaUv-l4-BCHZGUAMqJ5AxkPdtY',
      period: 'April 2025 - August 2025',
      description: 'Orchestrated enterprise IT infrastructure and SD-WAN configurations. Spearheaded network security protocols and resolved complex system bottlenecks for global-scale operations.',
    },
    {
      role: 'Desktop Support Engineer',
      company: 'IT Techies Services Pvt. Ltd.',
      logo: 'https://media.licdn.com/dms/image/v2/D560BAQH-UN7ngi-q3w/company-logo_200_200/company-logo_200_200/0/1684309453088/ittechies_logo?e=2147483647&v=beta&t=CaSHyDR8VmXMXPA3B1YexyJCTY447eOZOkmbvi8nRhU',
      period: '2023 - 2024',
      description: 'Delivered high-level technical support and hardware lifecycle management. Optimized network performance and enforced rigorous system security and user access controls.',
    },
    {
      role: 'Service Engineer',
      company: 'Craze Computers',
      logo: '/craze-computer-logo.png', // Ensure this file exists in the public folder
      period: '2014 - 2020',
      description: 'NOC operations, L1 support, and peak hour traffic monitoring. Specialized in troubleshooting call failures and ticketing system management.',
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden font-sans">
      <ScrollToTopButton showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
      <ProjectDetailsModal selectedProject={selectedProject} setSelectedProject={setSelectedProject} />

      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40" />

      <Navbar
        activeSection={activeSection}
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        githubUrl={githubUrl}
        linkedinUrl={linkedinUrl}
      />

      <Hero
        displayText={displayText}
        resumeUrl={resumeUrl}
        linkedinUrl={linkedinUrl}
        githubUrl={githubUrl}
        profilePhotoUrl={profilePhotoUrl}
      />

      <Experience experiences={experiences} />

      <CertificationSection nsdcCertificateImageUrl={nsdcCertificateImageUrl} />

      <Education />

      <Projects
        displayProjects={displayProjects}
        isProjectsLoading={isProjectsLoading}
        setSelectedProject={setSelectedProject}
      />

      <Skills />

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
  );
};

export default PortfolioPage;
