import { boot } from 'quasar/wrappers'
import messages from 'src/i18n'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { Quasar } from 'quasar'

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n
  }
}

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en-us',
  fallbackLocale: 'en-us',
  messages
})

export default boot(({ app }) => {
  // Set i18n instance on app
  try {
    let lang = Quasar.lang.getLocale() || 'en-us'

    lang = lang.indexOf('pt') === 0 ? 'pt' : lang
    lang = lang.indexOf('en') === 0 ? 'en-us' : lang

    i18n.locale = lang

    void import(
      /* webpackInclude: /(pt|en-us)\.js$/ */
      'quasar/lang/' + lang
    ).then(lang => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      Quasar.lang.set(lang.default)
    })
  } catch {}

  app.i18n = i18n
})
