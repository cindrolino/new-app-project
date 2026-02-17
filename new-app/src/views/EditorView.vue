<template>
  <div class="card-wrapper editor-view">
    <!-- Header -->
    <div class="app-header">
      <button class="btn-back" @click="goBack">← Back</button>
      <input
        v-model="title"
        class="editor-view__title-input"
        placeholder="Note title..."
        @input="autoSave"
      />
    </div>

    <!-- Text area -->
    <div class="editor-view__body">
      <textarea
        v-model="content"
        class="editor-view__textarea"
        placeholder="Start writing your note here..."
        @input="autoSave"
      ></textarea>
    </div>

    <!-- Toolbar -->
    <EditorToolbar
      :content="content"
      :saveStatus="saveStatus"
      @clear="clearContent"
      @download="downloadNote"
    />
  </div>
</template>

<script>
import { noteStore } from '../store/noteStore'
import { router } from '../router'
import EditorToolbar from '../components/EditorToolbar.vue'

export default {
  name: 'EditorView',
  components: { EditorToolbar },
  data() {
    const noteId = router.getParams().noteId
    const note = noteStore.getById(noteId) || {}
    return {
      noteId,
      title: note.title || '',
      content: note.content || '',
      saveStatus: '',
      saveTimeout: null
    }
  },
  methods: {
    autoSave() {
      this.saveStatus = 'Saving...'
      clearTimeout(this.saveTimeout)
      this.saveTimeout = setTimeout(() => {
        noteStore.update(this.noteId, {
          title: this.title,
          content: this.content
        })
        this.saveStatus = 'Saved ✓'
        setTimeout(() => {
          this.saveStatus = ''
        }, 2000)
      }, 1000)
    },
    goBack() {
      // Force save before leaving
      noteStore.update(this.noteId, {
        title: this.title,
        content: this.content
      })
      router.push('ListView')
    },
    clearContent() {
      if (confirm('Clear all content?')) {
        this.content = ''
        this.autoSave()
      }
    },
    downloadNote() {
      const blob = new Blob([this.content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${(this.title || 'untitled').replace(/[^a-z0-9]/gi, '_')}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped>
.editor-view {
  display: flex;
  flex-direction: column;
  height: 88vh;
}

.editor-view__title-input {
  flex: 1;
  border: none;
  font-size: 22px;
  font-weight: 600;
  padding: 0 20px;
  outline: none;
  color: #333;
  background: transparent;
}

.editor-view__title-input::placeholder {
  color: #adb5bd;
}

.editor-view__body {
  flex: 1;
  padding: 0 30px;
  overflow-y: auto;
}

.editor-view__textarea {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  font-size: 16px;
  line-height: 1.8;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  outline: none;
  padding: 20px 0;
  color: #333;
}

.editor-view__textarea::placeholder {
  color: #adb5bd;
}
</style>