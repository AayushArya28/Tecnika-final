import React, { useState, useEffect, useCallback } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import WorkshopCard from "./WorkshopCard";
import CardContainer from "./CardContainer";
import Eco from "../assets/eco.png";
import "../general.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // React Router for navigation

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
  const [loading, setLoading] = useState(true); // Loading state for authentication check
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state
  const navigate = useNavigate();

  // Check user authentication status
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsAuthenticated(true);
      } else {
        // User is not logged in, redirect to login
        navigate("/login");
      }
      setLoading(false); // Finish loading after auth check
    });

    return () => unsubscribe(); // Clean up auth listener on component unmount
  }, [navigate]);

  // Delay animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch workshops from Firebase Firestore
  useEffect(() => {
    const fetchWorkshops = async () => {
      const workshopsCollection = collection(db, "workshop");
      const workshopDocs = await getDocs(workshopsCollection);
      const workshopsList = workshopDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWorkshopsData(workshopsList);
    };
    fetchWorkshops();
  }, []);

  // Handle click event for workshop selection
  const handleWorkshopClick = useCallback((workshop) => {
    setSelectedWorkshop(workshop);
    setTimeout(() => {
      const detailsSection = document.getElementById("workshop-details");
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 0);
  }, []);

  // Show loading while checking auth state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Main render section for workshops if user is authenticated
  return (
    <div className="relative container mx-auto overflow-hidden w-full">
      <h1 className="text-4xl font-bold text-white text-center pt-6 z-10 relative font-Default">
        OUR WORKSHOPS
      </h1>

      <figure className="w-full h-full absolute inset-0 z-0">
        <img src={Eco} alt="Technika" className="object-cover w-full h-full opacity-60" />
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
