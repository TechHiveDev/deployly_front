<template>
  <v-layout wrap row class="mt-4">
    <v-row>
      <v-col lg="12">
        <v-card>
          <v-row>
            <v-col md="12" lg="12">
              <v-toolbar
                flat
                color="grey lighten-4"
                light
              >
                <v-toolbar-title>
                  <v-icon size="28" class="mr-1">
                    mdi mdi-apps
                  </v-icon>
                  Project Groups
                </v-toolbar-title>
              </v-toolbar>
            </v-col>
            <v-col cols="12" md="2">
              <v-tabs color="purple" vertical v-model="tap">
                <v-tab class="justify-start" v-for="group in groups" :key="group.id">
                  <v-icon left>
                    mdi-source-branch
                  </v-icon>
                  {{ group.name }}
                </v-tab>
              </v-tabs>
              <br>
              <div class="w-100">
                <v-btn v-if="$auth.user.isAdmin" class="w-100" @click.stop="newGroupDialog" text color="purple">
                  <v-icon>mdi mdi-plus</v-icon>
                  Add Group
                </v-btn>
              </div>
            </v-col>
            <v-col cols="10">
              <v-card-text v-if="tap != null">
                <v-row>
                  <v-col v-for="project in groups[tap].projects" :key="project.id" cols="4" md="4">
                    <v-card>
                      <v-card-text>
                        <router-link style="text-decoration: none" :to="{name:'projects.single',params:{id:project.id,name:project.name}}">
                          <h3>
                            {{ project.name }}
                            <v-icon size="18">mdi mdi-arrow-right</v-icon>
                          </h3>
                        </router-link>
                        <br>
                        Repo URL: <a target="_blank" :href="project.repoUrl">Click Here</a> <br>
                        Last Update At: {{ project.lastUpdate }} <br>
                        Last Update Status: <v-chip dark :color="statusColors[project.lastUpdateStatus]">{{ project.lastUpdateStatus }}</v-chip> <br>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col v-if="!groups[tap].projects.length">
                    <h2>No Projects In this Group</h2>
                  </v-col>
                </v-row>
                <br>
                <v-spacer />
                <v-btn v-if="$auth.user.isAdmin" @click.stop="newProjectDialog(groups[tap])" text color="blue">
                  <v-icon>mdi mdi-plus</v-icon>
                  Add Project
                </v-btn>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- New Project Dialogue -->
    <add-group ref="addGroup" />
    <add-project ref="addProject" :group="addIn" />
  </v-layout>

</template>

<script>
import AddProject from '../addDialogs/AddProject'
import AddGroup from "../addDialogs/AddGroup";

export default {
  name: 'ProjectGroups',
  components: {AddGroup, AddProject },
  data () {
    return {
      addIn: null,
      tap: null,
      statusColors: {
        "success":"green",
        "failed":"red",
        "working": "orange"
      },
    }
  },
  methods: {
    deleteProject (projectId) {
      this.$swal.fire({
        title: 'Are You Sure You Want To Delete This Project?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        icon: 'warning'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.$axios.$delete('projects/' + projectId)
            this.$swal.fire({
              title: 'Project Deleted',
              icon: 'success'
            })
            await this.reFetchGroups()
          } catch (e) {
            this.$swal.fire({
              title: 'Failed To Complete Your Action',
              icon: 'error'
            })
          }
        }
      })
    },
    reFetchGroups () {
      this.$emit('reFetchGroups')
    },
    newProjectDialog (group) {
      this.addIn = group
      this.$refs.addProject.open()
    },
    newGroupDialog () {
      this.$refs.addGroup.open()
    },

  },
  computed: {
    groups: function () {
      return this.$store.state.groups.groups;
    }
  },
  watch: {
    tap: function () {
      const currentGroup = this.groups[this.tap];
      if (currentGroup) {
        this.$store.dispatch('groups/updateGroup',currentGroup.id);
      }
    }
  }
}
</script>

<style scoped>
.w-100 {
  width: 100%;
}
</style>
