<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile to="/cucumber-runner">
          <v-list-tile-content>
            <v-list-tile-title>Cucumber Runner</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/test-case-extractor">
          <v-list-tile-content>
            <v-list-tile-title>Test Case Extractor</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Datatest</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout class="main-content">
          <v-flex>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import * as Cucumber from 'cucumber'

export default {
  data: () => ({
    drawer: false
  }),
  created () {
    console.log(Cucumber)
  }
}
</script>
