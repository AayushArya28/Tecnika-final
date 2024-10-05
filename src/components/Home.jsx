import React from "react";
import "../general.css";
import "../index.css";
import { Link } from "react-router-dom";
import { Bounce, Fade } from "react-awesome-reveal";
import { getAuth } from "firebase/auth";
import ImageCarousel from "./ImageCarousel";
import ContactInfo from "./ContactInfo"; 
import "../font.css";
const Home = ({ logged }) => {
  const auth = getAuth();

  return (
    <section className="relative overflow-hidden container mx-auto min-h-screen lg:min-h-[1200px] p-4 flex flex-col justify-start bg-black lg:bg-[url('/bg2.png')] bg-[url('/mobile-home.png')] bg-no-repeat bg-contain">
      <div className="flex flex-col justify-center items-center text-center relative z-10 mt-24 sm:mt-24">
        <section className="text-primary flex flex-col justify-center items-center font-anime">
          <Bounce triggerOnce={true} delay={200}>
            <p className="text-sm sm:text-lg md:text-2xl tracking-wider sm:tracking-widest md:tracking-[0.8rem] font-anime mb-4 text-white font-bold">
              26-28th October
            </p>
          </Bounce>

          <Fade
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl tracking-wide sm:tracking-[0.7rem] md:tracking-[1rem] font-bold font-anime mb-4"
            triggerOnce={true}
            delay={500}
            cascade
            damping={0.2}
          >
            <span className="animate-text bg-gradient-to-r from-[#ff416c] via-[#ff4b2b] to-[#fbb034] text-transparent bg-clip-text">
              TECHNIKA 2024
            </span>
          </Fade>

          <Bounce triggerOnce={true} direction="up" delay={800}>
            <p className="text-base sm:text-2xl md:text-4xl tracking-normal sm:tracking-wider md:tracking-widest font-bold text-[#ceffd1] font-anime mt-4 animate-pulse">
              Innovating Today, Sustaining Tomorrow
            </p>
          </Bounce>
        </section>
        <div className="mt-10 mb-24">
          <Link to={!logged ? "/register" : "/events"}>
            <button className="w-28 h-10 sm:w-32 sm:h-12 md:w-40 md:h-12 text-base sm:text-xl md:text-2xl cursor-pointer font-bold transition duration-300 ease-in-out font-Default rounded-full bg-white text-black hover:bg-[#af3a40] hover:text-white shadow-lg transform hover:scale-110 active:scale-95">
              {!logged ? "Register" : "Explore"}
            </button>
          </Link>
        </div>
      </div>

      <div className="relative z-0 mt-12">
        <Fade triggerOnce={true} direction="up" delay={200}>
          <ImageCarousel />
        </Fade>
      </div>

      <div className="relative z-10 mt-16">
        <Fade triggerOnce={true} direction="up" delay={200}>
          <ContactInfo />
        </Fade>
      </div>
    </section>
  );
};

export default Home;
