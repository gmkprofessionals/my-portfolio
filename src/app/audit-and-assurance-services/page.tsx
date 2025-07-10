import React from 'react';
import Container from '../components/Container';
import Footer from '../components/Footer';
import InnerBanner from '../components/InnerBanner';

const services = [
  {
    title: 'Internal Audit',
    description:
      'We help assess and strengthen your internal control framework to improve operational efficiency, mitigate risks, and ensure regulatory compliance across departments.',
  },
  {
    title: 'Statutory Audit',
    description:
      'Our statutory audit services provide independent assurance on the fairness and accuracy of financial statements in accordance with legal and regulatory standards.',
  },
  {
    title: 'Direct Tax Audit',
    description:
      'We conduct direct tax audits to ensure accurate reporting of income, proper claim of deductions, and full compliance with Income Tax Act regulations, minimizing litigation risk.',
  },
  {
    title: 'Indirect Tax Audit',
    description:
      'We help verify GST, VAT, and other indirect tax compliance, identifying risks and streamlining reporting to ensure efficient tax management and avoid penalties.',
  },
];

const AuditServices = () => {
  return (
    <section>
      <InnerBanner/>
      <Container>
         <h2 className="h1-heading mb-9">
          Audit & Assurances
        </h2>
        <p className="text-lg md:text-xl mb-10 leading-relaxed text-gray-700">
          As businesses expand globally, robust auditing and assurance practices are
          critical for financial integrity, compliance, and stakeholder confidence.
          Our Audit & Assurance services are designed to deliver clarity, transparency,
          and long-term value across every aspect of your business.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-sm border-l-4 border-blue-600 p-6 hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
      <Footer/>
    </section>
  );
};

export default AuditServices;
