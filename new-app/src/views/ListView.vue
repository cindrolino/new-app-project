<template>
  <div class="card-wrapper">
    <!-- Header -->
    <div class="app-header">
      <h1>📝 My Notes</h1>
      <button class="btn-primary" @click="createNote">+ New Note</button>
    </div>

    <!-- Body -->
    <div class="list-view__body">
      <!-- Empty state -->
      <div v-if="notes.length === 0" class="list-view__empty">
        <div class="list-view__empty-icon">🗒️</div>
        <p>No notes yet.</p>
        <small>Click "+ New Note" to get started.</small>
      </div>

      <!-- Notes grid -->
      <div v-else class="list-view__grid">
        <NoteCard
          v-for="note in notes"
          :key="note.id"
          :note="note"
          @open="openNote"
          @delete="deleteNote"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { noteStore } from '../store/noteStore'
import { router } from '../router'
import NoteCard from '../components/NoteCard.vue'

export default {
  name: 'ListView',
  components: { NoteCard },
  data() {
    return {
      notes: noteStore.getState().notes
    }
  },
  methods: {
    createNote() {
      const note = noteStore.create()
      router.push('EditorView', { noteId: note.id })
    },
    openNote(noteId) {
      router.push('EditorView', { noteId })
    },
    deleteNote(noteId) {
      if (confirm('Delete this note?')) {
        noteStore.delete(noteId)
      }
    }
  }
}
</script>

<style scoped>
.list-view__body {
  padding: 30px;
  min-height: 500px;
}

.list-view__empty {
  text-align: center;
  padding: 100px 20px;
  color: #6c757d;
}

.list-view__empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.list-view__empty p {
  font-size: 20px;
  margin-bottom: 8px;
}

.list-view__empty small {
  font-size: 14px;
}

.list-view__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .list-view__grid {
    grid-template-columns: 1fr;
  }
}
</style>