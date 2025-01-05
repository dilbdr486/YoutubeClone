import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Componenent/Home/home.jsx";
import Sidebar from "./Componenent/Sidebar/sidebar.jsx";
import LoginPopup from "./pages/Login/login.jsx"; // Import the LoginPopup component
import { useState } from "react";

const App = () => {
  const [showlogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Login Popup */}
      {showlogin && <LoginPopup setShowLogin={setShowLogin} />}

      {/* Layout and Routes */}
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route
              path="/"
              element={<Layout setShowLogin={setShowLogin} />} // Pass setShowLogin to Layout
            >
              <Route path="" element={<Home />} />
              <Route path="sidebar" element={<Sidebar />} />
            </Route>
          )
        )}
      />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
