import React from 'react';
import InnerBanner from '../components/InnerBanner';
import Container from '../components/Container';
import Footer from '../components/Footer';

const services = [
  'Certificate of form ECB',
  'Certification of Loan Registration – Form 83',
  'Conversion of ECB to Equity – Form FC-GPR',
  'Annual Performance Report (APR)',
  'Foreign Assets & Liabilities Report (FLA)',
  'Security Clearance of Foreign Directors & Appointment',
  'Form ODI',
  'Form FC-TRS',
  'Form FC-GPR',
  'Certificate of Investment from Foreign Company under FEMA',
  'FEMA Annual Compliance Pack',
  'Due Diligence for Foreign Investment',
];

const FemaServices = () => {
  return (
    <section >
      <InnerBanner/>
      <Container>
         <h2 className="h1-heading mb-9">
          FEMA Services
        </h2>
        <p className="text-lg md:text-xl mb-10 leading-relaxed text-gray-700">
          We offer end-to-end FEMA advisory including setting up Branch, Liaison, or Project
          offices in India for foreign companies. Our services simplify regulatory filings such as
          <strong> FIPB approvals</strong>, <strong>FCRA registrations</strong>, and complex compliance requirements—helping you
          confidently establish a global footprint.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border-l-4 border-blue-600 p-5 hover:shadow-md transition-all"
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

export default FemaServices;
