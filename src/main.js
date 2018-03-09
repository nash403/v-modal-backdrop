import ModalBackdrop from './ModalBackdrop'

const install = function (Vue, { prefix = 'V' } = {}) {
  Vue.component(`${options && options.prefix || ''}ModalBackdrop`, ModalBackdrop)
  // Vue.prototype.$scrollTo = NavScroll.scrollTo
}

ModalBackdrop.install = install

if (typeof window !== 'undefined' && window.Vue) {
  Vue.use(install)
}

export default ModalBackdrop
