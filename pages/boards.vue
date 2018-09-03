<template>
  <v-layout row wrap>
    <v-flex xs12 mb-3>
      <v-card color="shades">
        <v-toolbar color="white" v-resize="onResize">
          <div class="title">Something Board</div>
          <v-spacer></v-spacer>
          <v-text-field
            v-if="windowSize.x >= 600"
            ref="field"
            label="New Column Name"
            v-model="columnName"
            :rules="columnNameRules"
            @keyup.enter.native="addNewColumn"
            v-on:blur="clearInput"
            :color="baseColor"
          ></v-text-field>
          <v-dialog v-model="dialog" persistent max-width="500px"
          v-else>
            <v-btn :color="baseColor" flat small dark slot="activator"
            >Add Column</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">Please input new column name</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                        ref="modalField"
                        label="New name column"
                        v-model="columnName"
                        :rules="columnNameRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :color="baseColor" flat @click.native="closeModal">Cancel</v-btn>
                  <v-btn :color="baseColor" flat 
                    @click.native="addColumnOnMobail"
                    :disabled="!validAddColumn()"
                    >ADD</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card color="shades" height="800">
        <v-container grid-list-md text-xs-center class="height-100">
          <v-layout row wrap class="height-100 overflow-scroll">
            <boards-column 
              v-for="(column, index) of columns" :key="index"
              :column="column">
            </boards-column>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import BoardsColumn from '~/components/BoardsColumn.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'boards',
  data () {
    return {
      dialog: false,
      windowSize: {
        x: 0,
        y: 0
      },
      columnName: '',
      columnNameRules: [
        v => (v && v.length > 0) || 'Name must be more than 0 characters',
        v => (v && v.length <= 40) || 'Name must be less than 40 characters',
        v => (!this.existsColumn(v)) || 'Name must not be duplication column name'
      ]
    }
  },
  computed: {
    ...mapGetters({
      columns: 'boards/columns',
      existsColumn: 'boards/existsColumn',
      baseColor: 'color/base'
    })
  },
  mounted () {
    this.onResize()
  },
  methods: {
    ...mapActions({
      addColumn: 'boards/addColumn'
    }),
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    addNewColumn () {
      if (this.validAddColumn()) {
        this.addColumn({ name: this.columnName })
        this.$refs.field.reset()
      }
    },
    addColumnOnMobail () {
      if (this.validAddColumn()) {
        this.addColumn({ name: this.columnName })
        this.closeModal()
      }
    },
    closeModal () {
      this.$refs.modalField.reset()
      this.dialog = false
    },
    validAddColumn () {
      if (this.columnName && this.columnName.length > 0 &&
        this.columnName.length <= 40 && !this.existsColumn(this.columnName)) {
        return true
      } else {
        return false
      }
    },
    clearInput () {
      this.$refs.field.reset()
    },
    getScreenWidth () {
      return this.$vuetify.breakpoint.width
    }
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

.overflow-scroll {
  overflow: scroll;
}
</style>

