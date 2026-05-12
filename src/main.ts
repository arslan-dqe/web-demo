import './assets/css/main.css'

import { ViteSSG } from 'vite-ssg'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { createHead as createSSRHead } from '@unhead/vue/server'
import { createHead as createCSRHead } from '@unhead/vue/client'
import ui from '@nuxt/ui/vue-plugin'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, isClient }) => {
    const createHead = import.meta.env.SSR ? createSSRHead : createCSRHead
    const head = createHead()
    app.use(head)
    app.use(ui)
    app.use(MotionPlugin)

    if (isClient && import.meta.hot) {
      handleHotUpdate(router)
    }
  },
)
