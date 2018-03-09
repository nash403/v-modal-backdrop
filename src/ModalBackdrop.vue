<template>
  <div :class="[mdlClass, 'modal', value ? 'modal-opened' : '']"
       tabindex="-1" role="dialog">
    <div
      ref="backdrop"
      :class="[mdlBackdropClass, 'modal-backdrop', value ? 'modal-opened' : '']"
      @click.self="onBackdropClicked">
    </div>
    <transition :name="transition">
      <div
        v-show="value"
        ref="content"
        :class="[mdlContentClass, 'modal-content', value ? 'modal-opened' : '']"
        style="position: relative;" role="document">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
const $ = (selector, all = false) => {
  if (typeof selector !== 'string') {
    return selector
  }
  return document[`querySelector${all ? 'All' : ''}`](selector)
}
const getOpenModalNum = () => $('modal-backdrop', true).length
const rmNode = el => {
  el && el.nodeType === Node.ELEMENT_NODE && !!el.parentNode && el.parentNode.removeChild(el)
}

export default {
  name: 'ModalBackdrop',
  /* eslint-disable vue/require-default-prop */
  props: {
    value: {
      type: Boolean,
      default: false
    },
    programmatic: {
      type: Boolean,
      default: false
    },
    clickOnBackdrop: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String,
      default: ''
    },
    transitionDuration: {
      type: Number,
      default: 150
    },
    escKey: {
      type: Boolean,
      default: true
    },
    beforeClose: {type: Function, default: ()=>{}},
    zOffset: {
      type: Number,
      default: 20
    },
    mdlClass: {type: String, default: ''},
    mdlContentClass: {type: String, default: ''},
    mdlBackdropClass: {type: String, default: ''},
    embedElement: {
      type: null,
      default: 'body'
    }
  },
  data () {
    return {
      timeoutId: 0
    }
  },
  watch: {
    value (v) {
      this.$toggle(v)
    }
  },
  mounted () {
    if (!this.programmatic) rmNode(this.$el)
    window.addEventListener('keyup', this.onKeyPress, false)
    if (this.programmatic || this.value) {
      this.$toggle(true)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeoutId)
    rmNode(this.$el)
    window.removeEventListener('keyup', this.onKeyPress)
    if (getOpenModalNum() === 0) {
      document.body.classList.remove('modal-opened')
    }
  },
  methods: {
    onKeyPress (event) {
      if (this.escKey && this.value && event.keyCode === 27) {
        this.toggle(false)
      }
    },
    hide () {
      this.toggle(false, arguments)
    },
    toggle (show, ...rest) {
      if (!show && typeof this.beforeClose === 'function' && this.beforeClose(...rest) === false) {
        return
      }
      !this.programmatic && this.$emit('input', show) // will trigger the watcher on value (because of v-model)
      if (this.programmatic && !show) {
        this.$destroy()
      }
    },
    $toggle (show) {
      const modal = this.$el
      const backdrop = this.$refs.backdrop
      clearTimeout(this.timeoutId)
      if (show) {
        const alreadyOpenModalNum = getOpenModalNum()
        let wrapper = $(this.embedElement)
        wrapper.appendChild(this.$el)
        modal.scrollTop = 0
        backdrop.offsetHeight // force repaint
        document.body.classList.add('modal-opened')
        // fix z-index for nested modals
        // no need to calculate if no modal is already open
        if (alreadyOpenModalNum > 0) {
          const defaultZmodal = parseInt(window.getComputedStyle(modal).zIndex) || 1050 // default modal z-Index
          const offset = alreadyOpenModalNum * this.zOffset
          modal.style.zIndex = `${defaultZmodal + offset}`
        }
        this.timeoutId = setTimeout(() => {
          this.$emit('show')
          this.timeoutId = 0
        }, this.transitionDuration)
      } else {
        this.timeoutId = setTimeout(() => {
          rmNode(modal)
          if (getOpenModalNum() === 0) {
            document.body.classList.remove('modal-opened')
          }
          this.$emit('hide')
          this.timeoutId = 0
          // restore z-index for nested modals
          modal.style.zIndex = ''
        }, this.transitionDuration)
      }
    },
    onBackdropClicked (event) {
      if (this.clickOnBackdrop) {
        this.toggle(false)
      }
    }
  }
}
</script>
<style lang="scss">
.modal {
  z-index: 1050;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  outline: 0;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0;
  transition: all 0.15s;
  &.modal-opened {
    opacity: 0.4;
  }
}
</style>
