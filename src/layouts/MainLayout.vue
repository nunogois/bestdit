<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered>
      <q-toolbar class="toolbar-main">
        <q-toolbar-title class="bestdit">
          <q-avatar square class="q-mr-sm">
            <img src="~assets/logo.png" />
          </q-avatar>
          Bestdit
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="desktop" overlay>
      <q-list>
        <q-item class="q-py-none">
          <q-item-section avatar>
            <q-icon name="fas fa-globe-americas" />
          </q-item-section>
          <q-item-section>
            <q-select
              v-model="lang"
              :options="langs"
              @input="changeLang"
              dense
              borderless
            >
              <template v-slot:selected>
                <q-item dense class="q-pa-none">
                  <q-item-section
                    avatar
                    class="q-pa-none"
                    style="min-width: 40px"
                  >
                    <img :src="'flags/' + lang.value + '.svg'" height="20" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t(lang.label) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>

              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <img
                      :src="'flags/' + scope.opt.value + '.svg'"
                      height="20"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t(scope.opt.label) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon name="fas fa-palette" />
          </q-item-section>
          <q-item-section>
            <div class="row items-center">
              <div class="col-auto text-right">
                <q-icon name="fas fa-sun" color="yellow-8" />
              </div>
              <div class="col-auto">
                <q-toggle v-model="dark" size="sm" @input="changeTheme" />
              </div>
              <div class="col-auto text-left">
                <q-icon name="fas fa-moon" />
              </div>
            </div>
            <q-item-label caption>
              {{ $t('drawer.caption.theme') }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable @click="resetSettings">
          <q-item-section avatar>
            <q-icon name="fas fa-toolbox" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ $t('drawer.reset') }}
            </q-item-label>
            <q-item-label caption>
              {{ $t('drawer.caption.reset') }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item
          clickable
          tag="a"
          href="https://github.com/nunogois/bestdit"
          target="_blank"
        >
          <q-item-section avatar>
            <q-icon name="fab fa-github" />
          </q-item-section>
          <q-item-section>
            <q-item-label>GitHub</q-item-label>
            <q-item-label caption>
              {{ $t('drawer.caption.github') }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          tag="a"
          href="https://www.nunogois.com"
          target="_blank"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-user" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Nuno Góis</q-item-label>
            <q-item-label caption>
              {{ $t('drawer.caption.website') }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable>
          <q-item-section avatar>
            <img src="~assets/logo.png" height="24" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('drawer.about') }}</q-item-label>
            <q-item-label caption>
              {{ $t('drawer.caption.about') }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MainLayout',
  data() {
    return {
      rightDrawerOpen: false,
      lang: { label: 'welcome.lang.en-us', value: 'en-us' },
      dark: undefined as boolean | undefined,
      welcome: true
    }
  },
  computed: {
    langs(): Array<{ label: string; value: string }> {
      return [
        { label: 'welcome.lang.en-us', value: 'en-us' },
        { label: 'welcome.lang.pt', value: 'pt' }
      ]
    }
  },
  mounted() {
    this.loadSettings()
    if (this.welcome == null || this.welcome)
      void this.$router.replace('/welcome')
    this.dark = this.$q.dark.mode === 'auto' ? undefined : this.$q.dark.mode
  },
  methods: {
    loadSettings() {
      this.welcome = this.$q.localStorage.getItem('bestdit_welcome') as boolean
      this.lang = {
        label: 'welcome.lang.' + this.$i18n.locale,
        value: this.$i18n.locale
      }
      this.$q.dark.set(this.$q.localStorage.getItem('bestdit_dark') as boolean)
    },
    resetSettings() {
      this.$q.localStorage.clear()
      void this.$router.replace('/welcome')
    },
    changeLang(value: { label: string; value: string }) {
      this.$i18n.locale = value.value
      void import(
        /* webpackInclude: /(pt|en-us)\.js$/ */
        'quasar/lang/' + this.lang.value
      ).then(lang => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.$q.lang.set(lang.default)
      })

      this.$q.localStorage.set('bestdit_lang', this.lang.value)
    },
    changeTheme(value: boolean) {
      this.$q.dark.set(value)
      this.$q.localStorage.set('bestdit_dark', value)
    }
  }
})
</script>

<style lang="sass" scoped>
.toolbar-main
  max-width: 600px
  margin: auto
</style>
