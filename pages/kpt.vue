<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm5>
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
      <v-spacer />
      <v-flex xs3 sm3>
        <v-btn flat icon :color="baseColor"
         @click="toNextWeek">
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
        <v-btn flat icon :color="baseColor"
         @click="toLastWeek">
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
        <v-btn flat icon :color="baseColor"
         @click="toYesterday">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn flat icon :color="baseColor"
          @click="toTomorrow">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
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
              @input="removeKeep({ date, item: data.item })"
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
              @input="removeProblem({ date, item: data.item })"
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
              @input="removeTry({ date, item: data.item })"
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
import { mapGetters, mapActions } from 'vuex'

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
        this.setKeep({ date: this.date, list })
      }
    },
    kptProblem: {
      get () {
        return this.getEachKpt('problem')
      },
      set (list) {
        this.setProblem({ date: this.date, list })
      }
    },
    kptTry: {
      get () {
        return this.getEachKpt('try')
      },
      set (list) {
        this.setTry({ date: this.date, list })
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
    if (!this.hasDate(this.date)) {
      this.setNewKpt(this.date)
    }
    this.setRegisterDates()
  },
  methods: {
    ...mapActions({
      setKpt: 'kpt/setKpt',
      setKeep: 'kpt/setKeep',
      setProblem: 'kpt/setProblem',
      setTry: 'kpt/setTry',
      removeKeep: 'kpt/removeKeep',
      removeProblem: 'kpt/removeProblem',
      removeTry: 'kpt/removeTry'
    }),
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
    setNewKpt (date) {
      this.setKpt({
        date,
        content: { keep: [], problem: [], try: [] }
      })
      this.setRegisterDates()
    },
    setRegisterDates () {
      this.registerDates = Object.keys(this.kpt)
    },
    toTomorrow () {
      this.toNextDay(1)
    },
    toYesterday () {
      this.toNextDay(-1)
    },
    toNextWeek () {
      this.toNextDay(7)
    },
    toLastWeek () {
      this.toNextDay(-7)
    },
    toNextDay (direction) {
      const date = new Date(this.date)
      date.setDate(date.getDate() + direction)
      this.date = date.toJSON().slice(0, 10).replace(/-/g, '-')
    }
  }
}
</script>

