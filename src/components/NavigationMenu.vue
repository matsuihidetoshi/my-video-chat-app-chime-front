<template>
  <v-list>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :to="item.to"
      router
      exact
    >
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title v-text="item.name" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  data () {
    return {
      items: [
        {
          name: 'Meetings',
          to: '/meetings',
          icon: 'mdi-apps'
        }
      ]
    }
  }
})

export default class NavigationMenu extends Vue { }
</script>
