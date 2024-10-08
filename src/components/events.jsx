import { db } from "../firebase";
import { useState, useEffect, useRef } from "react";
import EventCard from "./eventCard";
import Eco from "../assets/eco.png";
import "../general.css";
import { collection, getDocs } from "firebase/firestore";

const EventDetails = ({ name, desc, pricing, formLink }) => {
  return (
    <div className="bg-white bg-opacity-90 p-6 border-4 border-green-600 text-black rounded-lg max-w-xl mx-auto mt-8 shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">{name}</h2>
      <p className="text-lg mb-4 text-center">{desc}</p>
      <p className="text-lg mb-4 text-center font-semibold">{pricing}</p>
      <div className="flex justify-center">
        <a
          href={formLink}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105 duration-300"
        >
          Register Now
        </a>
      </div>
    </div>
  );
};

const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const registerButtonRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const collections = ['technical', 'Cultural', 'fun', 'esports'];
      const allEvents = [];

      for (const collectionName of collections) {
        const eventsCollection = collection(db, collectionName);
        const eventDocs = await getDocs(eventsCollection);
        const eventsList = eventDocs.docs.map(doc => ({ id: doc.id, ...doc.data(), category: collectionName }));
        allEvents.push(...eventsList);
      }

      setEventsData(allEvents);
    };

    fetchEvents();
  }, []);

  const filteredEvents = eventsData.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEventsByCategory = (category) => {
    return filteredEvents.filter(event => event.category === category);
  };

  const categories = ['technical', 'Cultural', 'fun', 'esports'];

  return (
    <div className="relative container mx-auto overflow-hidden w-full px-4 py-8 min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold text-white text-center mb-8 z-10 relative font-Default">
        OUR EVENTS
      </h1>

      <figure className="absolute inset-0 z-0">
        <img
          src={Eco}
          alt="Technika"
          className="object-cover w-full h-full opacity-60"
        />
      </figure>

      {/* Search input and Brochure button */}
      <div className="relative z-10 mx-auto w-full max-w-2xl mb-10 font-Default">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full flex-grow px-4 py-2 text-gray-900 bg-white bg-opacity-75 rounded-full sm:rounded--full  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <a
            href="./src/assets/EventBrochure-compressed.pdf" // Replace with the actual path to your brochure
            target="_blank"
            rel="noopener noreferrer"
            className="w-1/2 sm:w-auto px-4 py-2 bg-[#17252a] text-white font-semibold rounded-full sm:rounded-full hover:bg-[#af4a4a] transition-colors duration-300 text-center whitespace-nowrap "
          >
            Event Brochure
          </a>
        </div>
      </div>

      <div className="flex-grow z-10">
        {searchTerm === "" ? (
          categories.map(category => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {getEventsByCategory(category).map((event) => (
                  <div key={event.id}>
                    <EventCard
                      img={event.img}
                      name={event.name}
                      desc={event.desc}
                      pricing={event.pricing}
                      formLink={event.formLink}
                      eventType={event.eventType}
                    />
                  </div>
                ))}
              </div>
              {getEventsByCategory(category).length === 0 && (
                <p className="text-white text-center mt-2 font-Default">No events found in this category.</p>
              )}
            </div>
          ))
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {filteredEvents.map((event) => (
                <div key={event.id}>
                  <EventCard
                    img={event.img}
                    name={event.name}
                    desc={event.desc}
                    pricing={event.pricing}
                    formLink={event.formLink}
                    eventType={event.eventType}
                  />
                </div>
              ))}
            </div>
            {filteredEvents.length === 0 && (
              <p className="text-white text-center mt-4 text-xl font-Default">No events found matching your search.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
