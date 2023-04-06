import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IoIosClose, IoIosMenu, IoIosLogOut } from "react-icons/io";
import { logout } from "../firebase";
import { MatchContext } from "../context";

const SideBar = () => {
  const { matchId } = useContext(MatchContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef();

  const user = JSON.parse(localStorage.getItem("User"));
  const userDisplayName = user ? user.displayName : "";
  const userPhotoURL = user ? user.photoURL : "";
  const firstName = userDisplayName.split(" ")[0];

  const handlelogout = async () => {
    await logout(matchId);
    navigate("/auth");
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="md:hidden px-3 py-2 rounded-lg text-slate-500 text-3xl opacity-75"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoIosMenu />
      </button>
      <div
        ref={sidebarRef}
        className={`z-40 absolute inset-y-0 left-0 w-64 transition-all duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 rounded-lg shadow-xl p-4 bg-slate-100`}
      >
        <button
          className="fixed z-50 right-2 md:invisible px-3 py-2 rounded-lg text-red-500 text-2xl hover:bg-gray-300"
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
          <div className="fixed bottom-4 flex justify-between w-full px-4">
            <a
              href="#"
              className="flex items-center space-x-2 text-indigo-500 hover:bg-indigo-100 p-2 rounded-full"
            >
              <img
                src={userPhotoURL}
                alt={firstName}
                className="h-8 px-2 rounded-full"
              />
              <span>{firstName}</span>
            </a>
            <a
              onClick={handlelogout}
              className="cursor-pointer text-2xl p-4 mx-2 text-red-500 hover:bg-red-100 rounded-full"
            >
              <IoIosLogOut />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
