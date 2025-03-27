import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../Redux/weatherSlice";

function ViewToDo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ensure Notes is always an array to prevent errors
  const Notes = useSelector((state) => state.Notes.Notes || []);
  const Note = Notes.find((note) => note._id === id);

  // Weather state
  const { data, loading, error } = useSelector((state) => state.weather);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (Note?.Outdoor === "Outdoor" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          setLocationError("Location access denied. Enable location services.");
        }
      );
    }
  }, [Note]);

  useEffect(() => {
    if (location?.lat && location?.lon) {
      dispatch(fetchWeather({ lat: location.lat, lon: location.lon }));
    }
  }, [location, dispatch]);

  return (
    <div className="flex items-center justify-center p-6 relative h-[80vh]">
      <div className="w-full max-w-2xl bg-slate-800 shadow-md rounded-lg p-6 relative h-[80%]">
        {/* Weather Display for Outdoor Notes */}
        {Note?.Outdoor === "Outdoor" && (
          <div className="top-9 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md absolute">
            {loading ? (
              <p>Loading Weather...</p>
            ) : error ? (
              <p>Error fetching weather</p>
            ) : data?.data?.length > 0 ? (
              <div className="flex flex-col">
                <p className="font-bold">{data.city_name}</p>
                <p>
                  {data.data[0]?.temp}°F | {data.data[0]?.weather?.description}
                </p>
              </div>
            ) : locationError ? (
              <p>{locationError}</p>
            ) : (
              <p>No weather data available.</p>
            )}
          </div>
        )}

        {/* Note Content */}
        <h2 className="text-3xl font-bold mb-4 text-white mt-5">
          {Note?.title || "Note Not Found"}
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[250px]">
          <p className="text-gray-700 whitespace-pre-line text-lg font-semibold">
            {Note?.content || "This note does not exist or has been deleted."}
          </p>
        </div>

        {/* Back Button */}
        <div className="flex mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition-all"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewToDo;
