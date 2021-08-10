import io from 'socket.io-client'
import Vue from 'vue'

Vue.prototype.$socket = new io(process.env.WS_HOST);
