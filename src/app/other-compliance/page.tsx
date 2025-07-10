import React from 'react';
import InnerBanner from '../components/InnerBanner';
import Container from '../components/Container';
import Footer from '../components/Footer';

const complianceServices = [
  'MSME Registration',
  'Professional Tax',
  'Trade Licence',
  'FSSAI Licence',
  'ISO Certification',
  'Extension of AGM',
  'Buy Back of Shares',
  'Voluntary Liquidation',
  'Trademark Application',
  'Search Report',
];

const OtherCompliances = () => {
  return (
    <section>
      <InnerBanner/>
      <Container>
        <h2 className="h1-heading mb-9">
          Other Compliances
        </h2>
        <p className="text-lg md:text-xl mb-10 leading-relaxed text-gray-700">
          We provide essential and affordable compliance services that ensure your business
          stays legally sound and operationally smooth—without the burden of high regulatory
          costs. These services are crucial for day-to-day as well as annual business hygiene.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mb-16">
          {complianceServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-l-4 border-blue-600 shadow-sm p-5 hover:shadow-md transition"
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

export default OtherCompliances;
