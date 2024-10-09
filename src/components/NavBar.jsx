import { Link } from "react-router-dom";
import BitLogo from "../assets/tech_logo.png";
import { useState } from "react";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";
import Icon from "react-icons-kit";
import { home } from 'react-icons-kit/feather/home';
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart';
import { award } from 'react-icons-kit/feather/award';
import { calendar } from 'react-icons-kit/feather/calendar';
import { bookOpen } from 'react-icons-kit/feather/bookOpen';
import { mail } from 'react-icons-kit/feather/mail';
import { info } from 'react-icons-kit/feather/info';
const NavBar = ({ logged }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full bg-[#17252a] shadow-lg z-50">
      <nav className="flex justify-between items-center py-3 px-6 sm:px-20 h-20">
        <div className="w-24">
          <Link to="/">
            <img
              src={BitLogo}
              alt="College Logo"
              className="w-full h-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </Link>
        </div>

        <div className="hidden md:flex gap-10 items-center justify-center mx-auto text-white">
          <Link
            to="/"
            className="flex flex-col items-center text-base hover:text-[#af3a40] transition-all duration-300 font-semibold font-Default"
          >
            <Icon icon={home} size={20} className="mb-1" />
            Home
          </Link>
          <a
            href="https://forms.gle/dhrRnoE1nJHX8zNw5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-base hover:text-[#af3a40] transition-all duration-300 font-semibold font-Default"
          >
            <Icon icon={shoppingCart} size={20} className="mb-1" />
            Merchandise
          </a>
          <Link
            to="/events"
            className="flex flex-col items-center text-base hover:text-[#af3a40] transition-all duration-300 font-semibold font-Default"
          >
            <Icon icon={calendar} size={20} className="mb-1" />
            Events
          </Link>
          <Link
            to="/workshops"
            className="flex flex-col items-center text-base hover:text-[#af3a40] transition-all duration-300 font-semibold font-Default"
          >
            <Icon icon={bookOpen} size={20} className="mb-1" />
            Workshops
          </Link>
          
          <Link
            to="/contact"
            className="flex flex-col items-center text-base hover:text-[#af3a40] transition-all duration-300 font-semibold font-Default"
          >
            <Icon icon={mail} size={20} className="mb-1" />
            Contact
          </Link>
          <Link
            to="/about"
            className="flex flex-col items-center text-base hover:text-[#af3a40] transition-all duration-300 font-semibold font-Default"
          >
            <Icon icon={info} size={20} className="mb-1" />
            About
          </Link>
        </div>

        <div className="hidden md:block">
          <Link
            to={logged ? "/account" : "/login"}
            className="text-black bg-white px-6 py-2 rounded-full border border-transparent hover:bg-[#af3a40] hover:text-white transition-all duration-300 font-bold font-Default shadow-lg"
          >
            {logged ? "Your Account" : "Login"}
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={handleOpen} aria-label="Menu Button" className="text-white">
            <Icon icon={menuOpen ? x : menu} size={30} />
          </button>
        </div>
      </nav>

      <div
        className={`${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden fixed top-0 right-0 w-full h-screen bg-[#17252a] text-white z-50 transition-transform duration-500 ease-in-out flex flex-col p-8 space-y-6 `}
      >
        <button
          onClick={handleOpen}
          className="self-end text-white text-2xl focus:outline-none"
          aria-label="Close Menu"
        >
          <Icon icon={x} size={30} />
        </button>
        <Link
          to="/"
          onClick={handleOpen}
          className="flex items-center text-white hover:text-[#af3a40] transition-all duration-300 text-2xl "
        >
          <Icon icon={home} size={24} className="mr-2" />
          Home
        </Link>
        <a
          href="https://forms.gle/dhrRnoE1nJHX8zNw5"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleOpen}
          className="flex items-center text-white hover:text-[#af3a40] transition-all duration-300 text-2xl"
        >
          <Icon icon={shoppingCart} size={24} className="mr-2" />
          Merchandise
        </a>
        <Link
          to="/events"
          onClick={handleOpen}
          className="flex items-center text-white hover:text-[#af3a40] transition-all duration-300 text-2xl"
        >
          <Icon icon={calendar} size={24} className="mr-2" />
          Events
        </Link>
        
        <Link
          to="/workshops"
          onClick={handleOpen}
          className="flex items-center text-white hover:text-[#af3a40] transition-all duration-300 text-2xl"
        >
          <Icon icon={bookOpen} size={24} className="mr-2" />
          Workshops
        </Link>
        <Link
          to="/contact"
          onClick={handleOpen}
          className="flex items-center text-white hover:text-[#af3a40] transition-all duration-300 text-2xl"
        >
          <Icon icon={mail} size={24} className="mr-2" />
          Contact
        </Link>
        <Link
          to="/about"
          onClick={handleOpen}
          className="flex items-center text-white hover:text-[#af3a40] transition-all duration-300 text-2xl"
        >
          <Icon icon={info} size={24} className="mr-2" />
          About
        </Link>
        <Link
          to={logged ? "/account" : "/login"}
          onClick={handleOpen}
          className="text-white bg-[#af3a40] py-2 px-6 rounded-md hover:brightness-110 transition-all duration-300 w-full text-center"
        >
          {logged ? "Your Account" : "Login"}
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
