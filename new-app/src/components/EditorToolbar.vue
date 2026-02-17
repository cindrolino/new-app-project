<template>
  <div class="editor-toolbar">
    <div class="editor-toolbar__stats">
      <span>{{ charCount }} characters</span>
      <span>{{ wordCount }} words</span>
      <span v-if="saveStatus" class="editor-toolbar__status">{{ saveStatus }}</span>
    </div>
    <div class="editor-toolbar__actions">
      <button class="btn-secondary" @click="$emit('clear')">Clear</button>
      <button class="btn-secondary" @click="$emit('download')">Download</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorToolbar',
  props: {
    content: {
      type: String,
      default: ''
    },
    saveStatus: {
      type: String,
      default: ''
    }
  },
  emits: ['clear', 'download'],
  computed: {
    charCount() {
      return this.content.length
    },
    wordCount() {
      if (!this.content || this.content.trim() === '') return 0
      return this.content.trim().split(/\s+/).length
    }
  }
}
</script>

<style scoped>
.editor-toolbar {
  padding: 18px 30px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-toolbar__stats {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #6c757d;
}

.editor-toolbar__status {
  color: #28a745;
  font-weight: 500;
}

.editor-toolbar__actions {
  display: flex;
}

@media (max-width: 768px) {
  .editor-toolbar {
    flex-direction: column;
    gap: 12px;
  }
}
</style>