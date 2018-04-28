<template>
  <v-layout row wrap>
    <v-flex xs12 mb-3>
      <v-card color="shades">
        <v-toolbar color="white">
          <div class="title">Something Board</div>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn
              class="subheading" flat color="light-blue"
              @click="addTodo"
            >
            ADD
            </v-btn>
          </v-card-actions>
        </v-toolbar>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card color="shades" height="800">
        <v-container grid-list-md text-xs-center class="height-100">
          <v-layout row wrap class="height-100">
            <boards-column 
              v-for="(column, index) of columns" :key="index"
              :column="column"
              >
              </boards-column>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import BoardsColumn from '~/components/BoardsColumn.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'boards',
  computed: {
    columns () { return this.$store.state.boards.columns },
    ...mapGetters({
      existsColumn: 'boards/existsColumn'
    })
  },
  methods: {
    addTodo (e) {
      let name = 'aiueo2'
      while (this.existsColumn(name)) {
        name = prompt('change name', '')
      }
      this.$store.commit('boards/addColumn', { name })
    },
    ...mapMutations({
      toggle: 'boards/toggle'
    })
  },
  components: {
    'boards-column': BoardsColumn
  }
}
</script>

<style scoped>
.height-100 {
  height: 100%;
}
</style>

