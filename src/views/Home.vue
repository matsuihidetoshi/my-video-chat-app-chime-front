<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Description />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Description from '../components/Description.vue'; // @ is an alias to /src

@Component({
  components: {
    Description,
  },
})
export default class Home extends Vue {}
</script>
