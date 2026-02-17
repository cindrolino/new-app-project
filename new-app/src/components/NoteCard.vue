<template>
  <div class="note-card" @click="$emit('open', note.id)">
    <div class="note-card__header">
      <h3 class="note-card__title">{{ note.title || 'Untitled Note' }}</h3>
      <button class="btn-delete" @click.stop="$emit('delete', note.id)">×</button>
    </div>
    <p class="note-card__preview">{{ getPreview(note.content) }}</p>
    <div class="note-card__footer">
      <span>{{ formatDate(note.updatedAt) }}</span>
      <span>{{ getWordCount(note.content) }} words</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoteCard',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  emits: ['open', 'delete'],
  methods: {
    getPreview(content) {
      if (!content || content.trim() === '') return 'No content yet...'
      return content.length > 120 ? content.substring(0, 120) + '...' : content
    },
    getWordCount(content) {
      if (!content || content.trim() === '') return 0
      return content.trim().split(/\s+/).length
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays === 1) return 'Yesterday'
      if (diffDays < 7) return `${diffDays} days ago`
      return date.toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.note-card {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.note-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.note-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.note-card__title {
  font-size: 17px;
  color: #333;
  flex: 1;
  margin-right: 10px;
  word-break: break-word;
}

.note-card__preview {
  font-size: 14px;
  color: #6c757d;
  line-height: 1.5;
  margin-bottom: 12px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.note-card__footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #adb5bd;
}
</style>