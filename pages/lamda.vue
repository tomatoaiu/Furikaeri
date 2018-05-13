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
            reaasknly
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
      <v-flex xs12 md2>
        <p class="display-2">LOOK</p>
        <v-select
          label="LOOK"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="Lamda"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeLook(data.item)"
              :selected="data.selected"
              :color="lamdaColor.look"
              text-color="white"
            >
              <v-avatar :color="lamdaColor.lookAvatar">L</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md2>
        <p class="display-2">ASK</p>
        <v-select
          label="ASK"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="lamdaAsk"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeAsk(data.item)"
              :selected="data.selected"
              :color="lamdaColor.ask"
              text-color="white"
            >
              <v-avatar :color="lamdaColor.askAvatar">A</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md2>
        <p class="display-2">MODEL</p>
        <v-select
          label="MODEL"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="lamdaModel"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeModel(data.item)"
              :selected="data.selected"
              :color="lamdaColor.model"
              text-color="white"
            >
              <v-avatar :color="lamdaColor.modelAvatar">M</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md2>
        <p class="display-2">DISCUSS</p>
        <v-select
          label="DISCUSS"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="lamdaDiscuss"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeDiscuss(data.item)"
              :selected="data.selected"
              :color="lamdaColor.discuss"
              text-color="white"
            >
              <v-avatar :color="lamdaColor.discussAvatar">D</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md2>
        <p class="display-2">ACT</p>
        <v-select
          label="ACT"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="lamdaAct"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeAct(data.item)"
              :selected="data.selected"
              :color="lamdaColor.act"
              text-color="white"
            >
              <v-avatar :color="lamdaColor.actAvatar">A</v-avatar>
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
      lamdaColor: 'color/lamdaColor',
      lamda: 'lamda/lamda'
    }),
    Lamda: {
      get () {
        return this.getEachLamda('look')
      },
      set (list) {
        this.setEaceLamda('lamda/setLook', list)
      }
    },
    lamdaAsk: {
      get () {
        return this.getEachLamda('ask')
      },
      set (list) {
        this.setEaceLamda('lamda/setAsk', list)
      }
    },
    lamdaModel: {
      get () {
        return this.getEachLamda('model')
      },
      set (list) {
        this.setEaceLamda('lamda/setModel', list)
      }
    },
    lamdaDiscuss: {
      get () {
        return this.getEachLamda('discuss')
      },
      set (list) {
        this.setEaceLamda('lamda/setDiscuss', list)
      }
    },
    lamdaAct: {
      get () {
        return this.getEachLamda('act')
      },
      set (list) {
        this.setEaceLamda('lamda/setAct', list)
      }
    }
  },
  watch: {
    date (next, prev) {
      if (!this.hasDate(next)) {
        this.setNewLamda(next)
      }
    }
  },
  mounted () {
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    this.setRegisterDates()
  },
  methods: {
    removeEaceLamda (lamdaWord, item) {
      this.$store.commit(lamdaWord, { date: this.date, item })
    },
    removeLook (item) {
      this.removeEaceLamda('lamda/removeLook', item)
    },
    removeAsk (item) {
      this.removeEaceLamda('lamda/removeAsk', item)
    },
    removeModel (item) {
      this.removeEaceLamda('lamda/removeModel', item)
    },
    removeDiscuss (item) {
      this.removeEaceLamda('lamda/removeDiscuss', item)
    },
    removeAct (item) {
      this.removeEaceLamda('lamda/removeAct', item)
    },
    hasDate (date) {
      if (date in this.lamda) {
        return true
      } else {
        return false
      }
    },
    getEachLamda (lamdaWord) {
      if (this.hasDate(this.date)) {
        return this.lamda[this.date][lamdaWord]
      }
    },
    setEaceLamda (mutationWord, list) {
      if (this.hasDate(this.date)) {
        this.$store.commit(mutationWord, { date: this.date, list })
      } else {
        this.setNewLamda(this.date)
        this.$store.commit(mutationWord, { date: this.date, list })
      }
    },
    setNewLamda (date) {
      this.$store.commit('lamda/setLamda', {
        date,
        content: { look: [], ask: [], model: [], discuss: [], act: [] }
      })
      this.setRegisterDates()
    },
    setRegisterDates () {
      this.registerDates = Object.keys(this.lamda)
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
