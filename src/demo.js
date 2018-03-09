import Vue from 'vue'
import App from './App'
import ModalBackdrop from '../dist/modal-backdrop'
// import ModalBackdrop from './main'

import '../dist/modal-backdrop.css'

Vue.use(ModalBackdrop)

new Vue({
  el    : '#app',
  render: h => h(App)
})
