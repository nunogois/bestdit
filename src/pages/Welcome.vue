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
        <lottie src="lottie/onboarding.json" :height="300" :loop="false" />
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
          <q-btn :label="$t('welcome.next')" no-caps outline @click="startNext">
            <q-icon name="fas fa-chevron-right" class="q-ml-sm" size="15px" />
          </q-btn>
        </div>
      </q-carousel-slide>

      <q-carousel-slide
        v-if="native_os.name !== ''"
        name="native"
        class="column no-wrap flex-center"
      >
        <lottie src="lottie/scooter.json" :height="300" />
        <h5 class="q-mb-md q-mt-none bestdit text-center">
          {{ $t('welcome.native.title') }}
        </h5>

        <p class="text-center scroll">
          {{ $t('welcome.native.description', { v: native_os.name }) }}
          <br />
          {{ $t('welcome.native.description2') }}
          <br />
          {{ $t('welcome.native.description3') }}
        </p>

        <div class="q-mt-lg text-center">
          <q-btn
            :label="
              native_os.name === 'PWA'
                ? $t('welcome.native.install') + ' PWA'
                : $t('welcome.native.download', { e: native_os.ext })
            "
            no-caps
            outline
            :color="native_os.color"
            @click="download(native_os.ext)"
          >
            <q-icon :name="native_os.icon" class="q-ml-sm" size="15px" />
          </q-btn>
        </div>

        <div class="q-mt-lg text-center">
          <q-btn
            :label="$t('welcome.skip')"
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
              <q-icon
                name="fas fa-sun"
                color="yellow-8"
                size="xl"
                class="cursor-pointer"
                @click="setTheme(false)"
              />
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
              <q-icon
                name="fas fa-moon"
                size="xl"
                class="cursor-pointer"
                @click="setTheme(true)"
              />
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
          class="topics-options scroll"
          color="green"
          type="checkbox"
          left-label
          @input="changeSubs"
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
          {{ $t('welcome.ng.bestdit1') }}
          <a href="https://quasar.dev/" class="welcome-link" target="_blank"
            >Quasar Framework</a
          >.<br />
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
import { openURL } from 'quasar'
import { TranslateResult } from 'vue-i18n'

import { VuePwaInstallMixin, BeforeInstallPromptEvent } from 'vue-pwa-install'

import Lottie from 'components/Lottie.vue'

