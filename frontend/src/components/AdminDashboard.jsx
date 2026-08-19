import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, LogOut, Save, X, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const AdminDashboard = ({ API_BASE_URL, projects, fetchProjects }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [localProjects, setLocalProjects] = useState(projects);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    backendGithubUrl: '', // Renamed from liveUrl
    liveLink: '',
    imageUrl: '',
    featured: false
  });
  const [autoSaveStatus, setAutoSaveStatus] = useState('idle'); // idle, saving, saved, error

  useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);

  const handleSave = useCallback(async () => {
    if (!editingProject) return;

    setAutoSaveStatus('saving');
    const projectId = editingProject._id || editingProject.id;
    const method = projectId && typeof projectId === 'string' ? 'PUT' : 'POST';
    const url = method === 'PUT'
      ? `${API_BASE_URL}/api/admin/projects/${projectId}`
      : `${API_BASE_URL}/api/admin/projects`;

    const payload = {
      ...editingProject,
      ...formData,
      technologies: (formData.technologies || '').split(',').map(tech => tech.trim()).filter(t => t !== ''),
      featured: formData.featured,
      // Remove icon from payload as it's a non-serializable React component
      icon: undefined
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setAutoSaveStatus('saved');
        fetchProjects();
      } else {
        setAutoSaveStatus('error');
        console.error('Failed to save project:', await response.text());
      }
    } catch (error) {
      setAutoSaveStatus('error');
      console.error('Error saving project:', error);
    }
  }, [editingProject, formData, API_BASE_URL, fetchProjects]);

  useEffect(() => {
    if (!isEditing) {
      setAutoSaveStatus('idle');
      return;
    }

    setAutoSaveStatus('typing');
    const handler = setTimeout(() => {
      handleSave();
    }, 2000); // 2 seconds debounce

    return () => {
      clearTimeout(handler);
    };
  }, [formData, isEditing, handleSave]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies?.join(', ') || '',
      githubUrl: project.githubUrl || '',
      backendGithubUrl: project.backendGithubUrl || '',
      liveLink: project.liveLink || '',
      imageUrl: project.imageUrl || '',
      featured: project.featured || false,
      icon: project.icon || null
    });
    setIsEditing(true);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/projects/${projectId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });

        if (response.ok) {
          fetchProjects();
        } else {
          alert('Failed to delete project');
        }
      } catch {
        alert('Error deleting project');
      }
    }
  };

  const handleAdd = () => {
    const newProject = {
      id: Date.now(),
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      backendGithubUrl: '',
      liveLink: '',
      imageUrl: '',
      featured: false,
      icon: null
    };
    setEditingProject(newProject);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      githubUrl: '',
      backendGithubUrl: '',
      liveLink: '',
      imageUrl: '',
      featured: false,
      icon: null
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      githubUrl: '',
    backendGithubUrl: '', // Renamed from liveUrl
    liveLink: '',
      imageUrl: '',
      featured: false,
      icon: null
    });
  };

  const onDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const reorderedProjects = Array.from(localProjects);
    const [removed] = reorderedProjects.splice(source.index, 1);
    reorderedProjects.splice(destination.index, 0, removed);

    setLocalProjects(reorderedProjects);

    const projectIds = reorderedProjects.map(p => p._id || p.id);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/projects/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ projectIds })
      });

      if (!response.ok) {
        setLocalProjects(projects); // Revert on failure
        alert('Failed to reorder projects.');
      }
    } catch (error) {
      setLocalProjects(projects); // Revert on error
      alert('Error reordering projects.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="bg-slate-800 rounded-4xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Projects Management</h2>
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Project
            </button>
          </div>

          {isEditing && (
            <div className="bg-slate-700 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  {editingProject._id ? 'Edit Project' : 'Add New Project'}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  {autoSaveStatus === 'saving' && <> <Loader className="w-4 h-4 animate-spin" /> Saving... </>}
                  {autoSaveStatus === 'saved' && <> <CheckCircle className="w-4 h-4 text-green-500" /> Saved </>}
                  {autoSaveStatus === 'error' && <> <AlertCircle className="w-4 h-4 text-red-500" /> Error </>}
                  {autoSaveStatus === 'typing' && <span className="italic">Typing...</span>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-600 border border-slate-500 rounded-xl p-4 text-white focus:outline-none focus:border-blue-600"
                />
                <input
                  type="text"
                  placeholder="Technologies (comma separated)"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="bg-slate-600 border border-slate-500 rounded-xl p-4 text-white focus:outline-none focus:border-blue-600"
                />
              </div>
              <textarea
                placeholder="Project Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="w-full bg-slate-600 border border-slate-500 rounded-xl p-4 text-white focus:outline-none focus:border-blue-600 mb-4"
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <input
                  type="url"
                  placeholder="Frontend GitHub URL"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="bg-slate-600 border border-slate-500 rounded-xl p-4 text-white focus:outline-none focus:border-blue-600"
                />
                <input
                  type="url"
                  placeholder="Backend GitHub URL"
                  value={formData.backendGithubUrl}
                  onChange={(e) => setFormData({ ...formData, backendGithubUrl: e.target.value })}
                  className="bg-slate-600 border border-slate-500 rounded-xl p-4 text-white focus:outline-none focus:border-blue-600"
                />
                <input
                  type="url"
                  placeholder="Live URL"
                  value={formData.liveLink}
                  onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                  className="bg-slate-600 border border-slate-500 rounded-xl p-4 text-white focus:outline-none focus:border-blue-600"
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="bg-slate-600 border border-slate-500 rounded-xl p-4 text-white focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="flex items-center gap-2 mb-6">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-5 w-5 rounded bg-slate-600 border-slate-500 text-blue-500 focus:ring-blue-600"
                />
                <label htmlFor="featured-checkbox" className="font-bold text-slate-300">
                  Featured Project
                </label>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-all flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </div>
          )}

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="projects">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {localProjects.map((project, index) => (
                    <Draggable key={project._id || project.id} draggableId={String(project._id || project.id)} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-slate-700 rounded-xl p-6 transition-shadow ${snapshot.isDragging ? 'shadow-2xl shadow-blue-500/30' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                              <p className="text-slate-300 mb-2">{project.description}</p>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {project.technologies?.map((tech, index) => (
                                  <span key={index} className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              <div className="flex gap-4 text-sm text-slate-400">
                                {project.githubUrl && (
                                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                                    GitHub
                                  </a>
                                )}
                                {project.backendGithubUrl && (
                                  <a href={project.backendGithubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                                    Backend GitHub
                                  </a>
                                )}
                                {project.liveLink && (
                                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                                    Live Demo
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(project)} className="bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 transition-all">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button onClick={() => handleDelete(project._id || project.id)} className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;