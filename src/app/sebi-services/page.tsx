import React from 'react';
import InnerBanner from '../components/InnerBanner';
import Footer from '../components/Footer';
import Container from '../components/Container';

const services = [
  'Corporate Governance Compliance Certificate',
  'Internal Audit of RTA',
  'As per Regulation 17-27',
  'Scheme Net Worth Certificate',
  'Annual Secretarial Compliance Report',
  'Certificate of Non-Disqualification',
  '100% Security Cover for Debt Securities',
  'Certificate for Listing in BSE SME Platform',
];

const SebiServices = () => {
  return (
    <section >
      <InnerBanner/>
      <Container>
         <h2 className="h1-heading mb-9">
          SEBI Compliance & Advisory Services
        </h2>
        <p className="text-lg md:text-xl mb-10 leading-relaxed text-gray-700">
          Stock Exchanges such as <strong>BSE</strong> and <strong>NSE</strong> closely monitor
          listed companies through mandatory filings, disclosures, and certifications from
          a <em>Practicing Company Secretary</em>. We act as your dedicated compliance partner—
          ensuring accurate, timely, and regulation-compliant filings in line with the frequent
          updates and evolving requirements under SEBI norms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-l-4 border-blue-700 shadow-sm p-5 hover:shadow-md transition"
            >
              <p className="text-base text-gray-700 font-medium">{service}</p>
            </div>
          ))}
        </div>
      </Container>
      <Footer/>
    </section>
  );
};

export default SebiServices;
