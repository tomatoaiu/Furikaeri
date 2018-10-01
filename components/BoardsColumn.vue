<template>
  <v-flex xs12 sm4 md3 xl2>
    <v-card style="height: 100%; overflow: scroll;">
      <v-card-title class="pb-0 pt-0 pr-0">
        <div class="title">{{ column.name }}</div>
        <v-spacer></v-spacer>

        <v-card-actions class="pr-0">
          <v-dialog v-model="columnDialog" persistent max-width="500px">
            <v-btn :color="baseColor" small flat icon slot="activator"><v-icon size="17">cancel</v-icon></v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">Column</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <p>Do you want to delete this column?</p>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="baseColor" flat
                  @click.native="closeColumnModal"
                  >Cancel</v-btn>
                <v-btn :color="baseColor" flat
                  @click.native="deleteColumnModal"
                  >Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          
          <v-dialog v-model="noteDialog" persistent max-width="500px">
            <v-btn :color="baseColor" flat icon slot="activator"><v-icon>add</v-icon></v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">Note</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                        ref="noteTitleField"
                        label="title"
                        v-model="noteTitle"
                        :rules="titleRules"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        label="context"
                        v-model="noteContent"
                      ></v-textarea>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-select
                        label="type"
                        :items="['success', 'info', 'warning', 'error']"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="baseColor" flat
                  @click.native="closeModal"
                  >Cancel</v-btn>
                <v-btn :color="baseColor" flat
                  @click.native="addNewNote"
                  :disabled="!validAddNote()"
                  >ADD</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card-title>
      <hr class="my-1">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <draggable v-model="notes" :options="{group:'note', animation: 400}" style="min-height: 3em;">
              <v-card v-for="(note, index) of notes" :key="index">
                <boards-note
                  :name="column.name"
                  :note="note"
                  :index="index">
                </boards-note>
                <div class="mb-3" v-if="index + 1 < notes.length" :key="index"></div>
              </v-card>
            </draggable>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import Note from '~/components/Note.vue'
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'borads-column',
  props: ['column'],
  data () {
    return {
      columnDialog: false,
      noteDialog: false,
      noteTitle: '',
      noteContent: '',
      titleRules: [
        v => (v && v.length > 0) || 'Name must be more than 0 characters'
      ]
    }
  },
  computed: {
    ...mapGetters({
      columnIndex: 'boards/getColumnIndex',
      getNotes: 'boards/getNotes',
      baseColor: 'color/base'
    }),
    notes: {
      get () {
        return this.getNotes(this.columnIndex(this.column.name))
      },
      set (list) {
        this.setNote({
          index: this.columnIndex(this.column.name),
          note: list
        })
      }
    }
  },
  methods: {
    ...mapActions({
      setNote: 'boards/setNote',
      addNote: 'boards/addNote',
      removeColumn: 'boards/removeColumn'
    }),
    addNewNote () {
      if (this.validAddNote()) {
        this.addNote({
          title: this.noteTitle,
          content: this.noteContent,
          index: this.columnIndex(this.column.name)
        })
        this.closeModal()
      }
    },
    closeModal () {
      this.$refs.noteTitleField.reset()
      this.noteDialog = false
    },
    closeColumnModal () {
      this.columnDialog = false
    },
    deleteColumnModal () {
      this.removeColumn({
        index: this.columnIndex(this.column.name)
      })
      this.closeColumnModal()
    },
    validAddNote () {
      if (this.noteTitle && this.noteTitle.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    draggable,
    'boards-note': Note
  }
}
</script>
