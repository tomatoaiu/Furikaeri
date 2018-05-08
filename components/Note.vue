<template>
  <div>
    <v-card-title class="pt-1 pl-2 pb-1 pr-0">
      <div class="subheading">{{ note.title }}</div>
      <v-spacer></v-spacer>
      <v-btn :color="baseColor" small flat icon
        @click="applyEditableNoteContent(index)">
        <v-icon size="15">mode_edit</v-icon>
      </v-btn>

      <v-dialog v-model="configDialog" persistent max-width="500px">
        <!-- <v-btn :color="baseColor" flat icon slot="activator"><v-icon>add</v-icon></v-btn> -->
        <v-btn :color="baseColor" small flat icon slot="activator"><v-icon size="15">settings</v-icon></v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Note Config</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    ref="noteTitleField"
                    label="note title"
                    v-model="noteTitle"
                    :rules="noteTitleRules"
                    ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :color="baseColor" flat
              @click.native="closeConfigDialog"
              >Cancel</v-btn>
            <v-btn :color="baseColor" flat
              @click.native="setNoteTitle(index)"
              :disabled="!validNoteTitle()"
              >SET</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
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
      editingNoteContent: this.note.content,
      configDialog: false,
      noteTitle: this.note.title,
      noteTitleRules: [
        v => (v && v.length > 0) || 'Name must be more than 0 characters'
      ]
    }
  },
  computed: {
    ...mapGetters({
      columnIndex: 'boards/getColumnIndex',
      baseColor: 'color/baseColor'
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
    setNoteTitle (index) {
      this.$store.commit('boards/setNoteTitle', {
        columnIndex: this.columnIndex(this.name),
        noteIndex: index,
        title: this.noteTitle
      })
      this.closeConfigDialog()
    },
    setNoteContent (index, content) {
      this.$store.commit('boards/setNoteContent', {
        columnIndex: this.columnIndex(this.name),
        noteIndex: index,
        content: content
      })
      this.notApplyEditableNoteContent()
    },
    closeConfigDialog () {
      this.configDialog = false
    },
    validNoteTitle () {
      if (this.noteTitle && this.noteTitle.length > 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
