import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Zenith Commerce',
    category: 'E-Commerce Platform',
    description: 'A modern, scalable e-commerce solution with seamless checkout and inventory management.',
    color: '#FF4D2D',
  },
  {
    title: 'Pulse Finance',
    category: 'FinTech Dashboard',
    description: 'Real-time analytics platform for financial institutions with advanced data visualization.',
    color: '#2D3FFF',
  },
  {
    title: 'Luna Wellness',
    category: 'Health & Lifestyle',
    description: 'Holistic wellness app connecting users with personalized fitness and nutrition plans.',
    color: '#8B5CF6',
  },
  {
    title: 'Nova Studio',
    category: 'Creative Portfolio',
    description: 'A stunning portfolio website showcasing architectural design with 3D interactions.',
    color: '#10B981',
  },
];

export default function Projects() {
  return (
    <section id="work" className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Featured Work
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
            A curated selection of projects that showcase our passion for
            exceptional digital experiences.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-gray-100 hover:bg-gray-200 transition-all duration-500">
                <div
                  className="h-64 md:h-96 flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}05 100%)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
                      <ArrowUpRight size={32} className="text-white" />
                    </div>
                  </div>

                  <div className="text-center space-y-4 p-8">
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="p-8 md:p-12 border-t border-gray-200">
                  <p className="text-gray-600 text-lg max-w-2xl">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}