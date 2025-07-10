"use client";
import Link from "next/link";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Container from "./Container";
import SocialLinks from "./SocialLinks";

const Footer: React.FC = () => {
  return (
    <div className="bg-blue-900 py-12">
      <Container>
        <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-9 md:p-0 gap-9 w-full ">
          {/* About Column */}
          <div className="flex flex-col">
            <h2 className="footer-heading">About</h2>
            <p className="text-md text-justify text-white">
              Team of Professionals specialized in providing comprehensive & tailored corporate governance solutions to businesses of all sizes.
            </p>
          </div>
          {/* Quick Links Column */}
          <div className="flex flex-col">
            <h2 className="footer-heading">Quick Links</h2>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-white border-b-[1.5px] pb-2 hover:text-yellow-300">
                Blogs
              </Link>
              <Link href="/about" className="text-sm text-white border-b-[1.5px] pb-2 hover:text-yellow-300">
                About
              </Link>
              <Link href="/contact" className="text-sm text-white border-b-[1.5px] pb-2 hover:text-yellow-300">
                Services
              </Link>
              <Link href="/my-projects"  className="text-sm text-white border-b-[1.5px] pb-2 hover:text-yellow-300">
                Reviews & Rating
              </Link>
            </div>
          </div>
          {/* External Links Column */}
          <div className="flex flex-col">
            <h2 className="footer-heading">External Links</h2>
            <div className="space-y-2">
              <div className="text-sm text-white border-b-[1.5px] pb-2 hover:text-yellow-300">
                <Link href="https://www.linkedin.com/in/webdeveloperdeepak/" target="_blank" rel="noopener noreferrer" >
                  MCA
                </Link>
              </div>
              <div className="text-sm text-white border-b-[1.5px] pb-2 hover:text-yellow-300">
                <Link href="https://www.facebook.com/webdeveloperdeepak" target="_blank" rel="noopener noreferrer" >
                  NSE
                </Link>
              </div>
              <div  className="text-sm text-white border-b-[1.5px] pb-2 hover:text-yellow-300">
                <Link href="https://www.instagram.com/web_developer_deepak" target="_blank" rel="noopener noreferrer">
                  BSE
                </Link>
              </div>
              <div className="text-sm text-white border-b-[1.5px] pb-2 hover:text-yellow-300">
                <Link href="https://www.youtube.com/@deepakwebdeveloper" target="_blank" rel="noopener noreferrer" >
                  RBI
                </Link>
              </div>
              <div className="text-sm text-white border-b-[1.5px] pb-2 hover:text-yellow-300">
                <Link href="https://www.youtube.com/@deepakwebdeveloper" target="_blank" rel="noopener noreferrer" >
                  ICSI
                </Link>
              </div>
              <div  className="text-sm text-white border-b-[1.5px] pb-2 hover:text-yellow-300">
                <Link href="https://www.youtube.com/@deepakwebdeveloper" target="_blank" rel="noopener noreferrer">
                  SEBI
                </Link>
              </div>
              <div className="text-sm text-white border-b-[1.5px] pb-2 hover:text-yellow-300">
                <Link href="https://www.youtube.com/@deepakwebdeveloper" target="_blank" rel="noopener noreferrer">
                  NCLT
                </Link>
              </div>
            </div>
          </div>
          {/* Contact Column */}
          <div className="flex flex-col">
            <h2 className="footer-heading">Contact</h2>
            <div className="space-y-2">           
              <div className="flex items-center gap-2 text-sm text-white hover:text-yellow-300">
                <Phone size={18} /> 
                <a href="tel:+917607146249">Call: +91-9038572700</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white hover:text-yellow-300">
                <Mail size={18} /> 
                <a href="mailto:info@webdeveloperdeepak.com">Email: gmkprofessionals@gmail.com</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white hover:text-yellow-300">
                <MapPin size={18} /> 
                <p>Address: Baguihati, West Bengal, India.</p>
              </div>
            </div>
          </div>
          <SocialLinks/>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
