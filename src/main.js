import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'
import './network/request'
import './common/formatDate'
import './plugins/VTWTG.js'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import 'nprogress/nprogress.css'

Vue.use(VueQuillEditor, /* { default global options } */ )


Vue.filter('formateDate', function (value) {
  if (!value) return ''
  return new Date(value * 1000).format("yyyy-MM-dd hh:mm:ss")
})

Vue.prototype.$bus = new Vue()

//导入外部图标步骤
// import './assets/css/font_4j5wiqq3csf/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
