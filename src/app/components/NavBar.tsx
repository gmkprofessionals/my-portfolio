"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Container from "./Container";

const servicesList = [
  { name: "Tax and Regulatory", url: "/tax-and-regulatory-services" },
  { name: "Audit & Assurance", url: "/audit-and-assurance-services" },
  { name: "FEMA Service", url: "/fema-services" },
  { name: "NBFC Services", url: "/nbfc-services" },
  { name: "ROC Services", url: "/roc-services" },
  { name: "SEBI Services", url: "/sebi-services" },
  { name: "Other Services", url: "/other-services" },
  { name: "Other Compliance", url: "/other-compliance" }
];

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg w-full fixed top-0 z-50">
      <Container>
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <Image
              alt="Gourav Saraf - Practicing Company Secretary"
              src="/cs.png"
              width={45}
              height={45}
            />
            <div className="h-8 w-px bg-gray-300 mx-1" />
            <h1 className="h1-heading">Gourav Saraf</h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 items-center font-medium text-gray-700">
            <li>
              <Link
                href="/"
                className="hover:bg-blue-700 hover:text-white px-3 py-1 rounded transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:bg-blue-700 hover:text-white px-3 py-1 rounded transition-colors"
              >
                About
              </Link>
            </li>

            {/* Services Dropdown */}
            <li className="relative group">
              <div className="flex items-center gap-1 px-3 py-1 rounded cursor-pointer hover:bg-blue-700 hover:text-white transition-colors">
                Services
                <FaChevronDown className="text-sm mt-0.5 transition-transform duration-200 group-hover:rotate-180" />
              </div>

              <ul className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 group-hover:translate-y-0 translate-y-2">
                {servicesList.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.url}
                      className="block px-4 py-2 hover:bg-blue-50 text-sm text-gray-700"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link
                href="/blogs"
                className="hover:bg-blue-700 hover:text-white px-3 py-1 rounded transition-colors"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:bg-blue-700 hover:text-white px-3 py-1 rounded transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-2xl text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <ul className="md:hidden px-4 pb-4 space-y-2 font-medium text-gray-700">
            <li>
              <Link
                href="/"
                className="block hover:bg-blue-100 px-3 py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block hover:bg-blue-100 px-3 py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>

            {/* Mobile Services Dropdown */}
            <li>
              <div
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="flex justify-between items-center px-3 py-2 rounded cursor-pointer hover:bg-blue-100"
              >
                <span>Services</span>
                <FaChevronDown
                  className={`transition-transform ${
                    isMobileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {isMobileDropdownOpen && (
                <ul className="ml-4 mt-2 space-y-1">
                  {servicesList.map((service, index) => (
                    <li key={index}>
                      <Link
                        href={service.url}
                        className="block text-sm text-gray-700 px-3 py-1 rounded hover:bg-blue-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/blogs"
                className="block hover:bg-blue-100 px-3 py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block hover:bg-blue-100 px-3 py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        )}
      </Container>
    </nav>
  );
};

export default NavBar;
