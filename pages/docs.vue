<template>
  <v-layout wrap row class="mt-3">
    <v-row class="white elevation-2">
      <v-col md="12">
        <h2>Hi and Welcome to Deployly</h2>
        <p>A smart Auto Deploy Software written by NodeJS and VueJS</p>
        <p>
          Here I will walk throw what you want to get started with Deployly <br>
        </p>
        <ul>
          <li>Installation</li>
          <li>Enable Auto Deploy for your project</li>
          <li>Managing The Server</li>
        </ul>
        <br>
        <h3>Enable autoDeploy for your Repo</h3>
        <p>
          AutoDeploy will automatically create a webhook specific for your repo, each time you make a push the webhook will be fired,
          <br> Once it fired Deploly will look for a file called <code>auto_deploy.sh</code> in your project directory in the disk, then execute this fil.
          <br>
          You as a developer should write the sequence of commands that you typically do when you deploy or update the repo Ex.
          <br>
        </p>
        <pre>
  <code> #!/bin/bash
    git pull origin develop
    npm i --silent
    pm2 restart my_app
</code>
      </pre>
        <p>
          We are not trying to hold you back so do what you want
        </p>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  name: "docs",
  head(){
    return {
      title: 'Docs',
    }
  }
}
</script>

<style scoped>

</style>
