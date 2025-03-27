import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddNotes, EditNote } from '../Redux/ToDoSlice';
import toast from 'react-hot-toast';

function Home() {
    const [Title, setTitle] = useState('');
    const [Value, setValue] = useState('');
    const [Outdoor, setOutdoor] = useState('Indoor');
    const [Priority, setPriority] = useState('Low');
    const [searchParams, setSearchParams] = useSearchParams();
    const PasteId = searchParams.get("NotesId");
    const dispatch = useDispatch();
    const Notes = useSelector((state) => state.Notes.Notes);

    // Load existing note when editing
    useEffect(() => {
        if (PasteId) {
            const existingNote = Notes.find(note => note._id === PasteId);
            if (existingNote) {
                setTitle(existingNote.title);
                setValue(existingNote.content);
            }
        }
        else {
            setTitle('');
            setValue('');
        }
    }, [PasteId, Notes]);

    const handleNotes = () => {
        const Note = {
            title: Title,
            content: Value,
            _id: PasteId || Date.now().toString(36),
            Time: new Date().toISOString(),
            Outdoor: Outdoor,
            Priority: Priority,
        };

        if (PasteId) {
            dispatch(EditNote(Note));
        }
        if (Value === '' || Title === '') {
            toast.error("Fill the area");
        } else {
            dispatch(AddNotes(Note));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-2xl bg-slate-800 shadow-lg rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {PasteId ? "Edit Your To Do" : "Create a To Do"}
                </h2>

                {/* Title Input */}
                <input
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="w-full bg-gray-100 border border-gray-300 text-lg p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800 font-bold"
                    placeholder="Enter To do title..."
                />

                {/* Textarea Input */}
                <textarea
                    value={Value}
                    onChange={(e) => setValue(e.target.value)}
                    rows="6"
                    className="w-full bg-gray-100 border border-gray-300 mt-4 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800 font-semibold"
                    placeholder="Write your note here..."
                ></textarea>

                {/* selection buttons */}

                <div className="flex justify-center items-center space-x-10 p-6 h-40 Selection_Buttons">
                    {/* Two-Button Selector */}
                    <div className="flex flex-col items-center space-y-4 Towbtn w-[50%]">
                        <h2 className="text-lg font-semibold Selected1">Selected: {Outdoor}</h2>
                        <div className="flex space-x-4 Two_Button justify-center items-center w-full ">
                            <button
                                className={`px-4 py-2 rounded-lg transition-all duration-200 SelectionBtns ${Outdoor === "Indoor" ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700 "
                                    }`}
                                onClick={() => setOutdoor("Indoor")}
                            >
                                Indoor
                            </button>

                            <button
                                className={`px-4 py-2 rounded-lg transition-all duration-200 SelectionBtns ${Outdoor === "Outdoor" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700 "
                                    }`}
                                onClick={() => setOutdoor("Outdoor")}
                            >
                                Outdoor
                            </button>
                        </div>
                    </div>

                    {/* Three-Button Selector */}
                    <div className="flex flex-col items-center space-y-4 Threebtn w-[50%]">
                        <h2 className="text-lg font-semibold Selected2">Priority: {Priority}</h2>
                        <div className="flex space-x-4 Three_Button justify-center items-center w-full">
                            <button
                                className={`px-4 py-2 rounded-lg transition-all duration-200 SelectionBtns ${Priority === "Low" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 "
                                    }`}
                                onClick={() => setPriority("Low")}
                            >
                                Low
                            </button>

                            <button
                                className={`px-4 py-2 rounded-lg transition-all duration-200 SelectionBtns ${Priority === "Medium" ? "bg-fuchsia-500 text-white" : "bg-gray-200 text-gray-700 "
                                    }`}
                                onClick={() => setPriority("Medium")}
                            >
                                Medium
                            </button>

                            <button
                                className={`px-4 py-2 rounded-lg transition-all duration-200 SelectionBtns ${Priority === "High" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
                                    }`}
                                onClick={() => setPriority("High")}
                            >
                                High
                            </button>
                        </div>
                    </div>
                </div>
                {/* Button Section */}
                <button
                    onClick={handleNotes}
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-md transition-all"
                >
                    {PasteId ? "Update Note" : "Create Note"}
                </button>
            </div>
        </div>
    );
}

export default Home;
