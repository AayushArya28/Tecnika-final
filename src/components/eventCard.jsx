import React from "react";
import { Link } from "react-router-dom";
import "../general.css";

const EventCard = ({
  img,
  name,
  desc,
  pricing,
  formLink,
  onClick,
  eventType,
}) => {
  let eventCat;

  switch (eventType) {
    case "3":
      eventCat = "Both Team and Solo";
      break;
    case "2":
      eventCat = "Team";
      break;
    default:
      eventCat = "Solo";
  }
  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4 sm:p-6 border-2 border-gray-700 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out w-full mb-8"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image section with fallback */}
        <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-6">
          {img ? (
            <img
              src={img}
              alt={name}
              className="w-full h-48 sm:h-full object-cover transition-opacity duration-300 hover:opacity-80 rounded-lg aspect-square"
            />
          ) : (
            <div className="w-full h-48 sm:h-full bg-gray-700 flex items-center justify-center rounded-lg">
              <span className="text-white text-lg">Image not available</span>
            </div>
          )}
          {/* Gradient overlay for hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-80 transition-opacity duration-300 rounded-lg"></div>
        </div>

        {/* Content section */}
        <div className="flex-1 text-white">
          <h3 className="text-xl sm:text-2xl font-extrabold mb-2">{name}</h3>
          <p className="text-sm sm:text-md text-gray-300 mb-4">{desc}</p>
          <p className="text-md sm:text-lg font-semibold text-gray-300 mb-4">{`₹ ${pricing} ${
            eventCat !== "Solo" ? "per person" : ""
          }`}</p>
          <p className="text-sm sm:text-md text-gray-300 mb-4">
            Registration Type:
            <span className="text-md sm:text-md font-semibold text-gray-300 mb-4">
              {" "}
              {eventCat}
            </span>
          </p>

          <Link target="_blank" rel="noopener noreferrer" to={formLink}>
            <button className="bg-white text-black w-full px-4 sm:px-6 py-2 rounded-full border-2 border-black hover:bg-[#af3a40] hover:text-white hover:border-[#af3a40] transition-all duration-300">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
