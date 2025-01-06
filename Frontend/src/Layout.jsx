import React, { useState } from "react";
import Footer from "./Componenent/Footer/Footer";
import Header from "./Componenent/Header/header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Componenent/Sidebar/sidebar";
import Home from "./Componenent/Home/home";

function Layout({ setShowLogin,showlogin }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex flex-col min-h-screen">
      {showlogin ? (
        <></>
      ) : (
        <>
          <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setShowLogin={setShowLogin} />
          {isSidebarOpen && <Sidebar />}
          <main
            className={`flex-1 p-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"}`}
          >
            <Outlet /> {/* Page content will go here */}
          </main>
          <Footer isSidebarOpen={isSidebarOpen} />
        </>
      )}
    </div>
  );
}

export default Layout;
