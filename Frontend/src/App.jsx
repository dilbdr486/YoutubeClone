import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import Layout from "./Layout";
import Home from "./Componenent/Home/home";
import Sidebar from "./Componenent/Sidebar/sidebar";
import Register from "./pages/Register/register";

const App = () => {
    const [showlogin, setShowLogin] = useState(false);
    return (
      <>
        {showlogin ? <Login setShowLogin={setShowLogin} /> : <></>}
        <Routes>
          <Route
            path="/"
            element={
              <Layout setShowLogin={setShowLogin} showlogin={showlogin}>
                <Home />
              </Layout>
            }
          />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </>
    );
  };
  
  export default App;