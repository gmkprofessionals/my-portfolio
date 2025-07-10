"use client";
import React from "react";
import Image from "next/image";
import Container from "./Container";
import HowWeWork from "./HowWeWork";
import VisionMissionValues from "./VissionMission";
import OurTeam from "./OurTeam";
import Footer from "./Footer";
import InnerBanner from "./InnerBanner";

const AboutGourav = () => {
  return (
    <div>
      <InnerBanner/>
      <Container>
        <h2 className="h1-heading mb-9">About</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 mb-9">
          <div className="text-justify">
            <p>
              At <strong>Gourav Saraf – Team of Professionals</strong>, we
              specialize in delivering comprehensive and customized{" "}
              <strong>corporate governance</strong> and{" "}
              <strong>compliance solutions</strong> to businesses of all sizes,
              across diverse industries and sectors.
              <br />
              <br />
              With over <strong>7 years of experience</strong> in the field, we
              possess a deep understanding of the intricacies involved in{" "}
              <strong>corporate law, regulatory frameworks</strong>, and{" "}
              <strong>industry-specific compliance requirements</strong>. Our
              mission is to empower organizations to focus on their growth while
              we manage the legal and procedural responsibilities that ensure
              long-term sustainability and accountability.
              <br />
              <br />
              Our team is composed of experienced{" "}
              <strong>Practising Chartered Accountants</strong> and
              <strong>Company Secretaries</strong>, supported by a network of
              affiliated professionals in major cities across India. This wide
              reach enables us to serve clients with a truly national
              perspective and cater to region-specific requirements without
              compromising on quality or responsiveness.
              <br />
              <br />
              We offer a wide range of professional services including{" "}
              <strong>
                company incorporation, ROC filings, FEMA and SEBI compliance,
                NBFC advisory, audits, and regulatory consultancy
              </strong>
              . Every solution we offer is tailored to meet the unique needs of
              each client, with the goal of ensuring both legal compliance and
              strategic advantage.
            </p>
          </div>
          <div className="w-full h-auto">
            <Image
              alt="About-Gourav-Saraf"
              src="/gourav.png"
              width={600}
              height={400}
            />
          </div>
        </div>
        <HowWeWork/>
        <VisionMissionValues/>
        <OurTeam/>
      </Container>
      <Footer/>
    </div>
  );
};

export default AboutGourav;
