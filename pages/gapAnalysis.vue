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
        <p class="display-2">ASIS</p>
        <v-select
          label="ASIS"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="gapAnalysisAsis"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeAsis(data.item)"
              :selected="data.selected"
              :color="gapAnalysisColor.asis"
              text-color="white"
            >
              <v-avatar :color="gapAnalysisColor.asisAvatar">A</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md4>
        <p class="display-2">TOBE</p>
        <v-select
          label="TOBE"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="gapAnalysisTobe"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeToBe(data.item)"
              :selected="data.selected"
              :color="gapAnalysisColor.tobe"
              text-color="white"
            >
              <v-avatar :color="gapAnalysisColor.tobeAvatar">T</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md4>
        <p class="display-2">GAP</p>
        <v-select
          label="GAP"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="gapAnalysisGap"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeGap(data.item)"
              :selected="data.selected"
              :color="gapAnalysisColor.gap"
              text-color="white"
            >
              <v-avatar :color="gapAnalysisColor.gapAvatar">G</v-avatar>
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
      gapAnalysisColor: 'color/gapAnalysisColor',
      gapAnalysis: 'gapAnalysis/gapAnalysis'
    }),
    gapAnalysisAsis: {
      get () {
        return this.getEachGapAnalysis('asis')
      },
      set (list) {
        this.setEachGapAnalysis('gapAnalysis/setAsis', list)
      }
    },
    gapAnalysisTobe: {
      get () {
        return this.getEachGapAnalysis('tobe')
      },
      set (list) {
        this.setEachGapAnalysis('gapAnalysis/setTobe', list)
      }
    },
    gapAnalysisGap: {
      get () {
        return this.getEachGapAnalysis('gap')
      },
      set (list) {
        this.setEachGapAnalysis('gapAnalysis/setGap', list)
      }
    }
  },
  watch: {
    date (next, prev) {
      if (!this.hasDate(next)) {
        this.setNewGapAnalysis(next)
      }
    }
  },
  mounted () {
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    this.setRegisterDates()
  },
  methods: {
    removeEachGapAnalysis (gapAnalysisWord, item) {
      this.$store.commit(gapAnalysisWord, { date: this.date, item })
    },
    removeAsis (item) {
      this.removeEachGapAnalysis('gapAnalysis/removeAsis', item)
    },
    removeToBe (item) {
      this.removeEachGapAnalysis('gapAnalysis/removeTobe', item)
    },
    removeGap (item) {
      this.removeEachGapAnalysis('gapAnalysis/removeGap', item)
    },
    hasDate (date) {
      if (date in this.gapAnalysis) {
        return true
      } else {
        return false
      }
    },
    getEachGapAnalysis (gapAnalysisWord) {
      if (this.hasDate(this.date)) {
        return this.gapAnalysis[this.date][gapAnalysisWord]
      }
    },
    setEachGapAnalysis (mutationWord, list) {
      if (this.hasDate(this.date)) {
        this.$store.commit(mutationWord, { date: this.date, list })
      } else {
        this.setNewGapAnalysis(this.date)
        this.$store.commit(mutationWord, { date: this.date, list })
      }
    },
    setNewGapAnalysis (date) {
      this.$store.commit('gapAnalysis/setGapAnalysis', {
        date,
        content: { asis: [], tobe: [], gap: [] }
      })
      this.setRegisterDates()
    },
    setRegisterDates () {
      this.registerDates = Object.keys(this.gapAnalysis)
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
