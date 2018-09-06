<template>
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
        :color="color"
      >
        <v-text-field
          :color="color"
          slot="activator"
          label="Picker in menu"
          v-model="date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="date"
          no-title scrollable
          :color="color"
          event-color="green"
          :events="registerDates">
          <v-spacer></v-spacer>
          <v-btn flat :color="color" @click="menu = false">Cancel</v-btn>
          <v-btn flat :color="color" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-spacer />
    <v-flex xs3 sm3>
      <v-btn flat icon :color="color"
        @click="$emit('toNextWeek')">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <v-btn flat icon :color="color"
        @click="$emit('toLastWeek')">
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-btn flat icon :color="color"
        @click="$emit('toYesterday')">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn flat icon :color="color"
        @click="$emit('toTomorrow')">
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'furikaeri-header',
  props: ['date', 'menu', 'color', 'registerDates']
}
</script>

