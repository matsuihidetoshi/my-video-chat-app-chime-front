<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Shrimphouse
        </h1>

        <p class="subheading font-weight-regular">
          Realtime video chat app
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Developed by
        </h2>

        <v-row justify="center">
          <a
            href="https://www.matsuihidetoshi.work/"
            class="subheading mx-3"
            target="_blank"
          >
            Matsui Hidetoshi
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <v-btn
          color="primary"
          to="/meetings"
        >
          get started
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Description extends Vue { }
</script>
