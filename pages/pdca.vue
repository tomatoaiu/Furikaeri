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
      <v-flex xs12 md3>
        <p class="display-2">PLAN</p>
        <v-select
          label="PLAN"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="pdcaPlan"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removePlan(data.item)"
              :selected="data.selected"
              :color="pdcaColor.plan"
              text-color="white"
            >
              <v-avatar :color="pdcaColor.planAvatar">P</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md3>
        <p class="display-2">DO</p>
        <v-select
          label="DO"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="pdcaDo"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeDo(data.item)"
              :selected="data.selected"
              :color="pdcaColor.do"
              text-color="white"
            >
              <v-avatar :color="pdcaColor.doAvatar">D</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md3>
        <p class="display-2">CHECK</p>
        <v-select
          label="CHECK"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="pdcaCheck"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeCheck(data.item)"
              :selected="data.selected"
              :color="pdcaColor.check"
              text-color="white"
            >
              <v-avatar :color="pdcaColor.checkAvatar">C</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md3>
        <p class="display-2">ACTION</p>
        <v-select
          label="ACTION"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="pdcaAction"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeAction(data.item)"
              :selected="data.selected"
              :color="pdcaColor.action"
              text-color="white"
            >
              <v-avatar :color="pdcaColor.actionAvatar">A</v-avatar>
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
      pdcaColor: 'color/pdcaColor',
      pdca: 'pdca/pdca'
    }),
    pdcaPlan: {
      get () {
        return this.getEachPdca('plan')
      },
      set (list) {
        this.setEacePdca('pdca/setPlan', list)
      }
    },
    pdcaDo: {
      get () {
        return this.getEachPdca('do')
      },
      set (list) {
        this.setEacePdca('pdca/setDo', list)
      }
    },
    pdcaCheck: {
      get () {
        return this.getEachPdca('check')
      },
      set (list) {
        this.setEacePdca('pdca/setCheck', list)
      }
    },
    pdcaAction: {
      get () {
        return this.getEachPdca('action')
      },
      set (list) {
        this.setEacePdca('pdca/setAction', list)
      }
    }
  },
  watch: {
    date (next, prev) {
      if (!this.hasDate(next)) {
        this.setNewPdca(next)
      }
    }
  },
  mounted () {
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    this.setRegisterDates()
  },
  methods: {
    removeEacePdca (pdcaWord, item) {
      this.$store.commit(pdcaWord, { date: this.date, item })
    },
    removePlan (item) {
      this.removeEacePdca('pdca/removePlan', item)
    },
    removeDo (item) {
      this.removeEacePdca('pdca/removeDo', item)
    },
    removeCheck (item) {
      this.removeEacePdca('pdca/removeCheck', item)
    },
    removeAction (item) {
      this.removeEacePdca('pdca/removeAction', item)
    },
    hasDate (date) {
      if (date in this.pdca) {
        return true
      } else {
        return false
      }
    },
    getEachPdca (pdcaWord) {
      if (this.hasDate(this.date)) {
        return this.pdca[this.date][pdcaWord]
      }
    },
    setEacePdca (mutationWord, list) {
      if (this.hasDate(this.date)) {
        this.$store.commit(mutationWord, { date: this.date, list })
      } else {
        this.setNewPdca(this.date)
        this.$store.commit(mutationWord, { date: this.date, list })
      }
    },
    setNewPdca (date) {
      this.$store.commit('pdca/setPdca', {
        date,
        content: { plan: [], do: [], check: [], action: [] }
      })
      this.setRegisterDates()
    },
    setRegisterDates () {
      this.registerDates = Object.keys(this.pdca)
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
