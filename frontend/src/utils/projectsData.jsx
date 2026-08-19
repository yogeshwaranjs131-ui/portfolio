import React from 'react';
import { Plane, Car, Music } from 'lucide-react';

export const FALLBACK_PROJECTS = [
 
  {
    title: 'Flight Ticket Booking',
    description: 'A flight booking platform offering real-time flight search, price comparison, and secure seat reservation.',
    tech: ['React', 'Amadeus API', 'Context API', 'Tailwind CSS'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6L8601jeyp8_wszygE-sr00DW8iZUn_SBjoubdyujpdJcTYS6zgx2mFc8&s=10',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6L8601jeyp8_wszygE-sr00DW8iZUn_SBjoubdyujpdJcTYS6zgx2mFc8&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6L8601jeyp8_wszygE-sr00DW8iZUn_SBjoubdyujpdJcTYS6zgx2mFc8&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6L8601jeyp8_wszygE-sr00DW8iZUn_SBjoubdyujpdJcTYS6zgx2mFc8&s=10',
    ],
    icon: <Plane className="w-5 h-5 text-blue-600" />,
    liveLink: 'https://flightappc.netlify.app/',
    liveLabel: 'my-flight',
    githubUrl: 'https://github.com/yogeshwaranjs131-ui/flight-booking-app.git',
    backendLink: 'https://flight-booking-app-6z55.onrender.com/',
    featured: true,
  },
  {
    title: 'Car Rental Software',
    description: 'A real-world, complete car rental solution featuring vehicle availability tracking, online booking, secure payment processing, and automated email notifications.',
    tech: ['React', 'Redux', 'Node.js', 'Stripe API'],
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    liveLink: 'https://car-rental-software.vercel.app/',
    icon: <Car className="w-5 h-5 text-blue-600" />,
    githubUrl: 'https://github.com/yogeshwaranjs131-ui/Car-Rental-Software.git',
    featured: true,
    backendLink: 'https://car-rental-software.onrender.com/',
  },
  {
    title: 'Music Streaming App',
    description: "A premium audio platform with high-fidelity streaming, playlist curation, and a modern 'Glassmorphic' UI design using React.",
    tech: ['React', 'Web Audio API', 'Context API', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    icon: <Music className="w-5 h-5 text-blue-600" />,
    liveLink: 'https://musicappstream.netlify.app/',
    liveLabel: 'Music Streaming App',
    githubUrl: 'https://github.com/yogeshwaranjs131-ui/music-app.git',
    backendLink: 'https://music-app-2wy9.onrender.com/',
  },
];

export const EXPERIENCES = [
  {
    role: 'Admin Assistant',
    company: 'Winterfeel Hotel And Resort Pvt. Ltd.',
    period: 'February 4, 2026 – Present',
    logo: 'https://graph.facebook.com/winterfeelhotelsandresorts/picture?type=large',
    description:
      'Directing front-desk operations, guest relations, and resort administration. Managing financial reporting, payroll, and staff onboarding while optimizing room pricing strategies.',
  },
  {
    role: 'IT Engineer',
    company: 'Care Infotech Pvt. Ltd.',
    logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQFC07r755Ia7w/company-logo_200_200/company-logo_200_200/0/1644488611278?e=2147483647&v=beta&t=EBEUDI7AjnAvA600qdaUv-l4-BCHZGUAMqJ5AxkPdtY',
    period: 'April 2025 - August 2025',
    description:
      'Orchestrated enterprise IT infrastructure and SD-WAN configurations. Spearheaded network security protocols and resolved complex system bottlenecks for global-scale operations.',
  },
  {
    role: 'Desktop Support Engineer',
    company: 'IT Techies Services Pvt. Ltd.',
    logo: 'https://media.licdn.com/dms/image/v2/D560BAQH-UN7ngi-q3w/company-logo_200_200/company-logo_200_200/0/1684309453088/ittechies_logo?e=2147483647&v=beta&t=CaSHyDR8VmXMXPA3B1YexyJCTY447eOZOkmbvi8nRhU',
    period: '2023 - 2024',
    description:
      'Delivered high-level technical support and hardware lifecycle management. Optimized network performance and enforced rigorous system security and user access controls.',
  },
  {
    role: 'Service Engineer',
    company: 'Craze Computers',
    logo: '/craze computer logo.png',
    period: '2014 - 2020',
    description:
      'NOC operations, L1 support, and peak hour traffic monitoring. Specialized in troubleshooting call failures and ticketing system management.',
  },
];
