<template>
  <q-page>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      :control-color="$q.dark.isActive ? 'white' : 'black'"
      navigation
      padding
      arrows
      class="absolute fit welcome-carousel"
      navigation-icon="fas fa-circle"
    >
      <q-carousel-slide name="welcome" class="column no-wrap flex-center">
        <img
          src="~assets/logo.png"
          height="100"
          class="animated fadeInDown"
          draggable="false"
        />
        <h2 class="bestdit q-ma-sm animated fadeInDown text-center">Bestdit</h2>
        <span class="bestdit animated fadeInDown text-center"
          >The best content from Reddit showcased in a single app.</span
        >
        <div class="q-mt-xl text-center animated fadeInUp">
          <q-btn
            :label="$t('welcome.start')"
            no-caps
            outline
            @click="slide = 'lang'"
          >
            <q-icon name="fas fa-chevron-right" class="q-ml-sm" size="15px" />
          </q-btn>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="lang" class="column no-wrap flex-center">
        <lottie
          src="lottie/onboarding.json"
          :height="300"
          :speed="0.8"
          :loop="false"
        />
        <h5 class="q-mb-md q-mt-none bestdit text-center">
          {{ $t('welcome.language') }}
        </h5>

        <q-select
          v-model="lang"
          :options="langs"
          style="min-width: 250px"
          @input="changeLang"
        >
          <template v-slot:selected>
            <q-item>
              <q-item-section avatar>
                <img :src="'flags/' + lang.value + '.svg'" height="30" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t(lang.label) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section avatar>
                <img :src="'flags/' + scope.opt.value + '.svg'" height="30" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t(scope.opt.label) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div class="q-mt-xl text-center">
          <q-btn
            :label="$t('welcome.next')"
            no-caps
            outline
            @click="slide = 'theme'"
          >
            <q-icon name="fas fa-chevron-right" class="q-ml-sm" size="15px" />
          </q-btn>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="theme" class="column no-wrap flex-center">
        <lottie src="lottie/daynight.json" :height="300" />
        <h5 class="q-mb-md q-mt-none bestdit text-center">
          {{ $t('welcome.theme') }}
        </h5>
        <div class="q-mt-md text-center">
          <div class="row items-center">
            <div class="col-auto text-right">
              <q-icon name="fas fa-sun" color="yellow-8" size="xl" />
            </div>
            <div class="col-auto">
              <q-toggle
                v-model="dark"
                size="lg"
                class="q-mx-md"
                @input="changeTheme"
              />
            </div>
            <div class="col-auto text-left">
              <q-icon name="fas fa-moon" size="xl" />
            </div>
          </div>
        </div>
        <div class="q-mt-xl text-center">
          <q-btn
            :label="$t('welcome.next')"
            no-caps
            outline
            @click="slide = 'topics'"
            :disabled="dark === null || dark === undefined"
          >
            <q-icon name="fas fa-chevron-right" class="q-ml-sm" size="15px" />
          </q-btn>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="topics" class="column no-wrap flex-center">
        <lottie src="lottie/topics.json" :height="200" />
        <h5 class="q-mb-md q-mt-none bestdit text-center">
          {{ $t('welcome.interests') }}
        </h5>

        <q-option-group
          v-model="topics"
          :options="topics_options"
          class="topics-options"
          color="green"
          type="checkbox"
          left-label
        />

        <div class="q-mt-xl text-center">
          <q-btn
            :label="$t('welcome.next')"
            no-caps
            outline
            @click="slide = 'ng'"
            :disabled="topics.length === 0"
          >
            <q-icon name="fas fa-chevron-right" class="q-ml-sm" size="15px" />
          </q-btn>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="ng" class="column no-wrap flex-center">
        <lottie src="lottie/ng_dev.json" :height="200" />
        <h5 class="q-mb-md q-mt-none bestdit text-center">Nuno Góis</h5>

        <p class="text-center scroll">
          {{ $t('welcome.ng.thanks') }}<br /><br />
          {{ $t('welcome.ng.iam') }}<br />
          {{ $t('welcome.ng.website') }}
          <a
            href="https://www.nunogois.com"
            class="welcome-link"
            target="_blank"
            >website</a
          >.<br /><br />
          {{ $t('welcome.ng.bestdit1') }}<br />
          {{ $t('welcome.ng.bestdit2') }}<br />
          <br />
          {{ $t('welcome.ng.github') }}
          <a
            href="https://github.com/nunogois"
            class="welcome-link"
            target="_blank"
            >GitHub</a
          >!
        </p>

        <div class="q-mt-xl text-center">
          <q-btn
            :label="$t('welcome.next')"
            no-caps
            outline
            @click="slide = 'done'"
          >
            <q-icon name="fas fa-chevron-right" class="q-ml-sm" size="15px" />
          </q-btn>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="done" class="column no-wrap flex-center">
        <lottie src="lottie/rocket.json" :height="200" />
        <h5 class="q-mb-md q-mt-none bestdit text-center">
          {{ $t('welcome.ready.title') }}
        </h5>
        <p class="text-center">
          {{ $t('welcome.ready.settings1') }}<br />
          {{ $t('welcome.ready.settings2') }}<br /><br />
          <q-icon name="menu" size="lg" />
          <br /><br />
          {{ $t('welcome.ready.glhf') }}
        </p>
        <div class="q-mt-xl text-center">
          <q-btn
            :label="$t('welcome.ready.start')"
            outline
            no-caps
            @click="done"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { TranslateResult } from 'vue-i18n'

