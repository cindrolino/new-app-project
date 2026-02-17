// ===========================
// store/noteStore.js
// State management for notes
// ===========================

import { reactive } from 'vue'

const state = reactive({
  notes: []
})

export const noteStore = {
  getState() {
    return state
  },

  load() {
    const saved = localStorage.getItem('vue-notepad-notes')
    if (saved) {
      state.notes = JSON.parse(saved)
    }
  },

  persist() {
    localStorage.setItem('vue-notepad-notes', JSON.stringify(state.notes))
  },

  getAll() {
    return state.notes
  },

  getById(id) {
    return state.notes.find(n => n.id === id) || null
  },

  create() {
    const note = {
      id: Date.now(),
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    state.notes.unshift(note)
    this.persist()
    return note
  },

  update(id, changes) {
    const index = state.notes.findIndex(n => n.id === id)
    if (index !== -1) {
      state.notes[index] = {
        ...state.notes[index],
        ...changes,
        updatedAt: new Date().toISOString()
      }
      this.persist()
    }
  },

  delete(id) {
    state.notes = state.notes.filter(n => n.id !== id)
    this.persist()
  }
}