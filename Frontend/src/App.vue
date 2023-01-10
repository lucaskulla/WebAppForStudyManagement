<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <div>

      <v-app-bar color="#004a6f" dark flat elevate-on-scroll>
        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab to="/">Start</v-tab>
            <v-tab to="/patients">Teilnehmer/innen</v-tab>
          </v-tabs>
        </template>

        <v-spacer/>
        <v-spacer/>
        <v-spacer/>
        <v-spacer/>
        <v-spacer/>
        <v-spacer/>
        <v-spacer/>
        <v-spacer/>
        <v-spacer/>

        <v-col>
          <v-row>
            <v-toolbar-title>UNIVERSITÄTSKLINIKUM</v-toolbar-title>
          </v-row>
          <v-row>
            <v-toolbar-title>HEIDELBERG</v-toolbar-title>
          </v-row>
        </v-col>

      </v-app-bar>
      <router-view/>
    </div>
  </v-app>
</template>
<script>
export default {
  name: 'App',

  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },

  data: () => ({
    //
  }),
  methods: {
    deleteItem(item) {
      this.myModel = this.myModel.filter(find => find !== item);
    }
  }

};
</script>
