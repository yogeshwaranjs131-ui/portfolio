const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Projects Data
const projects = [
  {
    _id: 'proj2',
    title: "Flight Ticket Booking",
    description: "A flight booking platform offering real-time flight search, price comparison, secure seat selection, PNR status check, PDF ticket download, and booking history tracking.",
    tech: ["React", "Amadeus API", "Context API", "Tailwind CSS"],
    image: "https://png.pngtree.com/thumb_back/fh260/background/20230704/pngtree-d-render-and-illustration-of-an-airplane-departing-from-the-runway-image_3740857.jpg",
    liveLink: "https://flightappc.netlify.app/",
    liveLabel: "my-flight",
    githubUrl: "https://github.com/yogeshwaranjs131-ui/flight-booking-app.git",
    backendLink: "https://flight-booking-app-6z55.onrender.com/",
    featured: true
  },
  {
    _id: 'proj3',
    title: "Car Rental Software",
    description: "A complete car rental solution featuring real-time vehicle availability tracking, online booking, 18% GST calculation, secure Razorpay payment gateway, instant PDF invoice download, and automated email notifications.",
    tech: ["React", "Redux", "Node.js", "Razorpay", "PDFKit"],
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    liveLink: "https://car-rental-software.vercel.app/",
    githubUrl: "https://github.com/yogeshwaranjs131-ui/Car-Rental-Software.git",
    featured: true,
    backendLink: "https://car-rental-software.onrender.com/"
  },
  {
    _id: 'proj4',
    title: "Music Streaming App",
    description: "A full-stack MERN music streaming platform featuring a MongoDB database, RESTful APIs, secure user authentication, playlist curation, comment system, and an admin panel with Multer-powered audio/image uploads, styled with a modern 'Glassmorphic' UI.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind", "Web Audio API"],
    githubUrl: "https://github.com/yogeshwaranjs131-ui/music-app.git",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    liveLink: "https://musicappstream.netlify.app/",
    liveLabel: "Music Streaming App",
    backendLink: "https://music-app-2wy9.onrender.com/",
    featured: true
  }
];

// Skills Data
const skills = [
  { name: "HTML", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "JavaScript", category: "Languages" },
  { name: "React.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "Postman", category: "Tools" },
  { name: "GitHub", category: "Tools" }
];

// Experience Data with Direct Logo URL
const experiences = [
  {
    role: "Service Engineer",
    company: "Craze Computers",
    period: "2014 - 2020",
    description: "NOC operations, L1 support, and peak hour traffic monitoring. Specialized in troubleshooting call failures and ticketing system management.",
    logo: "/craze-computers.png"
  }
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/skills', (req, res) => {
  res.json(skills);
});

app.get('/api/experiences', (req, res) => {
  res.json(experiences);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`New Message from ${name}: ${message}`);
  res.status(200).json({ success: true, message: "Message received!" });
});

// Simple Auth Route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    const token = 'mock-jwt-token-' + Date.now();
    res.json({ success: true, token, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Admin Projects CRUD Routes
app.get('/api/admin/projects', (req, res) => {
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

app.put('/api/admin/projects/reorder', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !token.startsWith('mock-jwt-token')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { projectIds } = req.body;
  if (!Array.isArray(projectIds)) {
    return res.status(400).json({ message: 'projectIds must be an array' });
  }

  const reorderedProjects = projectIds.map(id => projects.find(p => (p._id || p.id) == id)).filter(Boolean);
  
  projects.length = 0;
  projects.push(...reorderedProjects);
  res.json({ message: 'Projects reordered successfully' });
});

app.put('/api/admin/projects/:id', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !token.startsWith('mock-jwt-token')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const id = req.params.id;
  const updatedProject = req.body;
  const index = projects.findIndex(p => p._id == id || p.id == id);

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
  const index = projects.findIndex(p => p._id == id || p.id == id);

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