import React from "react";
import { FaHome, FaCompass, FaHistory, FaThumbsUp } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-32 bg-white shadow-lg h-screen fixed left-0 top-0 pt-16">
      <div className="p-4">
        <ul className="space-y-4">
          <li className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg">
            <FaHome size={20} />
            <span>Home</span>
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg">
            <FaCompass size={20} />
            <span>Explore</span>
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg">
            <FaHistory size={20} />
            <span>History</span>
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg">
            <FaThumbsUp size={20} />
            <span>Liked Videos</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;