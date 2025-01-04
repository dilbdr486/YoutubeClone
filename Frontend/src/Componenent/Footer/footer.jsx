import React from "react";

function Footer({ isSidebarOpen }) {
  return (
    <footer
      className={`bg-gray-800 text-white p-4 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? " ml-64" : "ml-0"
      }`} // Adjust margin dynamically
    >
      <div className="text-center">
        <p>© 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;