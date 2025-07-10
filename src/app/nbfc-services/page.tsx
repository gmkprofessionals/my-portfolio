import React from 'react';
import Container from '../components/Container';
import Footer from '../components/Footer';
import InnerBanner from '../components/InnerBanner';

const services = [
  'NBFC Incorporation',
  'NBS – 2 (Deposit Taking)',
  'NBS – 3 (Deposit Taking)',
  'NBS – 4 (Deposit Taking)',
  'NBS – 6 (Deposit Taking)',
  'NBS – 7 (Deposit Taking)',
  'NBS ALM – 1 (Non-Deposit Taking)',
  'NBS ALM – 2 (Non-Deposit Taking)',
  'NBS ALM – 3 (Non-Deposit Taking)',
];

const NbfcServices = () => {
  return (
    <section >
        <InnerBanner/>
        <Container>
            <h2 className="h1-heading mb-9">
                NBFC Liaisoning & Compliance Services
            </h2>
            <p className="text-lg md:text-xl mb-10 leading-relaxed text-gray-700">
            We provide comprehensive liaisoning services for obtaining <strong>NBFC approval</strong> from
            the Reserve Bank of India (RBI). Our team also ensures that your NBFC complies with all
            mandatory RBI filings, both for <em>Deposit-Taking</em> and <em>Non-Deposit Taking</em> categories—
            helping you stay compliant, audit-ready, and focused on your core business.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mb-16">
            {services.map((service, index) => (
                <div
                key={index}
                className="bg-gray-50 rounded-xl border-l-4 border-blue-600 p-5 shadow-sm hover:shadow-md transition"
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

export default NbfcServices;
