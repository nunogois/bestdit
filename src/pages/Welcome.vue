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
        <h2 class="bestdit q-ma-sm animated fadeInDown">Bestdit</h2>
        <span class="bestdit animated fadeInDown text-center"
          >The best content from Reddit showcased in a single app.</span
        >
        <div class="q-mt-xl text-center animated fadeInUp">
          <q-btn label="Get Started" no-caps outline @click="slide = 'theme'">
            <q-icon name="fas fa-chevron-right" class="q-ml-sm" size="15px" />
          </q-btn>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="theme" class="column no-wrap flex-center">
        <lottie src="lottie/daynight.json" :height="300" />
        <h5 class="q-mb-md q-mt-none bestdit">Pick your theme!</h5>
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
            label="Next"
            no-caps
            outline
            @click="slide = 'topics'"
            :disabled="dark === undefined"
          >
            <q-icon name="fas fa-chevron-right" class="q-ml-sm" size="15px" />
          </q-btn>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="topics" class="column no-wrap flex-center">
        <lottie src="lottie/topics.json" :height="200" />
        <h5 class="q-mb-md q-mt-none bestdit">Pick your interests!</h5>

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
            label="Next"
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
        <h5 class="q-mb-md q-mt-none bestdit">Nuno Góis</h5>

        <p class="text-center">
          Thanks for checking out Bestdit!<br /><br />
          I'm Nuno Góis, a full-stack developer from Portugal.<br />
          If you'd like to know more about me, you can check out my
          <a
            href="https://www.nunogois.com"
            class="welcome-link"
            target="_blank"
            >website</a
          >.<br /><br />
          Bestdit is a very simple Reddit client.<br />
          It is 100% cross-platform and open-source, built using Quasar
          Framework.<br />
          It showcases some of my favorite Reddit communities in a very
          accessible format.<br />
          <br /><br />
          Don't forget to check out my other projects on
          <a
            href="https://github.com/nunogois"
            class="welcome-link"
            target="_blank"
            >GitHub</a
          >!
        </p>

        <div class="q-mt-xl text-center">
          <q-btn label="Next" no-caps outline @click="slide = 'done'">
            <q-icon name="fas fa-chevron-right" class="q-ml-sm" size="15px" />
          </q-btn>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="done" class="column no-wrap flex-center">
        <lottie src="lottie/rocket.json" :height="200" />
        <h5 class="q-mb-md q-mt-none bestdit">Ready to Go</h5>
        <p class="text-center">
          Bestdit has been configured to your preferences.<br />
          You can always access the options by opening the drawer on the
          top-right corner:<br /><br />
          <q-icon name="menu" size="lg" />
          <br /><br />
          Hope you have a great time!
        </p>
        <div class="q-mt-xl text-center">
          <q-btn label="Start using Bestdit!" outline no-caps @click="done" />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

import Lottie from 'components/Lottie.vue'

export default Vue.extend({
  name: 'Welcome',
  components: { Lottie },
  data: () => ({
    slide: 'welcome',
    dark: undefined as boolean | undefined,
    topics: [],
    topics_options: [
      { label: '🐦 Animals', value: 'animals' },
      { label: '🦝 Cute', value: 'cute' },
      { label: '📷 Photography', value: 'photography' },
      { label: '👨‍💻 Programming', value: 'programming' },
      { label: '📱 Technology', value: 'technology' },
      { label: '📺 Videos', value: 'videos' }
    ]
  }),
  mounted() {
    if (this.$q.localStorage.getItem('bestdit_welcome') === false)
      void this.$router.replace('/')
  },
  methods: {
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
