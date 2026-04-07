import React, { useState } from 'react';
import { Plus, Edit, Trash2, LogOut, Save, X } from 'lucide-react';

const AdminDashboard = ({ API_BASE_URL, projects, fetchProjects }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: ''
  });

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
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || ''
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    const method = editingProject.id ? 'PUT' : 'POST';
    const url = editingProject.id
      ? `${API_BASE_URL}/api/admin/projects/${editingProject.id}`
      : `${API_BASE_URL}/api/admin/projects`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          ...editingProject,
          title: formData.title,
          description: formData.description,
          technologies: (formData.technologies || '').split(',').map(tech => tech.trim()).filter(t => t !== ''),
          githubUrl: formData.githubUrl,
          liveUrl: formData.liveUrl,
          imageUrl: formData.imageUrl
        })
      });

      if (response.ok) {
        setIsEditing(false);
        setEditingProject(null);
        fetchProjects();
      } else {
        alert('Failed to save project');
      }
    } catch {
      alert('Error saving project');
    }
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
      liveUrl: '',
      imageUrl: ''
    };
    setEditingProject(newProject);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      imageUrl: ''
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
      liveUrl: '',
      imageUrl: ''
    });
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
              <h3 className="text-xl font-bold mb-4">
                {editingProject.id ? 'Edit Project' : 'Add New Project'}
              </h3>
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
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="bg-slate-600 border border-slate-500 rounded-xl p-4 text-white focus:outline-none focus:border-blue-600"
                />
                <input
                  type="url"
                  placeholder="Live URL"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
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
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save
                </button>
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

          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-slate-700 rounded-xl p-6">
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
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 transition-all"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;