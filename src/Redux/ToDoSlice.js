import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    Notes: localStorage.getItem("Notes") ? JSON.parse(localStorage.getItem("Notes")) : []
};

export const NotesSlice = createSlice({
    name: 'Notes',
    initialState,
    reducers: {
        AddNotes: (state, action) => {
            const Note = action.payload;
            state.Notes.push(Note);
            localStorage.setItem("Notes", JSON.stringify(state.Notes));
            toast.success("Your Note Is Created");
        },
        EditNote: (state, action) => {
            const updatedNote = action.payload;
            const index = state.Notes.findIndex((item) => item._id === updatedNote._id);

            if (index !== -1) {
                state.Notes[index] = updatedNote;
                localStorage.setItem("Notes", JSON.stringify(state.Notes));
                toast.success("Your Note Is Updated");
            }
        },
        DeleteNote: (state, action) => {
            const noteToDelete = action.payload;
            state.Notes = state.Notes.filter(item => item._id !== noteToDelete._id);
            localStorage.setItem("Notes", JSON.stringify(state.Notes));
            toast.success("Your Note Is Deleted");
        },
        DeleteAllNote: (state) => {
            state.Notes = [];
            localStorage.removeItem("Notes");
            toast.success("All Notes Have Been Deleted");
        },
    },
});

export const { AddNotes, EditNote, DeleteNote, DeleteAllNote } = NotesSlice.actions;

export default NotesSlice.reducer;
