import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon

import BaiduMap from 'vue-baidu-map'

import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

import { LMap, LTileLayer, LMarker, LImageOverlay, LPopup, LPolyline } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

import 'leaflet-draw/dist/leaflet.draw.css'
/**
 * If you don't want to use mock-server
 * you want to use mockjs for request interception
 * you can execute:
 *
 * import { mockXHR } from '../mock'
 * mockXHR()
 */

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-image-overlay', LImageOverlay)
Vue.component('l-popup', LPopup)
Vue.component('l-polyline', LPolyline)
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(BaiduMap, { ak: 'YZk52XHYbwtDoWnnlDO53ysCNBHCG0v6' })
Vue.use(VideoPlayer)

Vue.config.productionTip = false

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

