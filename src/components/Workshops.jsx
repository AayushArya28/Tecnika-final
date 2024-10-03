import React, { useState, useRef } from "react";
import WorkshopCard from "./WorkshopCard";
import Eco from "../assets/eco.png";

const workshopsData = [
  {
    id: 1,
    title: "Generative AI Workshop",
    image: "/images/web-dev.jpg", 
    description: "Explore the innovative world of artificial intelligence in this hands-on workshop focused on Generative AI. Learn about neural networks, machine learning models, and how AI can be used to generate creative content, from art and music to text and more. Ideal for those passionate about AI innovation.",
    // specifications: "Duration: 3 days | Level: Beginner | Tools: VS Code, GitHub",
    formLink: "https://forms.gle/web-dev-workshop", 
  },
  {
    id: 2,
    title: "Basic Trading Workshop",
    image: "/images/ml-workshop.jpg", 
    description: "Learn the fundamentals of stock market trading and investment strategies in this beginner-friendly workshop. Gain insights into financial markets, trading platforms, and techniques to analyse stocks, making you ready to start your trading journey with confidence.",
    // specifications: "Duration: 5 days | Level: Intermediate | Tools: Jupyter Notebook, TensorFlow",
    formLink: "https://forms.gle/ml-workshop", 
  },
  {
    id: 3,
    title: "Reel making Workshop",
    image: "/images/ui-ux.jpg", 
    description: "Unlock your creativity with our hands-on Reel Making Workshop! Learn the essentials of storytelling, shooting, and editing short videos for platforms like Instagram and TikTok. From ideation to execution, you'll discover techniques to make visually captivating reels that stand out. Perfect for aspiring content creators or anyone looking to enhance their social media presence!",
    // specifications: "Duration: 2 days | Level: Beginner | Tools: Figma, Adobe XD",
    formLink: "https://forms.gle/ui-ux-workshop", 
  },
  {
    id: 4,
    title: "Drone Workshop",
    image: "/images/ui-ux.jpg", 
    description: "Dive into the world of drones in this interactive workshop. Learn about UAV design, flight control, and drone applications in various industries. Whether you are an aspiring drone pilot or an enthusiast, this workshop will provide hands-on experience in flying and maintaining drones.",
    // specifications: "Duration: 2 days | Level: Beginner | Tools: Figma, Adobe XD",
    formLink: "https://forms.gle/ui-ux-workshop", 
  },
  {
    id: 5,
    title: "MATLAB",
    image: "/images/ui-ux.jpg", 
    description: "Join our hands-on MATLAB workshop to learn the essentials of numerical computing, data analysis, and programming. You'll explore the MATLAB interface, basic coding concepts, data visualization, and real-world applications across various fields. Ideal for students, professionals, and researchers, this workshop equips you with the skills to apply MATLAB in academic and industry projects. Unlock MATLAB's potential and elevate your computational expertise!",
    // specifications: "Duration: 2 days | Level: Beginner | Tools: Figma, Adobe XD",
    formLink: "https://forms.gle/ui-ux-workshop", 
  },
  {
    id: 6,
    title: "UI/UX Design Workshop",
    image: "/images/ui-ux.jpg",
    description: "Understand design principles and build interactive prototypes using Figma.",
    specifications: "Duration: 2 days | Level: Beginner | Tools: Figma, Adobe XD",
    formLink: "https://forms.gle/ui-ux-workshop", 
  },
];

// WorkshopDetails component for displaying detailed information about the selected workshop
const WorkshopDetails = ({ title, description, specifications, formLink }) => {
  return (
    <div className="bg-gradient-to-r from-green-300 via-blue-400 to-teal-600 p-6 border-4 border-green-600 text-white rounded-lg relative z-10 max-w-xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
      <p className="text-lg mb-4 text-center">{description}</p>
      <p className="text-sm mb-6 text-center">{specifications}</p>

      {/* Centered Register Now Button */}
      <div className="flex justify-center">
        <a
          href={formLink} // Check if the link is properly passed
          target="_blank" // Opens in a new tab
          rel="noopener noreferrer" // Security attribute to prevent malicious attacks
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105 duration-300"
        >
          Register Now
        </a>
      </div>
    </div>
  );
};

// Main Workshops component to display all workshops
const Workshops = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null); // State to track the selected workshop
  const registerButtonRef = useRef(null); // Reference to the Register button section

  const handleWorkshopClick = (workshop) => {
    setSelectedWorkshop(workshop); // Set the selected workshop when clicked

    // If there is a Register button reference, make it visible but don't scroll away
    if (registerButtonRef.current) {
      registerButtonRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scrolling effect
        block: "nearest", // Don't scroll away from the current section
      });
    }
  };

  return (
    <div className="relative container h-full mx-auto overflow-hidden w-full">
      <h1 className="text-4xl font-bold text-white text-center pt-6 z-10 relative">Our Workshops</h1>

      {/* Background image for the section */}
      <figure className="w-full h-full absolute inset-0 z-0">
        <img src={Eco} alt="Technika" className="object-cover w-full h-full opacity-60" />
      </figure>

      {/* Grid layout for workshop cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        {workshopsData.map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            image={workshop.image}
            title={workshop.title}
            description={workshop.description}
            onClick={() => handleWorkshopClick(workshop)} // Set the selected workshop and handle click
          />
        ))}
      </div>

      {/* Display selected workshop details with register button */}
      {selectedWorkshop && (
        <div ref={registerButtonRef}> {/* Add a ref here */}
          <WorkshopDetails
            title={selectedWorkshop.title}
            description={selectedWorkshop.description}
            specifications={selectedWorkshop.specifications}
            formLink={selectedWorkshop.formLink} // Ensure this link is passed correctly
          />
        </div>
      )}
    </div>
  );
};

export default Workshops;