export default Vue.extend({
  name: 'Welcome',
  components: { Lottie },
  mixins: [VuePwaInstallMixin],
  data() {
    return {
      slide: 'welcome',
      pwa_install: null as BeforeInstallPromptEvent | null,
      lang: { label: 'welcome.lang.en-us', value: 'en-us' },
      dark: undefined as boolean | undefined,
      topics: [] as Array<{
        label: TranslateResult
        value: string
        subs: Array<string>
      }>
    }
  },
  computed: {
    native_os(): { name: string; ext: string; icon: string; color: string } {
      if (this.$q.platform.is.android && !this.$q.platform.is.capacitor)
        return {
          name: 'Android',
          ext: 'APK',
          icon: 'fab fa-android',
          color: 'light-green-6'
        }
      else if (this.$q.platform.is.win && !this.$q.platform.is.electron)
        return {
          name: 'Windows',
          ext: 'EXE',
          icon: 'fab fa-windows',
          color: 'light-blue-7'
        }
      else if (this.pwa_install && this.pwa_install !== null) {
        return {
          name: 'Progressive Web App',
          ext: 'PWA',
          icon: 'fas fa-rocket',
          color: 'orange-7'
        }
      }

      return { name: '', ext: '', icon: '', color: '' }
    },
    langs(): Array<{ label: string; value: string }> {
      return [
        { label: 'welcome.lang.en-us', value: 'en-us' },
        { label: 'welcome.lang.pt', value: 'pt' }
      ]
    },
    topics_options(): Array<{
      label: TranslateResult
      value: string
      subs: Array<string>
    }> {
      return [
        {
          label: this.$t('welcome.topics.animals'),
          value: 'animals',
          subs: [
            'Awwducational',
            'AnimalPorn',
            'animalsbeingbros',
            'AnimalsBeingDerps',
            'Zoomies'
          ]
        },
        {
          label: this.$t('welcome.topics.art'),
          value: 'art',
          subs: ['art']
        },
        {
          label: this.$t('welcome.topics.cars'),
          value: 'cars',
          subs: ['cars', 'carporn']
        },
        {
          label: this.$t('welcome.topics.cute'),
          value: 'cute',
          subs: [
            'aww',
            'wholesomememes',
            'Awwducational',
            'Eyebleach',
            'MadeMeSmile'
          ]
        },
        {
          label: this.$t('welcome.topics.design'),
          value: 'design',
          subs: ['DesignPorn', 'RoomPorn', 'CozyPlaces']
        },
        {
          label: this.$t('welcome.topics.engineering'),
          value: 'engineering',
          subs: ['MachinePorn', 'EngineeringPorn']
        },
        {
          label: this.$t('welcome.topics.food'),
          value: 'food',
          subs: ['FoodPorn', 'food']
        },
        {
          label: this.$t('welcome.topics.funny'),
          value: 'funny',
          subs: ['funny']
        },
        {
          label: this.$t('welcome.topics.gaming'),
          value: 'gaming',
          subs: [
            'gaming',
            'pcmasterrace',
            'battlestations',
            'GamePhysics',
            'IndieGaming'
          ]
        },
        {
          label: this.$t('welcome.topics.gifs'),
          value: 'gifs',
          subs: [
            'gifs',
            'HighQualityGifs',
            'gifsthatkeepongiving',
            'educationalgifs',
            'maybemaybemaybe',
            'Unexpected'
          ]
        },
        {
          label: this.$t('welcome.topics.history'),
          value: 'history',
          subs: ['100yearsago', 'HistoryPorn', 'OldSchoolCool']
        },
        {
          label: this.$t('welcome.topics.interesting'),
          value: 'interesting',
          subs: [
            'mildlyinteresting',
            'interestingasfuck',
            'woahdude',
            'BeAmazed',
            'nonononoyes',
            'blackmagicfuckery',
            'Unexpected',
            'maybemaybemaybe',
            'dataisbeautiful',
            'MovieDetails'
          ]
        },
        {
          label: this.$t('welcome.topics.motivational'),
          value: 'motivational',
          subs: [
            'GetMotivated',
            'progresspics',
            'toptalent',
            'nextfuckinglevel'
          ]
        },
        {
          label: this.$t('welcome.topics.music'),
          value: 'music',
          subs: ['listentothis', 'music', 'randomactsofmusic']
        },
        {
          label: this.$t('welcome.topics.nature'),
          value: 'nature',
          subs: ['CampingandHiking', 'EarthPorn', 'NatureIsFuckingLit']
        },
        {
          label: this.$t('welcome.topics.photography'),
          value: 'photography',
          subs: ['EarthPorn', 'itookapicture', 'pics', 'PerfectTiming']
        },
        {
          label: this.$t('welcome.topics.programming'),
          value: 'programming',
          subs: ['programminghumor', 'softwaregore', 'unixporn']
        },
        {
          label: this.$t('welcome.topics.videos'),
          value: 'videos',
          subs: ['videos', 'youtubehaiku', 'PraiseTheCameraMan', 'Unexpected']
        },
        {
          label: this.$t('welcome.topics.space'),
          value: 'space',
          subs: ['space']
        },
        {
          label: this.$t('welcome.topics.wallpapers'),
          value: 'wallpapers',
          subs: [
            'Amoledbackgrounds',
            'wallpapers',
            'wallpaper',
            'MobileWallpaper',
            'MobileWallpapers'
          ]
        }
      ].sort((a, b) => {
        let a_label = a.label as string
        a_label = a_label.split(' ')[1]

        let b_label = b.label as string
        b_label = b_label.split(' ')[1]

        return a_label < b_label ? -1 : a_label > b_label ? 1 : 0
      })
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
  created() {
    this.$on('canInstall', (event: BeforeInstallPromptEvent) => {
      event.preventDefault()
      this.pwa_install = event
    })
  },
  methods: {
    startNext() {
      this.slide = this.native_os.name !== '' ? 'native' : 'theme'
    },
    download(ext: string) {
      if (ext === 'APK')
        openURL(
          'https://github.com/nunogois/bestdit/releases/download/v0.1-beta/Bestdit.apk'
        )
      else if (ext === 'EXE')
        openURL(
          'https://github.com/nunogois/bestdit/releases/download/v0.1-beta/Bestdit.exe'
        )
      else if (ext === 'PWA' && this.pwa_install && this.pwa_install !== null) {
        void this.pwa_install.prompt()
        void this.pwa_install.userChoice.then(() => {
          this.pwa_install = null
        })
      }
    },
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
    setTheme(value: boolean) {
      this.dark = value
      this.changeTheme(value)
    },
    changeSubs(topics: Array<string>) {
      let subs = new Set()
      this.topics_options
        .filter(t => topics.indexOf(t.value) > -1)
        .map(t => t.subs)
        .forEach(t =>
          t.forEach(t => {
            subs.add(t)
          })
        )
      this.$q.localStorage.set('bestdit_subs', [...subs])
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
