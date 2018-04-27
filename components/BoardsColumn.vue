<template>
  <v-flex xs12 sm4>
    <v-card style="height: 100%; overflow: scroll;">
      <v-card-title>
        <div class="title">Something Name</div>
      </v-card-title>
      <hr class="my-1">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card v-for="(item, index) of items" :key="index">
              <v-card-title class="pt-1 pl-2 pb-1">
                <div class="subheading">{{ item.title }}</div>
              </v-card-title>
              <v-card-text class="px-2 pt-1">
                {{ item.subtitle }}
              </v-card-text>
              <div class="mb-3" v-if="index + 1 < items.length" :key="index"></div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'borads-column',
  data () {
    return {
      items: [
        {
          title: 'aiueo',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
        },
        {
          title: 'abcde',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
        },
        {
          title: 'kakuk',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
        },
        {
          title: 'sasisuseso',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
        }
      ]
    }
  }
}
</script>
