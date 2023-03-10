import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IoIosClose, IoIosMenu, IoIosLogOut } from "react-icons/io";
import { logout } from "../firebase";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handlelogout = async () => {
    await logout();
    navigate("/auth");
  };
  return (
    <>
      <button
        className="md:hidden px-3 py-2 rounded-lg text-slate-500 text-3xl opacity-75"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoIosMenu />
      </button>
      <div
        className={`fixed inset-0 transition-all duration-500 ${
          isOpen ? "z-20" : "-z-10"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute z-10 inset-0 bg-gray-600 opacity-75 ${
            isOpen ? "visible" : "invisible"
          }`}
        ></div>
      </div>
      <div
        className={`z-40 absolute inset-y-0 left-0 w-64 transition-all duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 rounded-lg shadow-xl p-4 bg-slate-100`}
      >
        <button
          className="fixed right-2 md:invisible px-3 py-2 rounded-lg text-red-500 text-2xl hover:bg-gray-300"
          onClick={() => setIsOpen(false)}
        >
          <IoIosClose />
        </button>
        <nav>
          <a
            href="#"
            className="block p-2 w-3/4 text-indigo-500 hover:bg-indigo-100"
          >
            Study Plans
          </a>
          <a
            href="#"
            className="block p-2 w-3/4 text-indigo-500 hover:bg-indigo-100"
          >
            Profile
          </a>
          <a
            onClick={handlelogout}
            className="block fixed cursor-pointer w-auto text-2xl bottom-4 p-2 text-red-500 hover:bg-red-100"
          >
            <IoIosLogOut />
          </a>
        </nav>
      </div>
    </>
  );
};
export default SideBar;
