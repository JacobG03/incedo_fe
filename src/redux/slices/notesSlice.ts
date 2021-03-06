import { createSlice } from "@reduxjs/toolkit";
import { INotes } from "../../types";


const cru_status = {
  pending: false,
  success: false,
  errors: [],
}

const get_status = {
  pending: false,
  finished: false
}

const initialState: INotes = {
  notes: [],
  fetchNotes: get_status,
  getNote: get_status,
  createNote: cru_status,
  removeNote: cru_status,
  updateNote: cru_status,
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    fetchNotesStart: (state) => {
      state.fetchNotes.pending = true
    },
    fetchNotesSuccess: (state, action) => {
      state.notes = action.payload
      state.fetchNotes.pending = false
      state.fetchNotes.finished = true
    },
    fetchNotesFailure: (state) => {
      state.fetchNotes.pending = false
      state.fetchNotes.finished = true
    },
    fetchNotesReset: (state) => {
      state.fetchNotes = get_status
    },
    getNoteStart: (state) => {
      state.getNote.pending = true
    },
    getNoteSuccess: (state, action) => {
      let notes = state.notes.filter(note => note.id === action.payload.id)
      if (notes.length > 0) {
        state.notes.filter(note => note.id === notes[0].id ? notes[0]: null)
      } else {
        state.notes = [...state.notes, action.payload]
      }
      state.getNote.pending = false
      state.getNote.finished = true
    },
    getNoteFailure: (state) => {
      state.getNote.pending = false
      state.getNote.finished = true
    },
    getNoteReset: (state) => {
      state.getNote = get_status
    },
    addNoteStart: (state) => {
      state.createNote.pending = true
    },
    addNoteSuccess: (state, action) => {
      state.createNote.pending = false
      state.createNote.success = true
      state.notes = [...state.notes, action.payload]
    },
    addNoteFailure: (state, action) => {
      state.createNote.pending = false
      state.createNote.errors = action.payload
    },
    addNoteReset: (state) => {
      state.createNote.pending = false
      state.createNote.errors = []
      state.createNote.success = false
    },
    removeNoteStart: (state) => {
      state.removeNote.pending = true
    },
    removeNoteSuccess: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload.id)
      state.removeNote.pending = false
      state.removeNote.success = true
    },
    removeNoteFailure: (state, action) => {
      state.removeNote.pending = false
      state.removeNote.success = false
      state.removeNote.errors = action.payload
    },
    removeNoteReset: (state) => {
      state.removeNote = cru_status
    },
    updateNoteStart: (state) => {
      state.updateNote.pending = true
    },
    updateNoteSuccess: (state, action) => {
      state.notes = state.notes.map(note => note.id === action.payload.id
          ? {...note, ...action.payload}
          : note)
      state.updateNote.pending = false
      state.updateNote.success = true
    },
    updateNoteFailure: (state, action) => {
      state.updateNote.pending = false
      state.updateNote.success = false
      state.updateNote.errors = action.payload
    },
    updateNoteReset: (state) => {
      state.updateNote = cru_status
    },
  }
})

export const {
  fetchNotesStart, fetchNotesSuccess, fetchNotesFailure, fetchNotesReset,
  getNoteStart, getNoteSuccess, getNoteFailure, getNoteReset,
  addNoteStart, addNoteSuccess, addNoteFailure, addNoteReset,
  removeNoteStart, removeNoteSuccess, removeNoteFailure, removeNoteReset,
  updateNoteStart, updateNoteSuccess, updateNoteFailure, updateNoteReset,
} = notesSlice.actions;

export default notesSlice.reducer;
