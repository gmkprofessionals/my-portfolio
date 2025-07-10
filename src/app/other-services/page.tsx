// app/components/OtherServices.tsx
import React from 'react';
import InnerBanner from '../components/InnerBanner';
import Container from '../components/Container';
import Footer from '../components/Footer';

const registrations = [
  'MSME Registration',
  'Professional Tax',
  'Trade License',
  'Import Export Code',
  'FSSAI',
  'ISO Certification',
  'Trademark',
  'Patent',
  'Start Up India Registration',
  'EPF & ESI',
  'Shop & Establishment Registration',
];

const gstAndReturns = [
  'GST Registration',
  'GST Monthly Return',
  'GST Annual Return',
  'Job Work Return',
];

const strategicAndCompliance = [
  'Voluntary Liquidation',
  'Extension Of AGM',
  'Accounting Outsourcing',
  'Advisory Services',
  'Finance Outsourcing',
];

const OtherServices = () => {
  return (
    <section >
      <InnerBanner/>
      <Container>
         <h2 className="h1-heading mb-9">
          Other Professional Services
        </h2>
        <p className="text-lg md:text-xl mb-10 leading-relaxed text-gray-700">
          Our team of financial, accounting, and strategic experts brings years of experience in
          helping businesses grow with confidence. We offer a wide spectrum of value-added services
          across licensing, compliance, tax, and financial process outsourcing to ensure you are
          always supported at every stage of your business journey.
        </p>

        {/* Section: Registrations */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">
            Registrations & Licenses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {registrations.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border-l-4 border-blue-600 shadow-sm p-5 hover:shadow-md transition"
              >
                <p className="text-base text-gray-700 font-medium">{service}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: GST & Tax */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">
            GST & Tax Filing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {gstAndReturns.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border-l-4 border-amber-500 shadow-sm p-5 hover:shadow-md transition"
              >
                <p className="text-base text-gray-700 font-medium">{service}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Strategic & Compliance */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">
            Strategic & Compliance Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mb-16">
            {strategicAndCompliance.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border-l-4 border-emerald-600 shadow-sm p-5 hover:shadow-md transition"
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

export default OtherServices;
