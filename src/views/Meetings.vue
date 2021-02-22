<template>
  <div class="meeting">
    <v-btn
      color="success"
      @click="newMeetingForm = true"
    >
      new meeting
    </v-btn>

    <v-dialog
      v-model="newMeetingForm"
    >
      <v-card>
        <v-card-title
          class="
            headline
            grey
            lighten-2
          "
        >
          Create new meeting
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="title"
              label="Title"
            />

            <v-textarea
              v-model="description"
              label="Description"
            />
          </v-form>

          <v-text-field
            v-model="meetingId"
            label="Meeting ID"
          />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            @click="newMeetingForm = false"
          >
            cancel
          </v-btn>

          <v-btn
            color="success"
            @click="newMeetingForm = false, createMeeting()"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col
        v-for="(meeting, index) in meetings"
        :key="index"
        cols="12"
        :md="index === 0 ? 12 : 6"
      >
        <v-card
          class="
            pa-3
            breakline
          "
        >
          <v-card-title
            v-text="meeting.title"
          />

          <v-card-subtitle
            v-text="meeting.meetingId"
          />

          <v-card-text
            v-text="meeting.description"
          />

          <v-row>
            <v-spacer />

            <v-btn
              color="error"
              @click="deleteConfirmation = true, deleteIndex = index"
              class="mr-2"
            >
              delete
            </v-btn>

            <v-dialog
              v-model="deleteConfirmation"
            >
              <v-card>
                <v-card-title>
                  Confirmation: Delete
                </v-card-title>

                <v-card-text>
                  Are you sure?
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="warning"
                    @click="deleteConfirmation = false"
                  >
                    cancel
                  </v-btn>

                  <v-btn
                    color="error"
                    @click="deleteConfirmation = false, deleteMeeting(deleteIndex)"
                  >
                    delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn
              color="primary"
              :to="'/meetings/' + meeting.id"
              class="mr-2"
            >
              edit
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-overlay
      :value="loading"
    >
      <v-progress-circular
        indeterminate
        :size="80"
        :width="10"
      />
    </v-overlay>

    <v-snackbar
      v-model="snackbar"
      color="blue-grey"
      top
    >
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="#FF9900"
          class="
            font-weight-bold
          "
          v-bind="attrs"
          @click="snackbar = false"
        >
          close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import { API, graphqlOperation} from "aws-amplify"
import { createMeeting, updateMeeting, deleteMeeting } from "../graphql/mutations"
import { listMeetings } from "../graphql/queries"
import { getMeeting } from "../graphql/queries"
import { onCreateMeeting } from "../graphql/subscriptions"
import _ from 'lodash'

@Component
export default class Meetings extends Vue {
  title = ""
  description = ""
  meetingId = ""
  meeting = null
  meetings = []
  owner = ""
  limit = 2 ** 31 - 1
  newMeetingForm = false
  deleteConfirmation = false
  deleteIndex = null
  loading = false
  snackbar = false
  message = null

  mounted () {
    this.owner = this.$store.state.user.username
    this.displayMeetings()
  }

  async createMeeting () {
    this.loading = true
    const meeting = {
      title: this.title,
      description: this.description,
      meetingId: this.meetingId
    }
    try {
      this.meetingId = this.title = this.description = ""
      await API.graphql(graphqlOperation(createMeeting, {input: meeting}))
      this.loading = false
      this.message = "Created"
      this.snackbar = true
    } catch (error) {
      error
      this.loading = false
      this.message = "Create failed"
      this.snackbar = true
    }
  }

  async updateMeeting (index) {
    this.loading = true
    const meeting = {
      id: this.meetings[index].id,
      title: this.meetings[index].title,
      description: this.meetings[index].description,
      meetingId: this.meetings[index].meetingId
    }
    try {
      await API.graphql(
        graphqlOperation(
          updateMeeting,
          { input: meeting }
        )
      )
      this.loading = false
      this.message = "Updated"
      this.snackbar = true
    } catch (error) {
      error
      this.loading = false
      this.message = "Update failed"
      this.snackbar = true
    }
  }

  async deleteMeeting (index) {
    this.loading = true
    const meeting = {
      id: this.meetings[index].id
    }
    try {
      await API.graphql(
        graphqlOperation(
          deleteMeeting,
          { input: meeting }
        )
      )
      this.loading = false
      this.message = "Deleted"
      this.snackbar = true
    } catch (error) {
      error
      this.loading = false
      this.message = "Delete failed"
      this.snackbar = true
    }
    this.displayMeetings()
  }

  async displayMeetings () {
    const meetings = await API.graphql(graphqlOperation(
      listMeetings, { limit: this.limit }
    ))
    this.meetings = _.orderBy(meetings.data.listMeetings.items, 'createdAt', 'asc')
    
    API.graphql(
      graphqlOperation(onCreateMeeting, { limit: this.limit, owner: this.owner })
    ).subscribe({
      next: (eventData) => {
        const meeting = eventData.value.data.onCreateMeeting
        const meetings = [...this.meetings, meeting]
        this.meetings = _.orderBy(meetings, 'createdAt', 'asc')
      }
    })
  }

  async singleMeeting (selectedMeeting) {
    const meeting = await API.graphql(graphqlOperation(
      getMeeting, { id: selectedMeeting.id }
    ))
    this.meeting = meeting
  }
}
</script>
<style scoped>
.breakline {
  white-space: pre-wrap;
}
</style>
