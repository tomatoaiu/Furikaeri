<template>
  <div>
    <v-layout row wrap>
      <v-flex xs11 sm5>
        <v-menu
          ref="menu"
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          min-width="290px"
          :return-value.sync="date"
          :color="baseColor"
        >
          <v-text-field
            :color="baseColor"
            slot="activator"
            label="Picker in menu"
            v-model="date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" no-title scrollable :color="baseColor">
            <v-spacer></v-spacer>
            <v-btn flat :color="baseColor" @click="menu = false">Cancel</v-btn>
            <v-btn flat :color="baseColor" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <p class="display-2">KEEP</p>
        <v-select
          label="Your favorite hobbies"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="chips"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="remove(data.item)"
              :selected="data.selected"
            >
              <strong>{{ data.item }}</strong>&nbsp;
              <span>(interest)</span>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md4>
        <p class="display-2">PROBLEM</p>
        <v-select
          label="Your favorite hobbies"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="chips"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="remove(data.item)"
              :selected="data.selected"
            >
              <strong>{{ data.item }}</strong>&nbsp;
              <span>(interest)</span>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md4>
        <p class="display-2">TRY</p>
        <v-select
          label="Your favorite hobbies"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="chips"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="remove(data.item)"
              :selected="data.selected"
            >
              <strong>{{ data.item }}</strong>&nbsp;
              <span>(interest)</span>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      date: null,
      menu: false,
      chips: ['Programming', 'Playing video games', 'Watching', 'Sleeping']
    }
  },
  computed: {
    ...mapGetters({
      baseColor: 'color/baseColor'
    })
  },
  methods: {
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    }
  }
}
</script>

