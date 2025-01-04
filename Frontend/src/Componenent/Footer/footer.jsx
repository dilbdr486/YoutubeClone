import React from "react";

function Footer() {
  return (
    <footer className="bottom-0" >
      <hr className="translate-y-3"/>
      <div className="bottom-0 py-3 mt-3">
      <p className="text-sm mt-1 text-center text-gray-50">
          &copy; {new Date().getFullYear()} YouTube Clone. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;