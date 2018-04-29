<template>
  <v-flex xs12 sm4 md3 xl2>
    <v-card style="height: 100%; overflow: scroll;">
      <v-card-title class="pb-0 pt-0 pr-0">
        <div class="title">{{ column.name }}</div>
        <v-spacer></v-spacer>
        <v-card-actions class="pr-0">
          <v-dialog v-model="dialog" persistent max-width="500px">
            <v-btn color="light-blue" flat icon slot="activator"><v-icon>add</v-icon></v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">Note</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                      ref="titleField"
                        label="title"
                        v-model="title"
                        :rules="titleRules"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        label="context"
                        v-model="content"
                        multi-line
                      ></v-text-field>
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
                <v-btn color="blue darken-1" flat
                  @click.native="closeModal"
                  >Cancel</v-btn>
                <v-btn color="blue darken-1" flat
                  @click.native="addNote"
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
            <draggable v-model="notes" :options="{group:'note', animation: 400}">
              <v-card v-for="(note, index) of notes" :key="index">
                <v-card-title class="pt-1 pl-2 pb-1 pr-0">
                  <div class="subheading">{{ note.title }}</div>
                  <v-spacer></v-spacer>
                  <v-btn color="light-blue" small flat icon><v-icon size="15">mode_edit</v-icon></v-btn>
                  <v-btn color="light-blue" small flat icon><v-icon size="15">settings</v-icon></v-btn>
                </v-card-title>
                <v-card-text class="px-2 pt-1">
                  <p class="text-xs-left">
                    {{ note.content }}
                  </p>
                </v-card-text>
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
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'

export default {
  name: 'borads-column',
  props: ['column'],
  data () {
    return {
      dialog: false,
      title: '',
      content: '',
      titleRules: [
        v => (v && v.length > 0) || 'Name must be more than 0 characters'
      ]
    }
  },
  computed: {
    ...mapGetters({
      columnIndex: 'boards/getColumnIndex',
      getNotes: 'boards/getNotes'
    }),
    notes: {
      get () {
        return this.getNotes(this.columnIndex(this.column.name))
      },
      set (list) {
        console.table(list)
        this.$store.commit('boards/setNote', {
          index: this.columnIndex(this.column.name),
          note: list
        })
      }
    }
  },
  methods: {
    addNote () {
      let title = this.title
      let content = this.content
      if (this.validAddNote()) {
        this.$store.commit('boards/addNote', {
          title,
          content,
          index: this.columnIndex(this.column.name)
        })
        this.closeModal()
      }
    },
    closeModal () {
      this.$refs.titleField.reset()
      this.dialog = false
    },
    validAddNote () {
      if (this.title && this.title.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    draggable
  }
}
</script>
