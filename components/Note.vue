<template>
  <div>
    <v-card-title class="pt-1 pl-2 pb-1 pr-0">
      <div class="subheading">{{ note.title }}</div>
      <v-spacer></v-spacer>
      <v-btn color="light-blue" small flat icon
        @click="applyEditableNoteContent(index)">
        <v-icon size="15">mode_edit</v-icon>
      </v-btn>
      <v-btn color="light-blue" small flat icon><v-icon size="15">settings</v-icon></v-btn>
    </v-card-title>
    <v-card-text class="px-2 pt-1"
      v-if="!editableNoteContent">
      <p class="text-xs-left">
        {{ note.content }}
      </p>
    </v-card-text>
    <v-text-field
      v-else
      ref="noteContent"
      multi-line
      v-model="editingNoteContent"
      v-on:blur="setNoteContent(index, editingNoteContent)">
    </v-text-field>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'boards-note',
  props: ['name', 'note', 'index'],
  data () {
    return {
      editableNoteContent: false,
      editingNoteContent: this.note.content
    }
  },
  computed: {
    ...mapGetters({
      columnIndex: 'boards/getColumnIndex'
    })
  },
  methods: {
    applyEditableNoteContent () {
      this.editableNoteContent = true
      this.$nextTick(() => this.$refs.noteContent.focus())
    },
    notApplyEditableNoteContent () {
      this.editableNoteContent = false
    },
    setNoteContent (index, content) {
      this.$store.commit('boards/setNoteContent', {
        columnIndex: this.columnIndex(this.name),
        noteIndex: index,
        content: content
      })
      this.notApplyEditableNoteContent()
    }
  }
}
</script>
