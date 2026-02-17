// ===========================
// router/index.js
// Simple router (no vue-router dependency)
// ===========================

import { reactive } from 'vue'

const state = reactive({
  currentView: 'ListView',
  params: {}
})

export const router = {
  getState() {
    return state
  },

  push(view, params = {}) {
    state.currentView = view
    state.params = params
  },

  getCurrentView() {
    return state.currentView
  },

  getParams() {
    return state.params
  }
}