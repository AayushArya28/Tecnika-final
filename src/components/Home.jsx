import React from "react";
import "../general.css";
import "../index.css";
import { Link } from "react-router-dom";
import { Bounce, Fade } from "react-awesome-reveal";
import { getAuth } from "firebase/auth";
import ImageCarousel from "./ImageCarousel";

const Home = ({ logged }) => {
  const auth = getAuth();

  return (
    <section className="relative overflow-hidden container mx-auto min-h-screen p-4 sm:h-[800px] flex flex-col justify-center bg-black">
      <div className="flex flex-col justify-center items-center text-center relative z-10">
        <section className="text-primary flex flex-col justify-center items-center font-Default">
          <Bounce triggerOnce={true} delay={200}>
            <p className="text-sm sm:text-lg md:text-2xl tracking-wider sm:tracking-widest md:tracking-[0.8rem] font-Default mb-4 text-gray-400">
              26-28th October
            </p>
          </Bounce>

          <Fade
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl tracking-wide sm:tracking-[0.7rem] md:tracking-[1rem] font-bold font-Default mb-4"
            triggerOnce={true}
            delay={500}
            cascade
            damping={0.2}
          >
            <span className="animate-text bg-gradient-to-r from-[#ff416c] via-[#ff4b2b] to-[#fbb034] text-transparent bg-clip-text">
              TECHNIKA 2K24
            </span>
          </Fade>

          <Bounce triggerOnce={true} direction="up" delay={800}>
            <p className="text-base sm:text-2xl md:text-4xl tracking-normal sm:tracking-wider md:tracking-widest font-bold text-[#00e6e6] font-Default mt-4 animate-pulse">
              Innovating Today, Sustaining Tomorrow
            </p>
          </Bounce>
        </section>

        <div className="mt-10">
          <Link to={!logged ? "/register" : "/competitions"}>
            <button className="w-28 h-10 sm:w-32 sm:h-12 md:w-40 md:h-12 text-base sm:text-xl md:text-2xl cursor-pointer font-bold transition duration-300 ease-in-out font-Default rounded-full bg-white hover:bg-[#ff4b2b] hover:text-white shadow-lg transform hover:scale-110 active:scale-95">
              {!logged ? "Register" : "Explore"}
            </button>
          </Link>
        </div>
      </div>

      <div className="relative z-0 mt-12">
        <Fade triggerOnce={true} direction="up" delay={1000}>
          <ImageCarousel />
        </Fade>
      </div>
    </section>
  );
};

export default Home;
