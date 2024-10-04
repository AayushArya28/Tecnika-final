import { useState, useRef, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import WorkshopCard from "./WorkshopCard";
import CardContainer from "./CardContainer";
import Eco from "../assets/eco.png";
import "../general.css";

const WorkshopDetails = ({ title, description, formLink }) => {
  return (
    <div className="bg-white bg-opacity-90 p-6 border-4 border-green-600 text-black rounded-lg max-w-xl mx-auto shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
      <p className="text-lg mb-4 text-center">{description}</p>
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
  const registerButtonRef = useRef(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      const workshopsCollection = collection(db, 'workshop');
      const workshopDocs = await getDocs(workshopsCollection);
      const workshopsList = workshopDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkshopsData(workshopsList);
    };

    fetchWorkshops();
  }, []);

  useEffect(() => {
    if (selectedWorkshop && registerButtonRef.current) {
      registerButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedWorkshop]);

  const handleWorkshopClick = (workshop) => {
    setSelectedWorkshop(workshop);
  };

  return (
    <div className="relative container mx-auto overflow-hidden w-full">
      <h1 className="text-4xl font-bold text-white text-center pt-6 z-10 relative">
        OUR WORKSHOPS
      </h1>

      <figure className="w-full h-full absolute inset-0 z-0">
        <img
          src={Eco}
          alt="Technika"
          className="object-cover w-full h-full opacity-60"
        />
      </figure>

      <CardContainer>
        {workshopsData.map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            image={workshop.image}
            title={workshop.name}
            description={workshop.desc}
            onClick={() => handleWorkshopClick(workshop)}
          />
        ))}
      </CardContainer>

      {selectedWorkshop && (
        <div ref={registerButtonRef} className="fixed inset-0 flex items-center justify-center z-20">
          <div className="bg-black bg-opacity-50 fixed inset-0" onClick={() => setSelectedWorkshop(null)}></div>
          <WorkshopDetails
            title={selectedWorkshop.name}
            description={selectedWorkshop.desc}
            formLink={selectedWorkshop.formLink}
          />
        </div>
      )}
    </div>
  );
};

export default Workshops;