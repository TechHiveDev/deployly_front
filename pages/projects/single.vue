<template>
  <v-layout wrap row class="mt-3">
    <v-row class="white elevation-2">
      <v-col cols="12" md="3">
        <v-flex>
          <h2 class="mb-2">{{ project.name }}</h2>
          <p>
            <v-icon size="18" class="ml-1">mdi mdi-github</v-icon>
            Repo URL: <a target="_blank" :href="project.repoUrl">Click Here</a> <br>
            <v-icon size="18" class="ml-1">mdi mdi-clock</v-icon>
            Last Update At: {{ project.lastUpdate }} <br>
            <v-icon size="18" class="ml-1">mdi mdi-check</v-icon>
            Last Update Status:
            <v-chip  dark :color="statusColors[project.lastUpdateStatus]">
              {{ project.lastUpdateStatus }}
            </v-chip>
            <br>
          </p>
        </v-flex>
        <br>
        <v-btn @click="sendUpdateRequest" dark :loading="disabled" color="blue" >
          <v-icon class="mr-1">mdi mdi-update</v-icon>
          Send Update Request
        </v-btn>
      </v-col>
      <v-col cols="12" md="9">
        <v-flex>
          <h3 class="mb-4">Worker Live Output</h3>
          <textarea ref="codeTextarea" readonly rows="18" cols="10" class="code" v-text="workerOutput"></textarea>
        </v-flex>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>

import socket from 'socket.io-client'

export default {
  name: "singleProject",
  async asyncData({params, $axios, error, store}) {
    try {
      const project = await $axios.$get(`projects/${params.id}`);
      return {project: project}
    } catch (e) {
      error({statusCode: 404, message: 'Group Not Found'})
    }
  },
  head() {
    return {
      title: this.$route.params.name.replace('_', ' ')
    }
  },
  data() {
    return {
      sc: null,
      statusColors: {
        "success": "green",
        "failed": "red",
        "working": "orange"
      },
      workerOutput: "zZzZ Worker is sleeping.\n",
      disabled: false
    }
  },
  mounted() {
    const channelName = `project_${this.$route.params.id}`
    console.log(channelName)
    this.sc = this.$socket
    this.sc.on(channelName, (data) => {
      this.addText(data.output);
      this.project.lastUpdateStatus = data.status
      if (data.status === "working") {
        this.disabled = true
      } else {
        this.disabled = false
      }
    })
  },
  methods: {
    addText: function (text) {
      if (this.workerOutput === 'zZzZ Worker is sleeping.\n')  {
        this.workerOutput = text;
      }
      this.workerOutput += text
      this.$refs.codeTextarea.scrollTop = this.$refs.codeTextarea.scrollHeight
    },
    sendUpdateRequest: function () {
      if (this.disabled) {
        this.$swal.fire('Error',"You cann't submit update request while there's one running","warning")
        return
      }
      this.$axios.$post('/worker/trigger/'+this.project.id);
      this.disabled = true
    }
  },
  watch: {
    project: function () {
      if (this.project.lastUpdateStatus === "working") {
        this.disabled = true
      } else {
        this.disabled = false
      }
    }
  }

}
</script>

<style scoped>
.code {
  background-color: #000;
  border: 1px solid #000;
  color: #00ff00;
  font-size: 14px;
  font-family: courier new;
  width: 100%;
  padding: 10px;
}
</style>
