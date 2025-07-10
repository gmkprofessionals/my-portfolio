"use client";
import React from "react";
import {
  FaBalanceScale,
  FaClipboardCheck,
  FaExchangeAlt,
  FaBuilding,
  FaRegFileAlt,
  FaChartLine,
  FaTasks,
  FaGlobe,
} from "react-icons/fa";
import Container from "./Container";

const services = [
  {
    name: "Tax and Regulatory",
    icon: <FaBalanceScale className="text-blue-700 text-3xl" />,
    description:
      "Expert tax planning and compliance solutions for individuals and businesses ensuring full regulatory adherence.",
  },
  {
    name: "Audit & Assurance",
    icon: <FaClipboardCheck className="text-blue-700 text-3xl" />,
    description:
      "Comprehensive auditing services to help you maintain transparency, accuracy, and regulatory standards.",
  },
  {
    name: "FEMA Service",
    icon: <FaExchangeAlt className="text-blue-700 text-3xl" />,
    description:
      "Advisory and compliance under FEMA for cross-border transactions, foreign investments, and RBI guidelines.",
  },
  {
    name: "NBFC Services",
    icon: <FaBuilding className="text-blue-700 text-3xl" />,
    description:
      "End-to-end NBFC registration, compliance management, and advisory services tailored for financial institutions.",
  },
  {
    name: "ROC Services",
    icon: <FaRegFileAlt className="text-blue-700 text-3xl" />,
    description:
      "All ROC compliance filings, annual returns, company incorporation, and MCA-related documentation handled expertly.",
  },
  {
    name: "SEBI Services",
    icon: <FaChartLine className="text-blue-700 text-3xl" />,
    description:
      "SEBI registration, regulatory compliance, and support for intermediaries operating in securities markets.",
  },
  {
    name: "Other Services & Compliance",
    icon: <FaTasks className="text-blue-700 text-3xl" />,
    description:
      "Custom corporate, secretarial, and regulatory services tailored to your business needs with timely execution.",
  },
  {
    name: "Digital Presence",
    icon: <FaGlobe className="text-blue-700 text-3xl" />,
    description:
      "Enhance your digital presence with a strong website, SEO, social media, and digital strategies that build trust and visibility.",
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-18 bg-gray-100">
      <Container>
        <div className="flex flex-col ">
          <h2 className="h1-heading text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm text-justify">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Services;
