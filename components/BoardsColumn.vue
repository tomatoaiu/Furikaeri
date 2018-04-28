<template>
  <v-flex xs12 sm4>
    <v-card style="height: 100%; overflow: scroll;">
      <v-card-title class="pb-0 pt-0">
        <div class="title">{{ column.name }}</div>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn
            class="subheading px-0" flat color="light-blue"
            @click="addNote"
          >
          +
          </v-btn>
        </v-card-actions>
      </v-card-title>
      <hr class="my-1">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card v-for="(note, index) of column.notes" :key="index">
              <v-card-title class="pt-1 pl-2 pb-1">
                <div class="subheading">{{ note.title }}</div>
              </v-card-title>
              <v-card-text class="px-2 pt-1">
                {{ note.content }}
              </v-card-text>
              <div class="mb-3" v-if="index + 1 < column.notes.length" :key="index"></div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'borads-column',
  props: ['column'],
  computed: {
    ...mapGetters({
      columnIndex: 'boards/getColumnIndex'
    })
  },
  methods: {
    addNote () {
      let title = 'aiueo2'
      let content = 'qwertyuiopasdfghjklzxcvbnm'
      this.$store.commit('boards/addNote', {
        title,
        content,
        index: this.columnIndex(this.column.name)
      })
    }
  }
}
</script>
