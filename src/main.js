import ModalBackdrop from './ModalBackdrop'

const install = function (Vue, { prefix = 'V' } = {}) {
  Vue.component(`${prefix || ''}ModalBackdrop`, ModalBackdrop)
}

ModalBackdrop.install = install

if (typeof window !== 'undefined' && window.Vue) {
  Vue.use(install)
}

export default ModalBackdrop
