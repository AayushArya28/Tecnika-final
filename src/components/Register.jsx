import { useEffect, useRef, useState } from "react";
import Astro from "../assets/astro.png";
import { Fade } from "react-awesome-reveal";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendEmailVerification } from "firebase/auth";
import { app, db } from "../firebase";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  // const isPasswordValid = (password) => {
  //   if (!password) {
  //     return false;
  //   } else {
  //     const regexPattern =
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
  //     return validator.matches(password, regexPattern);
  //   }
  // };

  const CreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const formObj = Object.fromEntries(formData.entries());
    const { name,
      collegeName,
      contactNumber,
      email,
      password
    } = formObj;

    try {
      // if (!isPasswordValid(password)) {
      //   return toast.error(
      //     "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      //   );
      // }
      if (password.trim().length < 8) {
        return toast.error(
          "Password must be atleast 8 characters long."
        )
      }

      try {
        if (isNaN(Number(contactNumber))) throw Error();
        if (contactNumber.trim().length !== 10) throw Error();
      } catch {
        return toast.error(
          "The contact number should be a valid 10 digit number."
        )
      }

      const createUser = await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password
      );

      await sendEmailVerification(createUser?.user);
      toast.success("Please check your email for verification!");
      let interval = setInterval(async () => {
        if (auth.currentUser.emailVerified) {
          clearInterval(interval);
          localStorage.setItem(
            "authUser",
            JSON.stringify({
              email: createUser?.user.email,
              uid: createUser?.user.uid,
            })
          );
          const userRef = doc(db, "registered_users", createUser.user.uid);

          await setDoc(userRef, {
            userId: createUser.user.uid,
            email: email.toLowerCase(),
            name: name.trim(),
            collegeName: collegeName.trim(),
            contactNumber: contactNumber.trim(),
            dateCreated: new Date(),
          });
          console.log(auth);
          window.location.href = "/";
        }
        await auth.currentUser.reload();
      }, 2000);
    } catch (error) {
      if (
        error.message.includes("Firebase: Error (auth/email-already-in-use).")
      ) {
        toast.error("Email already in use");
      }
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url(/login-mobile.jpg)] sm:bg-[url(/login-pc.jpg)] bg-cover bg-center bg-no-repeat flex items-center justify-center sm:block">
      <div className="container mx-auto p-4 sm:p-8 md:p-12 lg:p-20 overflow-hidden min-h-screen sm:min-h-0">
        <div className="flex items-center justify-center sm:justify-end w-full">
        <div className="w-full max-w-md scale-100 sm:scale-90 md:scale-100 sm:translate-y-0 lg:translate-x-0 mt-16 sm:mt-0">
            <div className="bg-[#17252A] rounded-lg shadow-lg p-8">
              <h1 className="text-center text-4xl font-bold text-[#FEFFFF] mb-8">
                Register
              </h1>
              <form
                ref={formRef}
                className="flex flex-col gap-4 font-Default text-lg"
                onSubmit={CreateUser}
              >
                {/* Name input */}
                <div>
                  <label htmlFor="name" className="text-[#DEF2F1] mb-1 block">Name</label>
                  <input
                    className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                    type="text"
                    placeholder="Enter name"
                    required
                    name="name"
                    id="name"
                  />
                </div>

                {/* College Name input */}
                <div>
                  <label htmlFor="collegeName" className="text-[#DEF2F1] mb-1 block">College Name</label>
                  <input
                    className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                    type="text"
                    placeholder="Enter college name"
                    required
                    name="collegeName"
                    id="collegeName"
                  />
                </div>

                {/* Contact Number input */}
                <div>
                  <label htmlFor="contactNumber" className="text-[#DEF2F1] mb-1 block">Contact Number</label>
                  <input
                    className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                    type="tel"
                    placeholder="Enter contact number"
                    required
                    name="contactNumber"
                    id="contactNumber"
                  />
                </div>

                {/* Email input */}
                <div>
                  <label htmlFor="email" className="text-[#DEF2F1] mb-1 block">Email</label>
                  <input
                    className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                    type="email"
                    placeholder="Enter email"
                    required
                    name="email"
                    id="email"
                  />
                </div>

                {/* Password input */}
                <div>
                  <label htmlFor="password" className="text-[#DEF2F1] mb-1 block">Password</label>
                  <div className="relative">
                    <input
                      className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                      type={type}
                      placeholder="Enter password"
                      required
                      name="password"
                      id="password"
                    />
                    <span
                      className="absolute top-3 right-3 cursor-pointer"
                      onClick={handleToggle}
                    >
                      <Icon icon={icon} size={20} className="text-[#3AAFA9]" />
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  className={`
                    text-[#FEFFFF] bg-[#2B7A78] hover:bg-[#3AAFA9] transition-colors duration-300 rounded h-10 font-Default w-full text-center mt-4
                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </form>

              {/* Already registered? Log in now link */}
              <p className="text-center text-[#DEF2F1] mt-4">
                Already registered?{" "}
                <Link to="/login" className="underline text-[#3AAFA9]">
                  Log in now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Register;