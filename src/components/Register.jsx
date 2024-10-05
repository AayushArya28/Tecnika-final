import { useEffect, useRef, useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendEmailVerification } from "firebase/auth";
import { app, db } from "../firebase";

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

  const isPasswordValid = (password) => {
    if (!password) {
      return false;
    } else {
      const regexPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
      return validator.matches(password, regexPattern);
    }
  };

  const CreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const formObj = Object.fromEntries(formData.entries());
    const {
      name,
      email,
      phone_Number,
      college,
      address,
      password,
      gender,
      year,
    } = formObj;

    try {
      if (!isPasswordValid(password)) {
        return toast.error(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      }
      if (gender === "none") {
        throw Error("Please select your gender");
      }
      if (year === "none") {
        throw Error("Please select your year");
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
            phone_Number: phone_Number.trim(),
            college: college,
            address: address,
            gender: gender,
            year: year,
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
      // toast.error(error.message);
      // console.log(error.message);
      // toast.error();
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

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigate("/");
  //     }
  //   });
  // }, []);

  return (
    <div>
      <div className="container mx-auto p-20 overflow-hidden">
        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-md">
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

                {/* Phone Number input */}
                <div>
                  <label htmlFor="phone_Number" className="text-[#DEF2F1] mb-1 block">Phone Number</label>
                  <input
                    className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                    type="tel"
                    placeholder="Enter phone number"
                    required
                    name="phone_Number"
                    id="phone_Number"
                    maxLength={10}
                    minLength={10}
                  />
                </div>

                {/* Gender select */}
                <div>
                  <label htmlFor="gender" className="text-[#DEF2F1] mb-1 block">Gender</label>
                  <select
                    name="gender"
                    className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                    required
                  >
                    <option value="none">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others/Not Specified</option>
                  </select>
                </div>

                {/* Year select */}
                <div>
                  <label htmlFor="year" className="text-[#DEF2F1] mb-1 block">Year</label>
                  <select
                    name="year"
                    className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                    required
                  >
                    <option value="none">Select Year</option>
                    <option value="first">1st</option>
                    <option value="second">2nd</option>
                    <option value="third">3rd</option>
                    <option value="fourth">4th</option>
                  </select>
                </div>

                {/* College input */}
                <div>
                  <label htmlFor="college" className="text-[#DEF2F1] mb-1 block">College</label>
                  <input
                    className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                    type="text"
                    placeholder="Enter college name"
                    required
                    name="college"
                    id="college"
                  />
                </div>

                {/* Address input */}
                <div>
                  <label htmlFor="address" className="text-[#DEF2F1] mb-1 block">Address</label>
                  <input
                    className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                    type="text"
                    placeholder="Enter address"
                    required
                    name="address"
                    id="address"
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