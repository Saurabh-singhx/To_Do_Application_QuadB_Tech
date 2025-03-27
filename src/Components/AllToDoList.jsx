import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteNote } from "../Redux/ToDoSlice";
import { fetchWeather } from "../Redux/weatherSlice"; // Import weather action

function AllToDoList() {
    const [Search, setSearch] = useState("");
    const Notes = useSelector((state) => state.Notes.Notes || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, loading, error } = useSelector((state) => state.weather);
    const [city, setCity] = useState("");

    // ✅ Function to get city name from OpenWeather Geolocation API
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(
                            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                        );
                        const locationData = await response.json();
                        if (locationData.city) {
                            setCity(locationData.city);
                        } else {
                            console.error("City not found:", locationData);
                        }
                    } catch (error) {
                        console.error("Error fetching city:", error);
                    }
                },
                (error) => {
                    console.error("Location error:", error);
                }
            );
        }
    }, []);

    //  Fetch weather when city name is available
    useEffect(() => {
        if (city) {
            dispatch(fetchWeather(city));
        }
    }, [city, dispatch]);

    return (
        <div className="px-10 py-5 w-[100vw]">
            {/* Search Input */}
            <div className="w-[100%] flex justify-center">
                <input
                    value={Search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search notes..."
                    className="w-1/3 mt-8 px-4 py-3 rounded-xl text-lg border border-gray-300 focus:outline-none Search_bar"
                />
            </div>

            {/* Notes List */}
            <div className="h-[80%] mt-6 overflow-y-auto">
                {Notes.map((Note, index) => (
                    <div
                        key={Note._id}
                        className="bg-gray-800 text-white p-4 rounded-lg mt-4 flex justify-between items-center cursor-pointer hover:bg-gray-700 transition-all h-40 flex-col"
                        onClick={() => navigate(`/Notes/${Note._id}`)}
                    >
                        <div className="flex gap-8">
                            <div className={`px-4 py-2 rounded-md All_To_Do_Btns ${
                                Note.Priority === "High" ? "bg-red-500" :
                                Note.Priority === "Medium" ? "bg-amber-500" :
                                "bg-sky-300"
                            }`}>
                                {Note.Priority}
                            </div>
                            <div className="bg-teal-500 px-4 py-2 rounded-md All_To_Do_Btns">
                                {Note.Outdoor}
                            </div>
                            {/*  Weather only for Outdoor Tasks */}
                            {Note.Outdoor === "Outdoor" && city && (
                                <div className="top-4 right-4 bg-lime-500 text-white px-4 py-2 rounded-md shadow-md">
                                    {loading ? <p>Loading Weather...</p> : null}
                                    {error ? <p>Error fetching weather</p> : null}
                                    {data && data.current_observation && (
                                        <div className="flex">
                                            <p className="font-bold">{data.location.city}</p>
                                            <p>{data.current_observation.condition.temperature}°C | {data.current_observation.condition.text}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between w-full">
                            <div>
                                <h2 className="text-xl font-semibold">{Note.title}</h2>
                                <p className="text-gray-300 text-sm">{Note.content.slice(0, 200)}...</p>
                            </div>
                            <div className="flex gap-3 flex-col">
                                <button
                                    className="bg-red-500 px-4 py-2 rounded-md"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(DeleteNote(Note));
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllToDoList;
