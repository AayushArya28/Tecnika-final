import React, { useState, useEffect, useCallback } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import WorkshopCard from "./WorkshopCard";
import CardContainer from "./CardContainer";
import Eco from "../assets/eco.png";
import "../general.css";

const WorkshopDetails = ({ title, description, formLink, pricing }) => {
  return (
    <div className="bg-white p-6 border-4 border-green-600 text-black rounded-lg max-w-xl mx-auto mt-8 shadow-lg z-20">
      <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
      <p className="text-lg mb-4 text-center">{description}</p>
      <p className="text-md sm:text-lg font-semibold text-center mb-4">Price: {`₹ ${pricing}`}</p>
      <div className="flex justify-center">
        <a
          href={formLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105 duration-300"
        >
          Register Now
        </a>
      </div>
    </div>
  );
};

const Workshops = () => {
  const [workshopsData, setWorkshopsData] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchWorkshops = async () => {
      const workshopsCollection = collection(db, 'workshop');
      const workshopDocs = await getDocs(workshopsCollection);
      const workshopsList = workshopDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkshopsData(workshopsList);
    };

    fetchWorkshops();
  }, []);

  const handleWorkshopClick = useCallback((workshop) => {
    setSelectedWorkshop(workshop);
    setTimeout(() => {
      const detailsSection = document.getElementById("workshop-details");
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 0);
  }, []);

  return (
    <div className="relative container mx-auto overflow-hidden w-full">
      <h1 className="text-4xl font-bold text-white text-center pt-6 z-10 relative">
        Our Workshops
      </h1>

      <figure className="w-full h-full absolute inset-0 z-0">
        <img
          src={Eco}
          alt="Technika"
          className="object-cover w-full h-full opacity-60"
        />
      </figure>

      <CardContainer>
        {workshopsData.map((workshop, index) => (
          <div
            key={workshop.id}
            className={`transform ${animate ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              } transition-all duration-500 ease-out`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <WorkshopCard
              key={workshop.id}
              image={workshop.img}
              title={workshop.name}
              description={workshop.desc}
              pricing={workshop.pricing}
              onClick={() => handleWorkshopClick(workshop)}
            />
          </div>
        ))}
      </CardContainer>

      {selectedWorkshop && (
        <div id="workshop-details" className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-black/[0.5] fixed inset-0" onClick={() => setSelectedWorkshop(null)}></div>
          <WorkshopDetails
            title={selectedWorkshop.name}
            description={selectedWorkshop.desc}
            formLink={selectedWorkshop.formLink}
            pricing={selectedWorkshop.pricing}
          />
        </div>
      )}
    </div>
  );
};

export default Workshops;
