<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <navigation-menu />
    </v-navigation-drawer>

    <v-app-bar
      color="white"
      collapse-on-scroll
      elevate-on-scroll
      fixed
      app
    >
      <v-app-bar-nav-icon
        class="ml-1"
        @click.stop="drawer = !drawer"
      >
        <v-img
          alt="Shrimphouse Logo"
          class="shrink mr-2"
          contain
          src="/img/icons/android-chrome-512x512.png"
          transition="scale-transition"
          width="40"
        />
      </v-app-bar-nav-icon>

      <v-spacer />

      <v-toolbar-title
        class="font-weight-bold"
        v-text="title"
      />
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer
      absolute
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} &nbsp; Shrimphouse</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavigationMenu from './components/NavigationMenu.vue'
import Description from './components/Description.vue'

@Component({
  components: {
    NavigationMenu,
    Description
  }
})

export default class App extends Vue {
  title = 'Shrimphouse'
  drawer = false
}
</script>
