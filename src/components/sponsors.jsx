import React from "react";
import "../general.css";
import "../font.css";

const Sponsors = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8 font-Default">Our Sponsors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <img src="sponsor1.png" alt="Sponsor 1" className="w-full h-auto" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <img src="sponsor2.png" alt="Sponsor 2" className="w-full h-auto" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <img src="sponsor3.png" alt="Sponsor 3" className="w-full h-auto" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <img src="sponsor4.png" alt="Sponsor 4" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
