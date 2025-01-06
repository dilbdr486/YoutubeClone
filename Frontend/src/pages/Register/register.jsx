import React from "react";
import { FaGoogle } from "react-icons/fa";

function register() {
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
          Sign up to your account
        </h2>
        <form>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Fullname</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your Fullname"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your Username"
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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign up
          </button>
        </form>

        <p className="text-center mt-2">or</p>

        <div className="">
          <button className="flex items-center justify-center mt-2 gap-4 w-full text-center text-md border border-gray-500 py-2 rounded-md hover:border-gray-800 transition duration-200">
            <FaGoogle /> Login up with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default register;
