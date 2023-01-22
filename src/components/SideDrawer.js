import React from "react";

const SideDrawer = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <button
        className="md:hidden px-3 py-2 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      <div
        className={`fixed inset-0 transition-all duration-300 ${
          isOpen ? "z-10" : "-z-10"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute inset-0 bg-gray-600 opacity-75 ${
            isOpen ? "visible" : "invisible"
          }`}
        ></div>
      </div>

      <div
        className={`z-20 absolute inset-y-0 left-0 w-64 transition-all duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-auto bg-white rounded-lg shadow-xl p-4`}
      >
        <button
          className="md:invisible px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
        <nav>
          <a href="#" className="block p-2 text-indigo-500 hover:bg-indigo-100">
            Home
          </a>
          <a href="#" className="block p-2 text-indigo-500 hover:bg-indigo-100">
            About
          </a>
          <a href="#" className="block p-2 text-indigo-500 hover:bg-indigo-100">
            Contact
          </a>
          <a href="#" className="block p-2 text-indigo-500 hover:bg-indigo-100">
            Logout
          </a>
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
