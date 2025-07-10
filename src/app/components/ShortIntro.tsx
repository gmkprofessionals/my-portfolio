"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Container from "./Container";

const ShortIntro: React.FC = () => {
  const router = useRouter();

  return (
    <section className="pt-9 pb-24 bg-white px-9 w-full">
      <Container>
        <h1 className="h1-heading text-center mt-9 mb-16">
          Professional Consulting Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="w-full">
            <Image
              alt="Gourav Saraf-Company Secratory"
              src="/consultant.jpg"
              width={600}
              height={600}
              className="rounded-2xl shadow-md object-cover w-full max-h-[400px] md:max-h-[500px]"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center text-gray-800 gap-2">
            <div className="flex flex-col h1-heading">
              <span>Moving Your Business To The</span>
              <span>Next Level</span>
            </div>

            <p className="text-lg leading-relaxed text-justify mb-4">
              You are one step ahead of making a smart choice. Let us help you
              complete this journey of making a decision to choose your right
              compliance partner. 
            </p>

            <p className="text-lg leading-relaxed text-justify mb-4">
              Our team invests in quality and timely
              services to the client. We also consider happy stakeholders to our
              ultimate objective. 
            </p>

            <p className="text-lg leading-relaxed text-justify mb-6">
              Approach of advice that is given, is keeping
              in mind, the best interest of the client in a friendly manner.
            </p>

            <button
              type="button"
              className="btnLeft w-[130px]"
              onClick={() => router.push("/about")}
            >
              Read More
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ShortIntro;
