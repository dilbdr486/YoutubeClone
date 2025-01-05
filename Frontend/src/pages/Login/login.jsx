import React, { useState } from "react";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const onLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!data.email || !data.password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/v1/users/login", data, {
        withCredentials: true,
      });

      if (response.data) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        setShowLogin(false); // Close the popup after successful login
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  // Close the login popup
  const onClose = () => {
    setShowLogin(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <form onSubmit={onLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Email or Username
            </label>
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="Enter your email or username"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;