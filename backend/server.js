const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Projects Data (Neengal database illai endral ithai payanpaduthalam)
const projects = [
  {
    title: "Music Streaming App",
    description: "A premium audio platform with high-fidelity streaming, playlist curation, and a modern 'Glassmorphic' UI design using React.",
    tech: ["React", "Web Audio API", "Context API", "Tailwind"],
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    liveLink: "https://musicappstream.netlify.app/"
  },
  {
    title: "Recipe App (React P2)",
    description: "A sophisticated food discovery application featuring API integration, advanced search filters, and recipe bookmarking functionality.",
    tech: ["React", "REST API", "Redux", "Axios"],
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80",
    liveLink: "https://create-recipeapp.netlify.app/"
  },
  {
    title: "Kanban Board (React P1)",
    description: "A robust task management application with drag-and-drop capabilities, persistent state, and multi-column organization for agile teams.",
    tech: ["React", "DnD Library", "Local Storage", "SCSS"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
    liveLink: "https://createkanbanapp.netlify.app/"
  }
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`New Message from ${name}: ${message}`);
  // Ingu neengal email anuppum logic-ai serkkalam
  res.status(200).json({ success: true, message: "Message received!" });
});

// Simple Auth Route (Production-la proper authentication use pannunga)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Simple check (neengal database-la store pannunga)
  if (username === 'admin' && password === 'admin123') {
    const token = 'mock-jwt-token-' + Date.now(); // Real JWT token generate pannunga
    res.json({ success: true, token, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Admin Projects CRUD Routes
app.get('/api/admin/projects', (req, res) => {
  // Check auth token (simple check)
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !token.startsWith('mock-jwt-token')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json(projects);
});

app.post('/api/admin/projects', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !token.startsWith('mock-jwt-token')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const newProject = req.body;
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.put('/api/admin/projects/:id', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !token.startsWith('mock-jwt-token')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const id = req.params.id;
  const updatedProject = req.body;
  const index = projects.findIndex(p => p.id == id);

  if (index !== -1) {
    projects[index] = { ...projects[index], ...updatedProject };
    res.json(projects[index]);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

app.delete('/api/admin/projects/:id', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !token.startsWith('mock-jwt-token')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const id = req.params.id;
  const index = projects.findIndex(p => p.id == id);

  if (index !== -1) {
    projects.splice(index, 1);
    res.json({ message: 'Project deleted' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

app.get('/', (req, res) => {
  res.send('Portfolio Backend is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});