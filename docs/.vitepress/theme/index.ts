import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { nextTick, onMounted, watch } from 'vue'
import mediumZoom, { type Zoom } from 'medium-zoom'

import './index.css'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  setup() {
    const route = useRoute()
    let zoom: Zoom | undefined

    const refreshZoom = () => {
      if (!zoom) {
        zoom = mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
        return
      }
      zoom.detach()
      zoom.attach('.main img')
    }

    onMounted(refreshZoom)
    watch(
      () => route.path,
      () => nextTick(refreshZoom),
    )
  },
}
