'use client';
import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

const SocialLinks: React.FC = () => {
  return (
    <div className="flex gap-4 items-center">
      <a
        href="https://facebook.com"
        title='Facebook'
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition"
      >
        <FaFacebookF />
      </a>

      <a
        href="https://instagram.com"
        title='Instagram'
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 text-white flex items-center justify-center hover:opacity-90 transition"
      >
        <FaInstagram />
      </a>

      <a
        href="https://linkedin.com"
        title='Linkedin'
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"
      >
        <FaLinkedinIn />
      </a>

      <a
        href="https://wa.me/919999999999" // Replace with your number
        title='Whatsapp'
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default SocialLinks;
