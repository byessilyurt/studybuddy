import Onboarding from "../images/onboarding.png";
import { FcGoogle } from "react-icons/fc";

function Auth() {
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
          <button className="w-40 flex justify-between items-center flex-1 text-md md:text-xl bg-white hover:bg-gray-300 text-black font-medium py-2 px-6 rounded-lg m-2 ">
            <p>Sign up</p>
            <FcGoogle />
          </button>
          <button className="w-40 flex justify-between items-center flex-1 text-md md:text-xl bg-white hover:bg-gray-300 text-black font-medium py-2 px-6 rounded-lg m-2">
            <p>Log in</p>
            <FcGoogle />
          </button>
        </div>
        <p className="text-center text-gray-500 mt-4">Copyright @2022</p>
      </div>
    </div>
  );
}

export default Auth;