import Lottie from 'components/Lottie.vue'

export default Vue.extend({
  name: 'Welcome',
  components: { Lottie },
  data() {
    return {
      slide: 'welcome',
      lang: { label: 'welcome.lang.en-us', value: 'en-us' },
      dark: undefined as boolean | undefined,
      topics: []
    }
  },
  computed: {
    langs(): Array<{ label: string; value: string }> {
      return [
        { label: 'welcome.lang.en-us', value: 'en-us' },
        { label: 'welcome.lang.pt', value: 'pt' }
      ]
    },
    topics_options(): Array<{ label: TranslateResult; value: string }> {
      return [
        { label: this.$t('welcome.topics.animals'), value: 'animals' },
        { label: '🦝 Cute', value: 'cute' },
        { label: '📷 Photography', value: 'photography' },
        { label: '👨‍💻 Programming', value: 'programming' },
        { label: '📱 Technology', value: 'technology' },
        { label: '📺 Videos', value: 'videos' }
      ]
    }
  },
  mounted() {
    if (this.$q.localStorage.getItem('bestdit_welcome') === false)
      void this.$router.replace('/')

    this.lang = {
      label: 'welcome.lang.' + this.$i18n.locale,
      value: this.$i18n.locale
    }

    this.$q.dark.set(this.$q.localStorage.getItem('bestdit_dark') as boolean)
    this.dark = this.$q.dark.mode === 'auto' ? undefined : this.$q.dark.mode
  },
  methods: {
    changeLang(value: { label: string; value: string }) {
      this.$i18n.locale = value.value
      void import(
        /* webpackInclude: /(pt|en-us)\.js$/ */
        'quasar/lang/' + value.value
      ).then(lang => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.$q.lang.set(lang.default)
      })

      this.$q.localStorage.set('bestdit_lang', value.value)
    },
    changeTheme(value: boolean) {
      this.$q.dark.set(value)
      this.$q.localStorage.set('bestdit_dark', value)
    },
    done() {
      this.$q.localStorage.set('bestdit_welcome', false)
      void this.$router.replace('/')
    }
  }
})
</script>

<style lang="sass">
.welcome-carousel
  .q-carousel__navigation-icon
    font-size: 5px !important

.topics-options
  min-width: 250px
  .q-checkbox
    width: 100%
    .q-checkbox__label
      margin-right: auto

.welcome-link
  text-decoration: none
  color: #2c8aff
</style>
