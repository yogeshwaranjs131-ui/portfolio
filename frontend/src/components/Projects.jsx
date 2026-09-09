import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, ExternalLink, Github, Server } from 'lucide-react';

const Projects = ({ displayProjects, isProjectsLoading, setSelectedProject }) => {
  // Separate MERN / Full Stack projects (filtering by backendLink presence)
  const fullStackProjects = displayProjects.filter(p => p.backendLink);

  // Other projects go to Frontend section
  const frontendProjects = displayProjects.filter(p => !p.backendLink);

  return (
    <section id="projects" className="py-24 px-6 z-10 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-2">Development Portfolio</p>
            <h2 className="text-4xl font-black uppercase tracking-tight text-amber-400">Projects Showcase</h2>
          </div>
        </div>

        {isProjectsLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* 1. FULL STACK PROJECTS SECTION */}
            <div>
              <h3 className="text-2xl font-black text-blue-400 mb-8 border-b border-slate-800 pb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span>
                Full Stack Projects (MERN)
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {fullStackProjects.map((project, idx) => (
                  <ProjectCard key={idx} project={project} idx={idx} setSelectedProject={setSelectedProject} />
                ))}
              </div>
            </div>

            {/* 2. FRONTEND PROJECTS SECTION */}
            {frontendProjects.length > 0 && (
              <div>
                <h3 className="text-2xl font-black text-emerald-400 mb-8 border-b border-slate-800 pb-3 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span>
                  Frontend Projects
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {frontendProjects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} idx={idx} setSelectedProject={setSelectedProject} />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  );
};

// Individual Project Card Component with External Visibility Buttons
const ProjectCard = ({ project, idx, setSelectedProject }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.1 }}
    whileHover={{ y: -10 }}
    className="group bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-xl hover:shadow-2xl transition-all relative flex flex-col justify-between"
  >
    {project.featured && (
      <motion.div
        className="absolute top-0 right-0 z-10 bg-yellow-500 text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-bl-2xl rounded-tr-[2.25rem] shadow-lg flex items-center gap-1"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
      >
        <Star className="w-3 h-3" /> Featured
      </motion.div>
    )}
    
    <div>
      <div className="relative h-60 overflow-hidden bg-slate-800">
        <img src={project.image || project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => setSelectedProject(project)}
            className="flex items-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all hover:bg-blue-500 hover:text-white"
          >
            View Details <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="p-8 pb-4">
        <div className="flex items-center gap-2 mb-4">
          {project.icon && (
            <div className="p-2 bg-slate-800 rounded-lg">{project.icon}</div>
          )}
          <div className="flex flex-wrap gap-2">
            {project.tech?.map((t, i) => (
              <span key={i} className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">/ {t}</span>
            ))}
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3 text-amber-400">{project.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>
      </div>
    </div>

    {/* Direct Visibility Buttons requested by mentor */}
    <div className="px-8 pb-8 pt-2 flex flex-wrap gap-2 border-t border-slate-800/80 mt-auto">
      {project.liveLink && (
        <a 
          href={project.liveLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-400 bg-blue-950/60 hover:bg-blue-900 rounded-md transition-colors border border-blue-800/50"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Live Demo
        </a>
      )}
      
      {project.githubUrl && (
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors border border-slate-700"
        >
          <Github className="w-3.5 h-3.5" />
          Frontend Code
        </a>
      )}

      {project.backendLink && (
        <a 
          href={project.backendLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900 rounded-md transition-colors border border-emerald-800/50"
        >
          <Server className="w-3.5 h-3.5" />
          Backend Code
        </a>
      )}
    </div>
  </motion.div>
);

export default Projects;