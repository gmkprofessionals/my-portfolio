'use client';

import { motion } from 'framer-motion';

const workSteps = [
  {
    title: 'Seeking Requirement',
    description: `The process starts with calling the client and gathering the requirements in as much detail as possible. Any ambiguity is clarified immediately. After understanding the need, we suggest solutions tailored to the case.`,
  },
  {
    title: 'Thorough Study',
    description: `We study the requirement through relevant case laws, acts, rules, and regulations to streamline the process. Required documents are requested and scrutinized carefully to ensure they are error-free.`,
  },
  {
    title: 'Filling the Data',
    description: `The final step involves carefully filling in the received data, attaching relevant annexures, and double-checking figures to avoid typos. After final verification, the documents are sent to the client for their review.`,
  },
];

const HowWeWork = () => {
  return (
    <section className="mb-9">
      <h2 className="h1-heading mb-9">How Do We Work?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {workSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-gray-50 shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold text-sm mb-4">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed text-justify">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;
