import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Projects = ({ displayProjects, isProjectsLoading, setSelectedProject }) => {
  return (
    <section id="projects" className="py-24 px-6 z-10 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-2">Development Portfolio</p>
            <h2 className="text-4xl font-black uppercase tracking-tight">MERN & React Projects</h2>
          </div>
        </div>

        {isProjectsLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-xl hover:shadow-2xl transition-all"
              >
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
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-slate-800 rounded-lg">{project.icon}</div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech?.map((t, i) => (
                        <span key={i} className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">/ {t}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;