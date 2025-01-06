import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [videos, setVideos] = useState([]);  // State to hold video data
  const [loading, setLoading] = useState(true);  // State to indicate loading
  const [error, setError] = useState(null);  // State to hold error messages

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const accessToken = localStorage.getItem("token");

        if (!accessToken) {
          throw new Error("No access token found in localStorage.");
        }

        console.log("Access Token:", accessToken); // Log token to verify

        const response = await axios.get("/api/v1/videos/", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add token to the request headers
          },
          params: {
            page: 1,
            limit: 10,
            query: "",
            sortBy: "createdAt",
            sortType: "desc",
          },
        });

        // Log the full response to inspect the data structure
        console.log("API Response:", response.data);

        // Check if response is valid and success is true
        const { success, statusCode, message } = response.data;
        console.log(success);
        

        if (success) {
          // Success - handle video data
          const videosData = statusCode?.data;  // Extract video data from statusCode.data
          console.log("Videos Data:", videosData);

          if (Array.isArray(videosData) && videosData.length > 0) {
            setVideos(videosData);  // Set the videos state
            setError(null);  // Clear any previous errors
          } else {
            setVideos([]);  // No videos found
            setError("No videos found.");
          }
        } else {
          // If success is false, handle the error
          setVideos([]);  // Reset videos if success is false
          setError(message || "Failed to fetch videos.");
        }

        setLoading(false);
      } catch (err) {
        // Log the error for more detailed insights
        // console.error("Error fetching videos:", err.response || err);
        setVideos([]);  // Reset videos in case of error
        setError(err.response?.data?.message || err.message || "Unknown error occurred.");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);  // Empty dependency array so it runs once when the component mounts

  // Conditional rendering based on loading and error states
  if (loading) return <div>Loading videos...</div>;
  if (error) return <div>Error: "error"</div>;

  return (
    <div className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Movies Here</h1>
      <div className="w-full max-w-4xl">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="mb-6 p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{video.title}</h2>
              <p className="text-gray-600 mt-2">{video.description}</p>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-auto mt-2"
              />
              <p className="text-gray-500 mt-2">Views: {video.views}</p>
            </div>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
