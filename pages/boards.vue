<template>
  <v-layout row wrap>
    <v-flex xs12 mb-3>
      <v-card color="shades">
        <v-toolbar color="white">
          <div class="title">Something Board</div>
          <v-spacer></v-spacer>
          <v-text-field
            ref="field"
            label="New Column Name"
            v-model="columnName"
            :rules="columnNameRules"
            @keyup.enter.native="addColumn"
          ></v-text-field>
          <v-btn
            class="subheading" flat color="light-blue"
            @click="addColumn"
            :disabled="!validAddColumn()"
          >
          ADD
          </v-btn>
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
  data () {
    return {
      columnName: '',
      columnNameRules: [
        v => (v && v.length > 0) || 'Name must be more than 0 characters',
        v => (v && v.length <= 40) || 'Name must be less than 40 characters',
        v => (!this.existsColumn(v)) || 'Name must not be duplication column name'
      ]
    }
  },
  computed: {
    columns () { return this.$store.state.boards.columns },
    ...mapGetters({
      existsColumn: 'boards/existsColumn'
    })
  },
  methods: {
    addColumn () {
      if (this.validAddColumn()) {
        this.$store.commit('boards/addColumn', { name: this.columnName })
        this.$refs.field.reset()
      }
    },
    validAddColumn () {
      if (this.columnName && this.columnName.length > 0 &&
        this.columnName.length <= 40 && !this.existsColumn(this.columnName)) {
        return true
      } else {
        return false
      }
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

