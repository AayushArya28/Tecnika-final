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
} from "firebase/auth";
import { app } from "../firebase";

// import { createClient } from "@supabase/supabase-js";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const form_ref = useRef();
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const formData = new FormData(form_ref.current);
  const formObj = Object.fromEntries(formData.entries());
  const { email, password } = formObj;

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    handleToggle();
    // console.log(e);
    const email = e.target[0].value;
    const password = e.target[1].value;

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
    <div>
      <div className="container mx-auto p-20 overflow-hidden">
        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-md">
            <div className="bg-[#17252A] rounded-lg shadow-lg p-8">
              <h1 className="text-center text-4xl font-bold text-[#FEFFFF] mb-8">
                Login
              </h1>
              <form
                action="#"
                className="flex flex-col gap-4 font-Default text-lg"
                ref={form_ref}
                onSubmit={LoginUser}
              >
                <div>
                  <label htmlFor="email" className="text-[#DEF2F1] mb-1 block">Email</label>
                  <input
                    className="w-full h-10 border border-[#3AAFA9] bg-[#17252A] focus:outline-none focus:border-[#2B7A78] text-[#FEFFFF] px-3 py-2 rounded"
                    type="email"
                    placeholder="Enter email"
                    required
                    name="email"
                    autoComplete="email"
                    id="email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="text-[#DEF2F1] mb-1 block">Password</label>
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
                  {loading ? "Loading..." : "Login"}
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

export default Login;
