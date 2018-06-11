<template>
  <v-layout row wrap>
    <v-flex xs12 sm12>
      <v-card>
        <v-list>
          <v-list-group
            v-for="item in items"
            v-model="item.active"
            :key="item.title"
            :prepend-icon="item.action"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="setBaseColor({ color: subItem.title })">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      items: [
        {
          action: 'local_activity',
          title: 'Colors',
          items: [
            { title: 'light-blue' },
            { title: 'orange' },
            { title: 'red' },
            { title: 'green' },
            { title: 'yellow' }
          ]
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      setBaseColor: 'color/setBaseColor'
    })
  }
}
</script>
