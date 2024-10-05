import Eco from "../assets/eco.png";
import ContactCard from "./ContactCard";
import Proptypes from "prop-types";
import { Fade } from "react-awesome-reveal";

const Contact = () => {
  const contacts = [
    {
      key: "1",
      image: "/members/Suryansh.jpg",
      name: "Suryansh Sinha",
      position: "General Secretary",
      phone: "+91 8252624667",
      insta: "https://www.instagram.com/srivastava_0302_/",
    },
    {
      key: "2",
      image: "/members/AryanArya.png",
      name: "Aryan NK Arya",
      position: "Treasury Head",
      phone: "+91 7462077127",
      insta: "https://www.instagram.com/aryan_n_k_arya"
    },
    {
      key: "3",
      image: "/members/AsmanKumari.jpg",
      name: "Asman Kumari",
      position: "Event Head",
      phone: "+91 7857809775",
      insta: "https://www.instagram.com/asu_753/",
    },
    {
      key: "4",
      image: "/members/PiyushJha.jpg",
      name: "Piyush Kumar Jha",
      position: "Sponsorship Head",
      phone: "+91 7970570528",
      insta: "https://www.instagram.com/piyushkumar_jha26/",
    },
    {
      key: "5",
      image: "/members/PremKumar.jpg",
      name: "Prem Kumar Singh",
      position: "Press and Media Head",
      phone: "+91 7464025690",
      insta: "https://www.instagram.com/prem11012004/",
    },
    {
      key: "6",
      image: "/members/AdarshRaj.jpg",
      name: "Aadarsh Raj Alok",
      position: "Publicity Head",
      phone: "+91 7079901930",
      insta: "https://www.instagram.com/su.bh2807/",
    },
    {
      key: "7",
      image: "/members/BalaSir.jpg",
      name: "Balajee",
      position: "Cultural Head",
      phone: "+91 9693650110",
    }
  ];

  return (
    <div className="relative container h-full mx-auto overflow-hidden w-full">
      {/* Title */}
      <h1 className="text-4xl font-bold text-white text-center pt-6 z-10 relative">
        CONTACT
      </h1>

      {/* Background Image */}
      <figure className="w-full h-full absolute inset-0">
        <img
          src={Eco}
          alt=""
          className="object-cover w-full h-full opacity-60"
        />
      </figure>

      {/* Cards Section */}
      <div className="py-10 flex justify-center items-center flex-wrap gap-10 z-10 relative">
        {contacts?.map((contact) => (
          <Fade
            key={contact?.key}
            duration={600} // Uniform duration for all animations
            triggerOnce={true}
            direction="up"
          >
            <ContactCard
              image={contact?.image}
              name={contact?.name}
              email={contact?.email}
              phone={contact?.phone}
              linkedin={contact?.linkedin}
              insta={contact?.insta}
              position={contact?.position}
            />
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default Contact;

Contact.propTypes = {
  contacts: Proptypes.array,
};
