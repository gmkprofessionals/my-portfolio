'use client';
import { motion } from 'framer-motion';
import Container from './Container';
import Footer from './Footer';
import InnerBanner from './InnerBanner';

const ContactUs = () => {
  return (
    <section>
      <InnerBanner/>
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="h1-heading text-center mb-12"
        >
          Contact Us
        </motion.h2>

        {/* Layout: Info & Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 mb-16">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-gray-700 text-sm"
          >
            <div>
              <h3 className="text-lg font-semibold text-blue-700">Office Address</h3>
              <p>123 Corporate Street, Kolkata, West Bengal, India – 700001</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-700">Phone</h3>
              <p>+91 7697146249</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-700">Email</h3>
              <p>info@webdeveloperdeepak.com</p>
            </div>

            {/* Google Map */}
            <div className="rounded-lg overflow-hidden">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.1894350494963!2d88.36389501496473!3d22.677957785126886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277255890a76b%3A0x4d3e21cbb5351c4f!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1720543900000"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Form submitted!');
            }}
          >
            <div>
              <label className="block text-gray-700 mb-1">Full Name:</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
             
            <div>
              <label className="block text-gray-700 mb-1">Email:</label>
              <input
                type="email"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Sub:</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Message:</label>
              <textarea
                rows={4}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded transition"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </Container>
      <Footer/>
    </section>
  );
};

export default ContactUs;
