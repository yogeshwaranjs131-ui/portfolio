import React from 'react';
import { Code2, Server, Database, Layout } from 'lucide-react';

const Skills = () => {
  const skills = [
    { category: "Frontend", icon: <Layout />, items: ["React", "TypeScript", "Tailwind CSS", "Next.js"] },
    { category: "Backend", icon: <Server />, items: ["Node.js", "Express", "Python", "Socket.io"] },
    { category: "Database", icon: <Database />, items: ["MongoDB", "PostgreSQL", "Redis", "Firebase"] },
    { category: "DevOps/Tools", icon: <Code2 />, items: ["Git", "Docker", "AWS", "Vercel/Netlify"] }
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-6xl mx-auto text-white">
        <h2 className="text-4xl font-bold mb-16 text-center">Technical Arsenal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, i) => (
            <div key={i} className="p-8 rounded-2xl bg-[#161e33] border border-slate-800 hover:border-blue-500/50 transition-all">
              <div className="text-blue-400 mb-4">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
              <ul className="space-y-2">
                {skill.items.map(item => (
                  <li key={item} className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;