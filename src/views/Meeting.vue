<template>
  <v-row
    class="text-center"
  >
    <v-col
      v-if="meeting"
      cols="12"
    >
      <h1
        class="
          display-2
          font-weight-bold
          mb-3
        "
      >
        {{ meeting.title }}
      </h1>

      <p class="subheading font-weight-regular">
        {{ meeting.description }}
      </p>
    </v-col>

    <v-col>
      <v-btn
        color="secondary"
        to="/meetings"
      >
        leave
      </v-btn>
    </v-col>

    <v-overlay
      :value="loading"
    >
      <v-progress-circular
        indeterminate
        :size="80"
        :width="10"
      />
    </v-overlay>
  </v-row>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import { API, graphqlOperation} from "aws-amplify"
import { getMeeting } from "../graphql/queries"

@Component
export default class Meetings extends Vue {
  meeting = null
  loading = false

  mounted () {
    this.loading = true
    this.singleMeeting().finally(() => { this.loading = false })
  }

  async singleMeeting () {
    const response = await API.graphql(graphqlOperation(
      getMeeting, { id: this.$route.params.id }
    ))
    this.meeting = response.data.getMeeting
    console.log(this.meeting)
  }
}
</script>
