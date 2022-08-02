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

    <v-col
      cols="12"
    >
      <div
        id="video-list"
        class="row"
        @fullscreenchange="fullScreen = false"
      />

      <audio
        id="meeting-audio"
        style="display: none"
      />
    </v-col>

    <v-col>
      <v-btn
        color="secondary"
        to="/meetings"
      >
        leave
      </v-btn>
    </v-col>

    <v-snackbar
      v-model="snackbar"
      color="accent"
      top
    >
      <span
        class="
          black--text
          font-weight-bold
        "
      >
        {{ message }}
      </span>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="secondary"
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
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { API, graphqlOperation} from "aws-amplify"
import { getMeeting } from "../graphql/queries"
import { updateMeeting } from "../graphql/mutations"
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration
} from 'amazon-chime-sdk-js'
import axios from 'axios'

@Component
export default class Meeting extends Vue {
  meeting = null
  loading = false
  snackbar = false
  message = ''
  logger: any
  fullScreen = false
  deviceController: any
  configuration: any
  meetingSession: any
  meetingResponse = null
  meetingId = ''
  hogehoge = 'hogehoge'
  attendeeResponse = null
  audioOutputElement: any
  $route: any
  $store: any

  mounted () {
    this.loading = true
    this.singleMeeting().then(() => {
      this.attend().then(() => {
        this.start()
      })
    }).finally(() => { this.loading = false })
  }

  beforeDestroy () {
    if (this.meetingSession) { this.meetingSession.audioVideo.stop() }
  }

  async singleMeeting () {
    const response: any = await API.graphql(graphqlOperation(
      getMeeting, { id: this.$route.params.id }
    ))
    this.meeting = response.data.getMeeting
    this.meetingId = response.data.getMeeting.meetingId
  }

  async updateMeetingId () {
    this.loading = true
    const meeting = {
      id: this.$route.params.id,
      meetingId: this.meetingId
    }
    try {
      await API.graphql(
        graphqlOperation(
          updateMeeting,
          { input: meeting }
        )
      )
      this.loading = false
    } catch (error) {
      this.message = error
      this.snackbar = true
      this.loading = false
    }
  }

  generateString() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    )
  }

  async requestChimeMeeting () {
    this.loading = true
    await axios.get(`${process.env.VUE_APP_MYVIDEOCHATAPP_CHIME_HANDLER_ENDPOINT}?clientId=` + this.generateString(),
    {
      headers: { "Authorization": this.$store.state.user.signInUserSession.idToken.jwtToken },
      data: {}
    }).then((response: any) => (
      this.meetingId = response.data.Info.Meeting.Meeting.MeetingId,
      this.updateMeetingId().then(() => {
        this.attend().then(() => {
          this.start()
        })
      })
    )).catch((error: any) => (
      this.meetingId = error
    )).finally(() => {
      this.loading = false
    })
  }

  async attend () {
    this.loading = true
    await axios.get(`${process.env.VUE_APP_MYVIDEOCHATAPP_CHIME_HANDLER_ENDPOINT}?clientId=` +
      this.generateString() + '&meetingId=' + this.meetingId,
    {
      headers: { "Authorization": this.$store.state.user.signInUserSession.idToken.jwtToken },
      data: {}
    }).then((response: any) => {
      this.meetingResponse = response.data.Info.Meeting
      this.attendeeResponse = response.data.Info.Attendee
    }).catch(() => {
      this.requestChimeMeeting()
    }).finally(() => {
      this.loading = false
    })
  }

  async start () {
    this.loading = true
    try {
      this.logger = new ConsoleLogger('MyLogger', LogLevel.INFO)
      this.deviceController = new DefaultDeviceController(this.logger)
      this.configuration = new MeetingSessionConfiguration(
        this.meetingResponse,
        this.attendeeResponse
      )
      this.meetingSession = new DefaultMeetingSession(
        this.configuration,
        this.logger,
        this.deviceController
      )
      const audioInputs = await this.meetingSession.audioVideo.listAudioInputDevices()
      const videoInputs = await this.meetingSession.audioVideo.listVideoInputDevices()
      await this.meetingSession.audioVideo.chooseAudioInputDevice(
        audioInputs[0].deviceId
      )
      await this.meetingSession.audioVideo.chooseVideoInputDevice(
        videoInputs[0].deviceId
      )
      const observer = {
        videoTileDidUpdate: (tileState: any) => {
          if (!tileState.boundAttendeeId) {
            return
          }
          this.updateTiles(this.meetingSession)
        }
      }
      this.meetingSession.audioVideo.addObserver(observer)
      this.meetingSession.audioVideo.startLocalVideoTile()
      const audioOutputElement = document.getElementById('meeting-audio')
      this.meetingSession.audioVideo.bindAudioElement(audioOutputElement)
      this.meetingSession.audioVideo.start()
      this.audioOutputElement = audioOutputElement
      this.loading = false
    } catch (err) {
      /* console.log(err) */
      this.loading = false
    }
  }

  updateTiles (meetingSession: any) {
    this.loading = true
    const tiles = meetingSession.audioVideo.getAllVideoTiles()
    /* console.log("tiles", tiles) */
    tiles.forEach((tile: any) => {
      const tileId = tile.tileState.tileId
      let videoElement = document.getElementById('video-' + tileId)
      if (!videoElement) {
        videoElement = document.createElement('video')
        videoElement.id = 'video-' + tileId
        videoElement.classList.add('col-4')
        const videoList: any = document.getElementById('video-list')
        if (videoList) { videoList.append(videoElement) }
        meetingSession.audioVideo.bindVideoElement(
          tileId,
          videoElement
        )
      }
    })
    this.loading = false
  }
}
</script>
