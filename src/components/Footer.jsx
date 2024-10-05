import { FaFacebookF, FaYoutube, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import BitLogo from "../assets/mesra_logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#17252a] text-white py-6 px-4 md:px-8 font-bold">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="w-full md:w-1/3 text-center md:text-left space-y-3">
            <h3 className="text-xl">TECHNIKA 2024</h3>
            <p className="text-sm md:text-base">INNOVATING TODAY, SUSTAINING TOMORROW</p>
            <div className="flex flex-col items-center md:items-start mt-3">
              <span className="text-sm mb-2">FOLLOW US ON</span>
              <div className="flex">
                <a href="#" className="text-white hover:text-gray-400 mr-4 transition-colors duration-300">
                  <FaYoutube size={20} />
                </a>
                <a href="#" className="text-white hover:text-gray-400 transition-colors duration-300">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
            <img
              src={BitLogo}
              alt="BIT Mesra Logo"
              className="w-20 md:w-24 h-auto object-contain mb-3 pointer-events-none"
            />
            <p className="text-sm text-gray-400">&copy; 2024 TECHNIKA. All rights reserved.</p>
          </div>

          <div className="w-full md:w-1/3 text-center md:text-right space-y-1 md:space-y-2">
            <p className="text-sm md:text-base">Birla Institute of Technology</p>
            <p className="text-sm md:text-base">Patna, Bihar 800014, India</p>
            <a 
              href="mailto:technika@bitmesra.ac.in" 
              className="flex justify-center md:justify-end items-center mt-3 hover:text-gray-300 transition-colors duration-300"
            >
              <FaEnvelope size={18} className="mr-2" />
              <span className="text-sm md:text-base">technika@bitmesra.ac.in</span>
            </a>
            <div className="flex justify-center md:justify-end items-center mt-1">
              <FaPhone size={18} className="mr-2" />
              <span className="text-sm md:text-base">+91 8252624667</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
