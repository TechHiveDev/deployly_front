require("dotenv").config({
  path: __dirname+'/.env'
})

export default {
  server: {
    port: process.env.PORT,
  },

  env: {
    WS_HOST: process.env.WS_HOST
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: process.env.TITILE+' | %s',
    title: process.env.TITILE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/moment",
    "~/plugins/socket.io",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  buildModules: [
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    '@nuxtjs/router',
    "vue-sweetalert2/nuxt",
    "@nuxtjs/dotenv",
  ],

  axios: {
    baseURL: process.env.API_URL
  },

  pwa: {
    manifest: {
      lang: 'en'
    }
  },


  vuetify: {
    customVariables: ['~/assets/variables.scss']
  },

  build: {

  },

  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      user: "/"
    },
    strategies: {
      local: {
        token: {
          property: 'access_token',
          maxAge: 1800,
          required: true,
          global: true,
          type: 'Bearer'
        },
        user: {
          property: false, // <--- Default "user"
          autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
          user: { url: '/auth/me', method: 'get',propertyName: false },
          logout: { url: '/auth/logout', method: 'post' }
        }
        // autoLogout: false
      }
    }
  }

}
