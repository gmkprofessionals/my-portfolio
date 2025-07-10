import React from 'react';
import InnerBanner from '../components/InnerBanner';
import Container from '../components/Container';
import Footer from '../components/Footer';

const mainServices = [
  'Incorporation',
  'Secretarial Audit',
  'Conversion of Companies',
  'Shifting of Registered Office',
  'Charge Services',
  'Due Diligence',
  'XBRL Filing',
  'Alteration of Memorandum',
  'Capital Reduction',
  'Statutory Register Maintenance',
  'Minutes, Agenda, Notice Preparation',
  'Declaration of Dividend',
  'INC – 22A and INC – 20A',
  'Director KYC',
];

const eventServices = [
  'Strike Off Company',
  'Valuation Report',
  'CRA – 2 & CRA – 4',
  'Dormant to Active Company',
  'ESOPS',
  'CSR – 1',
  'FC – 1',
  'Annual Filing of Dormant Company',
  'Buy Back of Shares',
  'Increase in Authorised Capital',
  'Private Placement of Shares',
  'Issue of Bonus Shares',
];

const RocServices = () => {
  return (
    <section >
      <InnerBanner/>
      <Container>
         <h2 className="h1-heading mb-9">
          ROC Compliance & Advisory Services
        </h2>
        <p className="text-lg md:text-xl mb-10 leading-relaxed text-gray-700">
          We provide comprehensive <strong>ROC retainership services</strong> to Private Limited,
          Public Limited, LLPs, and OPCs for all-year compliance management. Our tailored solutions
          help you stay compliant while you focus on growing your business with confidence and clarity.
        </p>

        <div className="mb-9">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Main Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl border-l-4 border-blue-600 shadow-sm p-5 hover:shadow-md transition"
              >
                <p className="text-base text-gray-700 font-medium">{service}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-blue-800 mb-16">Event-Based Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mb-16">
            {eventServices.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl border-l-4 border-amber-600 shadow-sm p-5 hover:shadow-md transition"
              >
                <p className="text-base text-gray-700 font-medium">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Footer/>
    </section>
  );
};

export default RocServices;
