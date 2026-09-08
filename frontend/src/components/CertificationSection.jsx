import React from 'react';
import { CheckCircle } from 'lucide-react';

const CertificationSection = ({ nsdcCertificateImageUrl }) => {
  return (
    <section className="py-24 px-6 z-10 relative bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative flex flex-col md:flex-row items-center gap-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          
          <div className="flex-1 z-10">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-blue-500/20">Credential</div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">MERN Stack Certified</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl">
              Successfully completed the <strong>Master of Full Stack Development</strong> program at{' '}
              <a 
                href="https://entrackr.com/2022/09/edtech-startup-guvi-bags-investment-from-hcls-promoter/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline font-bold"
              >
                GUVI Geek Networks
              </a>, an IIT-M & IIM-A incubated company. Specialized in high-performance web applications and backend architecture.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://drive.google.com/file/d/1SC6Qx0CM__ctupSJRTndkbUAd1ODScNw/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors"
              >
                <img src="https://cdn.brandfetch.io/guvi.io/logo" alt="GUVI Logo" className="w-5 h-5 bg-white rounded p-0.5 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                <span className="text-sm font-bold">GUVI Certified</span>

                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 transform scale-95 group-hover:scale-100">
                  <img src="https://drive.google.com/uc?export=view&id=1SC6Qx0CM__ctupSJRTndkbUAd1ODScNw" alt="GUVI Certificate Preview" className="rounded-lg shadow-2xl border-4 border-blue-600 bg-white min-h-25" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rotate-45"></div>
                </div>
              </a>

              <a
                href="https://drive.google.com/uc?export=download&id=14NdEuZQP1SULtDxUtrl0eCaPEFGMFnvw"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors"
              >
                <img src={nsdcCertificateImageUrl} alt="NSDC Logo" className="w-5 h-5 transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                <span className="text-sm font-bold">NSDC Certified</span>

                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 transform scale-95 group-hover:scale-100">
                  <img src="https://drive.google.com/uc?export=view&id=14NdEuZQP1SULtDxUtrl0eCaPEFGMFnvw" alt="NSDC Certificate Preview" className="rounded-lg shadow-2xl border-4 border-blue-600 bg-white min-h-25" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rotate-45"></div>
                </div>
              </a>

              <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm font-bold">IIT-M Incubated</span>
              </div>
            </div>
          </div>

          <a 
            href="https://entrackr.com/2022/09/edtech-startup-guvi-bags-investment-from-hcls-promoter/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-80 h-auto aspect-square bg-slate-800 rounded-3xl border border-slate-700 flex flex-col items-center justify-center p-6 text-center group transition-all hover:scale-105 hover:border-blue-500 cursor-pointer overflow-hidden shadow-xl"
          >
            <img 
              src="https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/post_attachments/wp-content/uploads/2022/09/Guvi.jpg" 
              alt="GUVI Feature" 
              className="w-full h-36 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
            />
            <p className="text-lg font-black mb-1 text-white">Full Stack Developer</p>
            <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">GUVI CERTIFIED</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CertificationSection;