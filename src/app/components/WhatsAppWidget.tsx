import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/917607146249?text=Hi%20I%20am%20interested%20in%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp fixed bottom-5 right-5 z-50 bg-gradient-to-tr from-yellow-400 to-amber-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-200"
    >
      <FaWhatsapp className="text-xl mr-2 font-semibold" />
      Chat with us
    </a>
  );
}
