import { watch, onMounted } from 'vue'

const STORAGE_KEY = 'dqe-theme-colors'

export function useTheme() {
  const appConfig = useAppConfig()

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appConfig.ui.colors))
    } catch {}
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const saved = JSON.parse(raw)
      Object.assign(appConfig.ui.colors, saved)
    } catch {}
  }

  function init() {
    onMounted(load)
    watch(() => appConfig.ui.colors, save, { deep: true })
  }

  return { appConfig, save, load, init }
}
