<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app
      :clipped-left="clipped"
      :color="baseColor"
    >
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="!isSignUp">
        <v-btn outline small dark @click="callAuth">
          sign in / sign up
        </v-btn>
      </div>
      <v-menu v-else bottom offset-y>
        <v-avatar slot="activator" color="white" size="40" title="user">
          <img :src="user.icon" alt="avatar">
        </v-avatar>
        <v-list>
          <v-list-tile v-for="(item, i) in userLinks" :key="i" @click="">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 <a href="https://github.com/tomatoaiu" target="_blank">tomatoaiu</a></span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Usage', to: '/' },
        { icon: 'view_column', title: 'Boards', to: '/boards' },
        { icon: 'replay', title: 'KPT', to: '/kpt' },
        { icon: 'replay', title: 'YWT', to: '/ywt' },
        { icon: 'replay', title: '4LinesDiary', to: '/fourLinesDiary' },
        { icon: 'replay', title: 'LAMDA', to: '/lamda' },
        { icon: 'replay', title: 'ExperientialLearning', to: '/experientialLearning' },
        { icon: 'replay', title: 'GapAnalysis', to: '/gapAnalysis' },
        { icon: 'replay', title: 'PDCA', to: '/pdca' },
        { icon: 'apps', title: 'Calendar', to: '/calendar' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Furikaeri',
      showAvatar: false,
      userLinks: [
        { title: 'SIGN OUT' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      baseColor: 'color/baseColor',
      user: 'user/user',
      isSignUp: 'user/isSignUp'
    })
  },
  methods: {
    ...mapActions({
      callAuth: 'user/callAuth'
    })
  }
}
</script>
