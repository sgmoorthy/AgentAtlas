import React from 'react';
import { DirectoryCard } from './DirectoryCard';

const sampleData = [
  {
    name: "Vercel",
    description: "The platform for frontend developers, providing the speed and reliability innovators need to create at the edge.",
    logo: "V",
    tags: ["Frontend", "Deployment", "Next.js", "React"],
    location: "San Francisco, CA",
    employees: "100-500",
    type: "company" as const
  },
  {
    name: "Sarah Chen",
    description: "Senior Product Designer with 8+ years of experience creating delightful user experiences for tech startups.",
    logo: "SC",
    tags: ["Product Design", "UX/UI", "Figma", "User Research"],
    location: "New York, NY",
    employees: "Freelancer",
    type: "talent" as const
  },
  {
    name: "Stripe",
    description: "Online payment processing for internet businesses. Millions of companies use Stripe to accept payments.",
    logo: "S",
    tags: ["Fintech", "Payments", "API", "Infrastructure"],
    location: "San Francisco, CA",
    employees: "1000+",
    type: "company" as const
  },
  {
    name: "Marcus Rodriguez",
    description: "Full-stack developer specializing in React, Node.js, and cloud architecture. Open source contributor.",
    logo: "MR",
    tags: ["Full Stack", "React", "Node.js", "AWS"],
    location: "Austin, TX",
    employees: "Freelancer",
    type: "talent" as const
  },
  {
    name: "Linear",
    description: "The issue tracking tool streamlined for high-performance teams. Built for modern software development.",
    logo: "L",
    tags: ["Productivity", "Project Management", "B2B", "Software"],
    location: "Remote",
    employees: "50-100",
    type: "company" as const
  },
  {
    name: "Jessica Kim",
    description: "Data scientist and machine learning engineer with expertise in Python, TensorFlow, and deep learning.",
    logo: "JK",
    tags: ["Data Science", "Machine Learning", "Python", "AI"],
    location: "Seattle, WA",
    employees: "Freelancer",
    type: "talent" as const
  },
  {
    name: "Notion",
    description: "All-in-one workspace for notes, tasks, wikis, and databases. Where teams go to work together.",
    logo: "N",
    tags: ["Productivity", "Collaboration", "Workspace", "SaaS"],
    location: "San Francisco, CA",
    employees: "500-1000",
    type: "company" as const
  },
  {
    name: "David Thompson",
    description: "Mobile app developer with expertise in React Native and Flutter. 50+ apps published on app stores.",
    logo: "DT",
    tags: ["Mobile Development", "React Native", "Flutter", "iOS/Android"],
    location: "London, UK",
    employees: "Freelancer",
    type: "talent" as const
  }
];

export const DirectoryGrid: React.FC = () => {
  return (
    <div className="bg-stone-50 dark:bg-slate-900 py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Directory
            <span className="text-5xl sm:text-6xl ml-4">✨</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore innovative companies and exceptional talent making waves in the tech industry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleData.map((item, index) => (
            <DirectoryCard
              key={index}
              name={item.name}
              description={item.description}
              logo={item.logo}
              tags={item.tags}
              location={item.location}
              employees={item.employees}
              type={item.type}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
            View All Profiles
          </button>
        </div>
      </div>
    </div>
  );
};