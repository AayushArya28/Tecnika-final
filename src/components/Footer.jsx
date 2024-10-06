import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import BitLogo from "../assets/mesra_logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#17252a] text-white py-4 sm:py-6 px-2 sm:px-4 md:px-8 font-bold">
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between">
          <div className="w-1/3 text-left space-y-1 sm:space-y-3">
            <h3 className="text-lg sm:text-2xl md:text-3xl">TECHNIKA 2024</h3>
            <p className="text-xs sm:text-sm md:text-base">
              INNOVATING TODAY, SUSTAINING TOMORROW
            </p>
            <div className="flex flex-col items-start mt-1 sm:mt-3">
              <span className="text-xs sm:text-sm md:text-md mb-1 sm:mb-2">
                FOLLOW US ON
              </span>
              <div className="flex">
                <a
                  href="https://www.youtube.com/@technikabitp "
                  target="_blank"
                  className="text-white hover:text-red-500 mr-2 sm:mr-4 transition-colors duration-300"
                >
                  <FaYoutube
                    size={16}
                    className="sm:w-5 sm:h-5 md:w-7 md:h-7"
                  />
                </a>
                <a
                  href="https://www.instagram.com/technika_bitp/"
                  target="_blank"
                  className="text-white hover:text-pink-500 transition-colors duration-300"
                >
                  <FaInstagram
                    size={16}
                    className="sm:w-5 sm:h-5 md:w-7 md:h-7"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="w-1/3 flex flex-col items-center justify-center">
            <img
              src={BitLogo}
              alt="BIT Mesra Logo"
              className="w-12 sm:w-16 md:w-28 h-auto object-contain mb-1 sm:mb-3 pointer-events-none"
            />
            <p className="md:block hidden text-sm text-gray-400">
              &copy; 2024 TECHNIKA. All Rights Reserved.
            </p>
          </div>

          <div className="w-1/3 text-right space-y-0 sm:space-y-1 md:space-y-2">
            <p className="text-[10px] sm:text-xs md:text-sm">
              Birla Institute of Technology
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm">
              Patna, Bihar 800014, India
            </p>
            <a
              href="mailto:technika@bitmesra.ac.in"
              className="flex justify-end items-center mt-1 sm:mt-3 hover:text-gray-300 transition-colors duration-300"
            >
              <FaEnvelope
                size={12}
                className="sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2"
              />
              <span className="text-[10px] sm:text-xs md:text-sm">
                technika@bitmesra.ac.in
              </span>
            </a>
            <div className="flex justify-end items-center mt-0 sm:mt-1">
              <FaPhone
                size={12}
                className="sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2"
              />
              <span className="text-[10px] sm:text-xs md:text-sm">
                +91 8252624667
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
