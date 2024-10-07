import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

const Account = () => {
  const navigate = useNavigate();

  const LogoutUser = () => {
    signOut(auth);
    localStorage.removeItem("authUser");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-white font-Default text-2xl mb-4 md:mb-8">
        Account
      </div>
      <div className="text-white font-Default text-lg md:text-2xl mb-4 md:mb-8 px-4 break-words text-center">
        Sign in as <span>{auth?.currentUser?.email}</span>
      </div>
      <button
        className="text-black bg-white hover:bg-[#af3a40]/80 nav_Box_shadow h-10 font-Default w-2/3 md:w-1/6 text-center font-bold rounded-full hover:text-white transition-all duration-300"
        type="button"
        onClick={LogoutUser}
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
