import React, { useState } from 'react'
import Footer from './Componenent/Footer/Footer'
import Header from './Componenent/Header/header'
import { Outlet } from 'react-router-dom'
import Sidebar from './Componenent/Sidebar/sidebar'
import Home from './Componenent/Home/home'

function Layout({ children,setShowLogin }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true) // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setShowLogin={setShowLogin} /> {/* Pass state and function to Header */}
      {isSidebarOpen && <Sidebar />} {/* Conditionally render the Sidebar */}
      <main
        className={`flex-1 p-4 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`} // Adjust margin dynamically
      >
        {children} {/* Page content */}
        <Home/>
      </main>
      <Footer isSidebarOpen={isSidebarOpen} /> {/* Pass state to Footer */}
    </div>
  );
}

export default Layout;