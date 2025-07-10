"use client";
import { motion } from "framer-motion";

const teamIntro = `
We are a team of young and energetic professionals — Chartered Accountants, Company Secretaries, and MBAs — with a positive approach to providing expert and ethical services. 
Our team operates like a family and believes strongly in establishing long-term relationships with our clients. Each member brings deep experience across industries, 
stays updated with market and regulatory developments, and contributes with diligence, integrity, and core domain expertise.
`;

const teamMembers = [
  {
    name: "Gourav Saraf – PCS",
    bio: "Associate member of the Institute of Company Secretaries of India with 7+ years of experience.",
  },
  {
    name: "Neha Kaushal Goenka – PCS",
    bio: "Associate member of the Institute of Company Secretaries of India, practicing in Corporate Law.",
  },
  {
    name: "Urvashi Saraf – CA",
    bio: "Member of the Institute of Chartered Accountants of India with exposure in Accounting, Auditing, and Taxation.",
  },
  {
    name: "Ankita Saraf Mittal – MBA",
    bio: "Qualified PGPBM professional with extensive market study experience.",
  },
];

const OurTeam = () => {
  return (
    <section className="mb-16">
      <h2 className="h1-heading mb-9">Our Team</h2>
        <p className="text-gray-600 mb-12 text-sm md:text-base leading-relaxed text-justify">
          {teamIntro}
        </p>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 text-justify">{member.bio}</p>
            </motion.div>
          ))}
        </div>
    </section>
  );
};

export default OurTeam;
