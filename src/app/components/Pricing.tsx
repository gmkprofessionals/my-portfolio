"use client";
import React from 'react';
import { CheckCircle } from 'lucide-react'; // or use react-icons if preferred
import Container from './Container';
import RequestCallback from './RequestCallback';

const pricingData = [
  {
    title: "Incorporation Services with Digital Presence",
    price: "₹3,000",
    features: [ 
      "Incorporation of PVT Co.",
      "Incorporation of OPC Co.",
      "Incorporation of LLP Co.",
      "Incorporation of LLP Co.",
      "PAN",
      "TAN",
      "Certificate of Incorporation",
      "MSME Registration",
      "Business Website",
      "Social Media Marketting"
    ],
  },
  {
    title: "Business Licensing & Trademark Registration",
    price: "₹6,000",
    features: [
      "ISO(9001:2015) IAF/NON-IAF",
      "Trademark Registration",
      "Trade License",
      "Shop & Establishment License",
    ],
  },
  {
    title: "Taxation (Direct/Indirect) & Audit Services",
    price: "₹15,000",
    features: [
      "Tax Audit",
      "TDS Return",
      "Income Tax Return",
      "CMA Report",
      "15CA & 15CB",
      "Net Worth Certificate",
      "Balance Sheet Signing",
      "Import/Export Code",
      "Society, Trust, 80G & 12A"
    ],
  },
  {
    title: "ROC Complaince for Private Limited Co.",
    price: "Starts at ₹45,000",
    features: [
      "AOC - 4",
      "MGT - 7",
      "MGT - 15",
      "ADT - 1",
      "MGT - 14",
      "CHG - 1, 9, 4",
      "DPT - 3",
      "PAS - 6",
      "PAS - 3",
      "DIR - 12",
      "MSME - 1",
      "INC - 20A",
      "DIR - 2",
      "DIR - 8",
      "MBP - 1"
    ],
  },
];

const Pricing: React.FC = () => {
  return (
    <div className='bg-white pt-12 py-24 px-9 w-full'>
      <Container>
        <h2 className="h1-heading text-center mb-16">Pricing Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 w-auto">
            {pricingData.map((plan, idx) => (
            <div
                key={idx}
                className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
            >
                <div>
                <h3 className="text-2xl font-bold text-blue-800">{plan.title}</h3>               
                <p className="text-xl font-bold italic text-gray-800 mt-2">{plan.price}</p>
                <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700 text-sm">
                        <CheckCircle className="text-green-500 w-3 h-3 mr-2" />
                        {feature}
                    </li>
                    ))}
                </ul>
                </div>
                <RequestCallback/>
            </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default Pricing;
