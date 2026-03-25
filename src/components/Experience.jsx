import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-[#0d1529]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">Work Experience</h2>
        <div className="space-y-8">
          <div className="bg-[#161e33] border border-slate-800 rounded-2xl p-8 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-300">VFS Global Pvt. Ltd.</h4>
                <p className="text-cyan-400">IT Engineer</p>
              </div>
              <p className="text-sm text-gray-500">April 2025 – August 2025</p>
            </div>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Installed, configured, and maintained hardware, software, and operating systems.</li>
              <li>• Configured SD WAN and resolved network and system issues.</li>
              <li>• Administered network performance and implemented efficiency-enhancing solutions.</li>
              <li>• Managed system backups, recovery processes, and user permissions.</li>
            </ul>
          </div>
          <div className="bg-[#161e33] border border-slate-800 rounded-2xl p-8 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-300">IT Techies Services Pvt. Ltd.</h4>
                <p className="text-cyan-400">Desktop Support Engineer</p>
              </div>
              <p className="text-sm text-gray-500">April 2023 – November 2023</p>
            </div>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Provided network administration and technical troubleshooting support.</li>
              <li>• Implemented system security protocols and managed backup processes.</li>
              <li>• Delivered technical assistance and ensured proper system documentation.</li>
            </ul>
          </div>
          <div className="bg-[#161e33] border border-slate-800 rounded-2xl p-8 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-300">Winterfell Resort And Hotel</h4>
                <p className="text-cyan-400">Admin</p>
              </div>
              <p className="text-sm text-gray-500">February 2025 – Present</p>
            </div>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Managed front-desk operations, guest check-ins, and served as the first point of contact.</li>
              <li>• Handled booking inquiries, modifications, and cancellations via phone and email.</li>
              <li>• Recruited, trained, and onboarded employees while managing staff relations.</li>
              <li>• Developed pricing strategies and analyzed market trends to optimize room rates.</li>
              <li>• Responsible for financial reporting, budgeting, and payroll management.</li>
            </ul>
          </div>
          <div className="bg-[#161e33] border border-slate-800 rounded-2xl p-8 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-300">Craze Computers</h4>
                <p className="text-cyan-400">Service Engineer</p>
              </div>
              <p className="text-sm text-gray-500">May 2014 – March 2020</p>
            </div>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Managed customer issues through a ticketing system and 24/7 Level 1 support.</li>
              <li>• Executed troubleshooting using CDRs and monitored calls from soft switches or gateways.</li>
              <li>• Monitored traffic during peak hours and addressed quality team issues.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;