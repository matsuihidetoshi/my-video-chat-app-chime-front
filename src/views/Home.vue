<template>
  <div class="home">
    <Description
      class="mt-12"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Description from '../components/Description.vue'

@Component({
  components: {
    Description
  }
})

export default class Home extends Vue {
}
</script>
