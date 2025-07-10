'use client';

import { motion } from 'framer-motion';
import { FaEye, FaBullseye, FaRegHandshake } from 'react-icons/fa';

const items = [
  {
    title: "Our Vision",
    icon: <FaEye className="text-3xl text-blue-600 mb-4" />,
    description:
      "To be a trusted partner in corporate governance by empowering businesses with accurate, reliable, and transparent compliance solutions, enabling long-term sustainability and ethical growth.",
  },
  {
    title: "Our Mission",
    icon: <FaBullseye className="text-3xl text-blue-600 mb-4" />,
    description:
      "To provide tailored, professional, and prompt legal and compliance support through a qualified team, ensuring every client receives high-quality service with personal attention and strategic guidance.",
  },
  {
    title: "Our Core Values",
    icon: <FaRegHandshake className="text-3xl text-blue-600 mb-4" />,
    description:
      "Integrity, Transparency, Commitment, Accountability, and Client-Centricity. These values define our work culture and shape every interaction with our clients and partners.",
  },
];

const VisionMissionValues: React.FC = () => {
  return (
    <section className='mb-9'>
      <h2 className="h1-heading mb-9">Vision, Mission & Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex flex-col items-center">
                {item.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
    </section>
  );
};

export default VisionMissionValues;
