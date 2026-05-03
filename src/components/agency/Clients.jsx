import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  'TechVision',
  'Zenith Corp',
  'NovaTech',
  'Pulse Media',
  'Quantum Labs',
  'Apex Digital',
];

export default function Clients() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gray-600 text-sm uppercase tracking-wider mb-4">
            Trusted By
          </p>
          <h3 className="text-3xl md:text-4xl font-bold">
            Leading Brands Worldwide
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center justify-center p-6 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <span className="text-lg font-semibold text-gray-400 hover:text-black transition-colors">
                {client}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}