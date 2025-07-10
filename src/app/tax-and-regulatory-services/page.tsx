// app/components/TaxServices.tsx
import React from "react";
import Container from "../components/Container";
import Footer from "../components/Footer";
import InnerBanner from "../components/InnerBanner";

const services = [
  "Transfer Pricing",
  "Tax Strategy & Compliances",
  "International Taxation",
  "Tax Representation",
];

const TaxServices = () => {
  return (
    <section>
      <InnerBanner/>
      <Container>
        <h2 className="h1-heading mb-9">
          Tax & Regulatory Services
        </h2>
        <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-700">
          All your tax (including <strong>Direct</strong> &{" "}
          <strong>Indirect</strong> taxes) advisory requirements in one place —
          so you can focus on growing your business. Our experts deliver
          insightful, compliant, and forward-looking strategies tailored to your
          unique needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-700">{service}</h3>
              <p className="mt-2 text-gray-600">
                {getServiceDescription(service)}
              </p>
            </div>
          ))}
        </div>
      </Container>
      <Footer/>
    </section>
  );
};

const getServiceDescription = (service: string) => {
  switch (service) {
    case "Transfer Pricing":
      return "Ensure your intercompany transactions are priced fairly and comply with global transfer pricing laws.";
    case "Tax Strategy & Compliances":
      return "We help you plan tax strategies while ensuring full compliance with the latest legal and financial regulations.";
    case "International Taxation":
      return "Navigate complex international tax landscapes with confidence and ensure compliance in cross-border dealings.";
    case "Tax Representation":
      return "Expert representation in front of tax authorities to handle assessments, audits, and disputes efficiently.";
    default:
      return "";
  }
};

export default TaxServices;
