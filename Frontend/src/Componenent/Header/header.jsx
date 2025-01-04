import React from "react";
import { FaBell, FaPlus, FaUser , FaYoutube, FaBars } from "react-icons/fa";
import Sidebar from "../Sidebar/sidebar";// Import the Sidebar component

function Header({ isSidebarOpen, toggleSidebar }) {
  return (
    <>
      {isSidebarOpen && <Sidebar />} {/* Conditionally render the Sidebar */}
      <header className="shadow sticky z-50 top-0">
        <nav className="border-gray-200 px-4 lg:px-6 py-2.5 sm:bg-blue-50 lg:bg-slate-50 font-bold">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={toggleSidebar} className="p-2 hover:bg-slate-200 rounded-full">
                <FaBars size={20} /> {/* Toggle button */}
              </button>
              <FaYoutube size={32} color="red" />
            </div>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search"
                className="w-96 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-blue-200"
              />
              <button className="px-6 py-2 bg-gray-100 border border-gray-300 rounded-r-full hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-200">
                Search
              </button>
            </div>
            <div>
              <div className="flex gap-8">
                <button className="flex gap-2 text-sm p-2 w-24 bg-slate-200 hover:bg-slate-300 rounded-3xl items-center">
                  <FaPlus size={16} />
                  Create
                </button>
                <button className="rounded-2xl p-3 hover:bg-slate-200">
                  <FaBell size={20} />
                </button>
                <button>
                  <FaUser  size={20} />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;