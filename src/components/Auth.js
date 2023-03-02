import Onboarding from "../images/onboarding.png";

import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle, signUpWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-200">
      <div className="flex items-center p-4 border-2 border-solid">
        <h1 className="text-xl font-extrabold">StudyBuddy</h1>
      </div>
      <div className="flex flex-col items-center justify-start min-h-screen w-full mt-24">
        <img
          src={Onboarding}
          className="w-1/3 md:w-1/5 rounded-lg shadow-lg"
          alt="Auth page"
        />
        <div className="flex flex-col items-center mt-10 sm:w-3/4 md:w-1/2 lg:w-1/3">
          <button
            className="flex justify-between gap-x-2 items-center flex-1 text-md md:text-xl bg-white hover:bg-gray-300 text-black font-medium py-2 px-6 rounded-lg m-2"
            onClick={handleSignInWithGoogle}
          >
            <p>Continue with</p>
            <FcGoogle />
          </button>
        </div>
        <a
          className="text-center text-gray-500 mt-4"
          href="https://github.com/byessilyurt"
          target="_blank"
        >
          Copyright @2022
        </a>
      </div>
    </div>
  );
}

export default Auth;
