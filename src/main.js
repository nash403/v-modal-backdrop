import ModalBackdrop from './ModalBackdrop'

const install =  (Vue, { prefix = 'V' } = {}) => {
  Vue.component(`${prefix || ''}ModalBackdrop`, ModalBackdrop)
}

const showModal = (props = {}, ...slots) => {
  const Modal = Vue.extend(ModalBackdrop)
  const m = new Modal({
    propsData: {...props, programmatic: true, value: true}
  })
  m.$slots.default = slots
  m.$mount()
  return m
}

ModalBackdrop.install = install
ModalBackdrop.show = showModal

if (typeof window !== 'undefined' && window.Vue) {
  Vue.use(install)
}

export default ModalBackdrop
