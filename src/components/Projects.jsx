import React from 'react';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Music Streaming Platform",
      description: "Architected a MERN-stack audio platform with JWT authentication, RESTful APIs, and optimized MongoDB queries for seamless streaming.",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=800",
      link: "https://musicappstream.netlify.app"
    },
    {
      title: "FlavorFinder Recipe App",
      description: "Developed a responsive frontend integrating complex third-party APIs for real-time nutritional analysis and recipe filtering.",
      tech: ["React", "Tailwind", "REST API"],
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
      link: "https://create-recipeapp.netlify.app/"
    },
    {
      title: "Kanban Task Manager",
      description: "A collaborative project management tool with drag-and-drop functionality for organizing tasks across different stages.",
      tech: ["React", "JavaScript", "CSS"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
      link: "https://createkanbanapp.netlify.app/"
    }
  ];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">Selected Projects</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div key={index} className="group bg-[#161e33] rounded-3xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col">
              <div className="h-64 overflow-hidden relative shrink-0">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0b1121] to-transparent opacity-60"></div>
              </div>
              <div className="p-8 flex flex-col grow">
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                <div className="flex gap-3 mb-8">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-slate-800 rounded-full text-[10px] font-bold text-cyan-400 border border-slate-700">{t}</span>
                  ))}
                </div>
                <a href={project.link} className="flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-white transition-colors mt-auto">
                  View Project <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;