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
          <v-date-picker
            v-model="date"
            no-title scrollable
            :color="baseColor"
            event-color="green"
            :events="registerDates">
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
          label="KEEP"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="kptKeep"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeKeep(data.item)"
              :selected="data.selected"
              :color="kptColor.keep"
              text-color="white"
            >
              <v-avatar :color="kptColor.keepAvatar">K</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md4>
        <p class="display-2">PROBLEM</p>
        <v-select
          label="PROBLEM"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="kptProblem"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeProblem(data.item)"
              :selected="data.selected"
              :color="kptColor.problem"
              text-color="white"
            >
              <v-avatar :color="kptColor.problemAvatar">P</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md4>
        <p class="display-2">TRY</p>
        <v-select
          label="TRY"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="kptTry"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeTry(data.item)"
              :selected="data.selected"
              :color="kptColor.try"
              text-color="white"
            >
              <v-avatar :color="kptColor.tryAvatar">T</v-avatar>
              <strong>{{ data.item }}</strong>
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
      menu: false,
      date: undefined,
      registerDates: undefined
    }
  },
  computed: {
    ...mapGetters({
      baseColor: 'color/baseColor',
      kptColor: 'color/kptColor',
      kpt: 'kpt/kpt',
      kptWithDate: 'kpt/kptWithDate'
    }),
    kptKeep: {
      get () {
        return this.getEachKpt('keep')
      },
      set (list) {
        this.setEachKpt('kpt/setKeep', list)
      }
    },
    kptProblem: {
      get () {
        return this.getEachKpt('problem')
      },
      set (list) {
        this.setEachKpt('kpt/setProblem', list)
      }
    },
    kptTry: {
      get () {
        return this.getEachKpt('try')
      },
      set (list) {
        this.setEachKpt('kpt/setTry', list)
      }
    }
  },
  watch: {
    date (next, prev) {
      if (!this.hasDate(next)) {
        this.setNewKpt(next)
      }
    }
  },
  mounted () {
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    this.setRegisterDates()
  },
  methods: {
    removeEachKpt (kptWord, item) {
      this.$store.commit(kptWord, { date: this.date, item })
    },
    removeKeep (item) {
      this.removeEachKpt('kpt/removeKeep', item)
    },
    removeProblem (item) {
      this.removeEachKpt('kpt/removeProblem', item)
    },
    removeTry (item) {
      this.removeEachKpt('kpt/removeTry', item)
    },
    hasDate (date) {
      if (date in this.kpt) {
        return true
      } else {
        return false
      }
    },
    getEachKpt (kptWord) {
      if (this.hasDate(this.date)) {
        return this.kpt[this.date][kptWord]
      }
    },
    setEachKpt (mutationWord, list) {
      if (this.hasDate(this.date)) {
        this.$store.commit(mutationWord, { date: this.date, list })
      } else {
        this.setNewKpt(this.date)
        this.$store.commit(mutationWord, { date: this.date, list })
      }
    },
    setNewKpt (date) {
      this.$store.commit('kpt/setKpt', {
        date,
        content: { keep: [], problem: [], try: [] }
      })
      this.setRegisterDates()
    },
    setRegisterDates () {
      this.registerDates = Object.keys(this.kpt)
    }
  }
}
</script>

