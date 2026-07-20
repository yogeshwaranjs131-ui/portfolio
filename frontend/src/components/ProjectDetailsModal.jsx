import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, Globe } from 'lucide-react';

const ProjectDetailsModal = ({ selectedProject, setSelectedProject }) => {
  return (
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
  );
};

export default ProjectDetailsModal;
