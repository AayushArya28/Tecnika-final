import Icon from "react-icons-kit";
import { instagram } from "react-icons-kit/fa/instagram";
import { linkedinSquare } from "react-icons-kit/fa/linkedinSquare";
import PropTypes from "prop-types";

const ContactCard = ({ image, name, email, phone, insta, linkedin, position }) => {
  return (
    <div className="relative">
      <div className="w-[285px] h-[380px] md:w-[380px] bg-[#17252A] p-6 border-2 border-[#2B7A78] rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out mx-auto font-Default tracking-wider flex flex-col justify-between">
        {/* Profile Section */}
        <div className="flex justify-center items-center gap-4 w-full">
          <figure className="overflow-hidden w-32 h-32 rounded-full border-4 border-[#3AAFA9]">
            <img
              className="object-cover w-full h-full rounded-full transition-transform duration-300 hover:scale-110"
              src={image}
              alt={name}
            />
          </figure>
        </div>

        {/* Name and Position */}
        <div className="text-center mt-3">
          <p className="text-2xl font-bold text-[#FEFFFF] break-words">{name}</p>
          {position && (
            <p className="text-lg font-semibold text-[#3AAFA9] mt-1">{position}</p>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2 mt-2 text-lg font-bold text-[#DEF2F1] text-center break-words">
          <p>{phone}</p>
          <p className="text-sm">{email}</p>
        </div>

        {/* Social Links */}
        {
          !!insta && (
            <div className="flex justify-around mt-5">
              <a
                href={insta}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform transform hover:scale-125"
              >
                <Icon icon={instagram} size={40} className="text-[#3AAFA9] hover:text-[#DEF2F1]" />
              </a>

            </div>
          )
        }
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  linkedin: PropTypes.string,
  insta: PropTypes.string,
  position: PropTypes.string,
};

export default ContactCard;
