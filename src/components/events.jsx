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
      const collections = ['technical','Cultural','fun', 'esports'];
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

  const categories = ['technical','Cultural','fun', 'esports'];

  return (
    <div className="relative container mx-auto overflow-hidden w-full px-4 py-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8 z-10 relative">
        Our Events
      </h1>

      <figure className="w-full h-full absolute inset-0 z-0">
        <img
          src={Eco}
          alt="Technika"
          className="object-cover w-full h-full opacity-60"
        />
      </figure>

      {/* Search input */}
      <div className="relative z-10 mx-auto max-w-md mb-8">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 text-gray-900 bg-white bg-opacity-75 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {searchTerm === "" ? (
        categories.map(category => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className="flex flex-wrap -mx-2">
              {getEventsByCategory(category).map((event) => (
                <div key={event.id} className="w-full sm:w-1/2 lg:w-1/2 px-2 mb-4">
                  <EventCard
                    img={event.img}
                    name={event.name}
                    desc={event.desc}
                    pricing={event.pricing}
                    formLink={event.formLink}
                  />
                </div>
              ))}
            </div>
            {getEventsByCategory(category).length === 0 && (
              <p className="text-white text-center mt-2">No events found in this category.</p>
            )}
          </div>
        ))
      ) : (
        <div className="flex flex-wrap -mx-2 relative z-10">
          {filteredEvents.map((event) => (
            <div key={event.id} className="w-full sm:w-1/2 lg:w-1/2 px-2 mb-4">
              <EventCard
                img={event.img}
                name={event.name}
                desc={event.desc}
                pricing={event.pricing}
                formLink={event.formLink}
              />
            </div>
          ))}
        </div>
      )}

      {/* Remove the selectedEvent rendering and onClick functionality */}
    </div>
  );
};

export default Events;
