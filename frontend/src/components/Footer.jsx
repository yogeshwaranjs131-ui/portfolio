import React from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

const Footer = ({ formData, setFormData, handleSubmit, isSubmitting, submitStatus, linkedinUrl, githubUrl }) => {
  return (
    <footer id="contact" className="py-32 bg-slate-900 text-white rounded-t-[4rem] px-6 z-10 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-6">Let's Connect</p>
            <h2 className="text-5xl font-black mb-10 leading-tight">Crafting Digital <br />Excellence.</h2>
            <div className="space-y-6">
              <a href="mailto:yogeshwaranjs131@gmail.com" className="flex items-center gap-6 group">
                <div className="bg-slate-800 p-5 rounded-2xl group-hover:bg-blue-600 transition-all"><Mail className="w-8 h-8" /></div>
                <div><p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Email Address</p><p className="text-2xl font-bold">yogeshwaranjs131@gmail.com</p></div>
              </a>
              <a href={linkedinUrl} target="_blank" className="flex items-center gap-6 group">
                <div className="bg-slate-800 p-5 rounded-2xl group-hover:bg-blue-600 transition-all"><Linkedin className="w-8 h-8" /></div>
                <div><p className="text-slate-400 text-xs font-bold uppercase tracking-widest">LinkedIn Profile</p><p className="text-2xl font-bold italic underline decoration-blue-600">Connect</p></div>
              </a>
              <a href={githubUrl} target="_blank" className="flex items-center gap-6 group">
                <div className="bg-slate-800 p-5 rounded-2xl group-hover:bg-slate-600 transition-all"><Github className="w-8 h-8" /></div>
                <div><p className="text-slate-400 text-xs font-bold uppercase tracking-widest">GitHub</p><p className="text-2xl font-bold italic underline decoration-slate-600">View Repos</p></div>
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="p-8 rounded-[2.5rem] border border-slate-800 bg-slate-800/30">
              <h4 className="text-xl font-bold mb-6 italic text-blue-400">Send a Message</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-600 transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-600 transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Subject"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-600 transition-colors"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
                <textarea
                  placeholder="Your Message"
                  required
                  rows="4"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-600 transition-colors"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="w-5 h-5" />
                </button>
                {submitStatus && (
                  <p className={`text-center text-sm font-bold ${submitStatus.success ? 'text-green-400' : 'text-red-400'}`}>
                    {submitStatus.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs font-bold gap-4">
          <p>© 2026 Yogeshwaran .U | Senior IT & Full Stack Engineer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;