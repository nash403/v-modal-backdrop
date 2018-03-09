import Vue from 'vue'
import App from './App'
// Comment the 1st following line of code & uncomment the 2nd one
// if you want the benefits of hot reloading with webpack-dev-server.
// [Don't forget to reset changes when done]
import ModalBackdrop from '../dist/modal-backdrop'
// import ModalBackdrop from './main'

import '../dist/modal-backdrop.css'

Vue.use(ModalBackdrop)

new Vue({
  el    : '#app',
  render: h => h(App)
})
