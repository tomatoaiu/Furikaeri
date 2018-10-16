<template>
  <div>
    <v-card-title class="pt-1 pl-2 pb-1 pr-0">
      <div class="subheading">{{ note.title }}</div>
      <v-spacer></v-spacer>

      <v-dialog v-model="configDialog" persistent max-width="500px">
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
                <v-btn outline :color="baseColor" @click="removeCurrentNote">
                  Delete Note
                </v-btn>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :color="baseColor" flat
              @click.native="closeConfigDialog"
              >Cancel</v-btn>
            <v-btn :color="baseColor" flat
              @click.native="changeNoteTitle(index)"
              :disabled="!validNoteTitle()"
              >SET</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
    </v-card-title>
    <v-card-text class="px-2 pt-1 pb-1">
      <v-textarea
        class="pt-0"
        ref="noteContent"
        background-color="#f7f7f7"
        full-width
        hide-details
        :color="baseColor"
        v-model="editingNoteContent"
        v-on:blur="changeNoteContent(index, editingNoteContent)">
      </v-textarea>
    </v-card-text>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'boards-note',
  props: ['name', 'note', 'index'],
  data () {
    return {
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
      noteIndex: 'boards/getNoteIndex',
      baseColor: 'color/base'
    })
  },
  mounted () {
    this.setPaddingZeroToTextarea()
  },
  methods: {
    ...mapActions({
      setNoteTitle: 'boards/setNoteTitle',
      setNoteContent: 'boards/setNoteContent',
      removeNote: 'boards/removeNote'
    }),
    setPaddingZeroToTextarea () {
      this.$refs['noteContent'].$el.firstChild.style.paddingTop = '0'
    },
    changeNoteTitle (index) {
      this.setNoteTitle({
        columnIndex: this.columnIndex(this.name),
        noteIndex: index,
        title: this.noteTitle
      })
      this.closeConfigDialog()
    },
    changeNoteContent (index, content) {
      this.setNoteContent({
        columnIndex: this.columnIndex(this.name),
        noteIndex: index,
        content: content
      })
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
    },
    removeCurrentNote () {
      this.removeNote({
        columnIndex: this.columnIndex(this.name),
        noteIndex: this.noteIndex(this.columnIndex(this.name), this.noteTitle)
      })
      this.closeConfigDialog()
    }
  }
}
</script>

<style scoped>
.v-input__control {
  padding-top: 0;
}
</style>

