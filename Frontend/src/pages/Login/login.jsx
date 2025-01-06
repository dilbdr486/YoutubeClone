import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login({ setShowLogin }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful!");
    setShowLogin(false);
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to the Register page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="w-full max-w-md sm:max-w-sm p-6 bg-white rounded-lg shadow-lg transform transition-all"
        style={{
          width: "90%", // Responsive width
          maxWidth: "400px", // Maximum width
        }}
      >
        <h2 className="text-lg font-bold text-center mb-4">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">
              Email or Username
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email or username"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-1">
              <input type="checkbox" />
              <label className="text-sm">Remember me</label>
            </div>
            <div>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-2">or</p>

        <div className="">
          <button className="flex items-center justify-center mt-2 gap-4 w-full text-center text-md border border-gray-500 py-2 rounded-md hover:border-gray-800 transition duration-200">
            <FaGoogle /> Login with Google
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4 items-baseline">
          <p className="text-sm text-gray-500">Don't have an account?</p>
          <button
            onClick={handleRegisterClick}
            className="text-blue-500 hover:underline text-sm"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
