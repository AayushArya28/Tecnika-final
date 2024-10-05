import { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  sendPasswordResetEmail, // Import added here
} from "firebase/auth";
import { app } from "../firebase";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate(); // Using the navigate hook to redirect
  const form_ref = useRef();
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  // Add state for email input
  const [email, setEmail] = useState("");

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const loginUser = await signInWithEmailAndPassword(
        auth,
        email?.toLowerCase(),
        password
      );

      if (loginUser.user.emailVerified === false) {
        await sendEmailVerification(loginUser.user);
        toast.error("Please verify your email first, Check your mail inbox!");
        let interval = setInterval(async () => {
          if (auth.currentUser.emailVerified) {
            clearInterval(interval);
            window.location.href = "/events";
          }
          await auth.currentUser.reload();
        }, 2000);
      } else {
        window.location.href = "/events";
      }
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          email: loginUser.user.email,
          uid: loginUser.user.uid,
        })
      );
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url(/login-mobile.jpg)] sm:bg-[url(/login-pc.jpg)] bg-cover bg-center bg-no-repeat flex items-center justify-center sm:block">
      <div className="container mx-auto p-4 sm:p-8 md:p-12 lg:p-20 overflow-hidden min-h-screen sm:min-h-0">
        <div className="flex items-center justify-center sm:justify-end w-full h-full">
          <div className="w-full max-w-md scale-100 sm:scale-90 md:scale-100 sm:translate-y-0 lg:translate-x-0 mt-16 sm:mt-0">
            <div className="bg-[#17252A] rounded-lg shadow-lg p-8">
              <h1 className="text-center text-3xl sm:text-4xl font-bold text-[#FEFFFF] mb-8">
                Login
              </h1>
              <form
                action="#"
                className="flex flex-col gap-4 font-Default text-base sm:text-lg"
                ref={form_ref}
                onSubmit={LoginUser}
              >
                <div>
                  <label htmlFor="email" className="text-[#DEF2F1] mb-1 block">
                    Email
                  </label>
                  <input
                    className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                    type="email"
                    placeholder="Enter email"
                    required
                    name="email"
                    autoComplete="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-[#DEF2F1] mb-1 block"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                      type={type}
                      placeholder="Password"
                      required
                      name="password"
                      autoComplete="current-password"
                      id="password"
                    />
                    <span
                      className="absolute top-1 right-3 cursor-pointer"
                      onClick={handleToggle}
                    >
                      <Icon
                        icon={icon}
                        size={20}
                        className="text-[#3AAFA9]"
                      />
                    </span>
                  </div>
                </div>

                <button
                  className={`text-[#FEFFFF] bg-[#2B7A78] hover:bg-[#3AAFA9] transition-colors duration-300 rounded h-10 font-Default w-full text-center mt-4
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </form>

              {/* Forgot Password Button */}
              <button
                onClick={handleForgotPassword}
                className="text-white hover:text-slate-300 mt-4 underline text-sm sm:text-base"
              >
                Forgot Password?
              </button>

              {/* Register Now Button */}
              <div className="text-center mt-6">
                <p className="text-white">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-[#3AAFA9] hover:text-[#FEFFFF] underline"
                  >
                    Register Now
                  </button>
                </p>
              </div>
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

export default Login;
