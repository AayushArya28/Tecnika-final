import { FaFacebookF, FaYoutube, FaWhatsapp, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-teal-300 py-8 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Text and Social Icons */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold">TECHNIKA 2024</h3>
          <p>INNOVATING TODAY, SUSTAINING TOMORROW</p>
          <p className="mt-4">FOLLOW US ON</p>
          <div className="flex gap-4 mt-2">
            {/* Social Media Icons */}
            <a href="#" className="text-white hover:text-gray-400">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaYoutube size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Right Section: Contact Info */}
        <div className="text-center md:text-right">
          <p>Birla Institute of Technology</p>
          <p>Patna, Bihar 800014, India</p>
          <div className="flex items-center justify-center md:justify-end mt-4 space-x-2">
            {/* Email */}
            <FaEnvelope />
            <p>technika@bitmesra.ac.in</p>
          </div>
          <div className="flex items-center justify-center md:justify-end mt-2 space-x-2">
            {/* Phone */}
            <FaPhone />
            <p>+91 8252624667</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
