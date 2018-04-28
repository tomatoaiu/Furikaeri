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
            <v-card v-for="(note, index) of notes" :key="index">
              <v-card-title class="pt-1 pl-2 pb-1">
                <div class="subheading">{{ note.title }}</div>
              </v-card-title>
              <v-card-text class="px-2 pt-1">
                {{ note.content }}
              </v-card-text>
              <div class="mb-3" v-if="index + 1 < notes.length" :key="index"></div>
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
  props: ['notes'],
  data () {
    return {
      items: [
        {
          title: 'aiueo',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
        },
        {
          title: 'abcde',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
        },
        {
          title: 'kakuk',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
        },
        {
          title: 'sasisuseso',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
        }
      ]
    }
  }
}
</script>
