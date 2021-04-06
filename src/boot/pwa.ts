import { boot } from 'quasar/wrappers'

declare module 'vue/types/vue' {
  interface Vue {
    $pwa_install: BeforeInstallPromptEvent | null
  }
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>

  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>

  prompt(): Promise<void>
}

export default boot(({ Vue }) => {
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Vue.prototype.$pwa_install = e
  })
})
