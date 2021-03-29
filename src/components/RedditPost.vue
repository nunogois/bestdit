<template>
  <q-card
    flat
    :bordered="$q.screen.gt.sm"
    class="fit"
    :class="{ 'q-my-sm': $q.screen.gt.sm }"
  >
    <div>
      <div class="q-pa-sm">
        <a
          :href="'https://www.reddit.com/' + post.subreddit_name_prefixed"
          target="_blank"
          class="subreddit"
        >
          <span class="text-caption text-weight-light text-grey-7">
            {{ post.subreddit_name_prefixed }}
          </span>
        </a>
        <br />
        <h5 class="text-h5 q-ma-none">{{ post.title }}</h5>
      </div>
      <div>
        <img :src="post.url" class="full-width" draggable="false" />
      </div>
      <q-card-actions class="q-gutter-md q-pb-none">
        <q-btn
          class="q-my-sm q-ml-md"
          icon="fab fa-reddit-alien"
          flat
          round
          color="white"
          style="background-color: #FF4500"
          size="sm"
          @click="open('https://www.reddit.com' + post.permalink)"
        >
          <q-tooltip>
            {{ $t('post.reddit') }}
          </q-tooltip>
        </q-btn>

        <q-btn
          class="q-my-sm"
          icon="fas fa-share-alt"
          flat
          round
          size="sm"
          @click="share('https://www.reddit.com' + post.permalink)"
        >
          <q-tooltip>
            {{ $t('post.share') }}
          </q-tooltip>
        </q-btn>
      </q-card-actions>
    </div>
    <q-separator class="lt-md" />
  </q-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { openURL, copyToClipboard } from 'quasar'

import { Post } from './models'

export default Vue.extend({
  name: 'RedditPost',
  props: {
    post: {
      type: (Object as unknown) as PropType<Post>,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    open(url: string) {
      openURL(url)
    },
    async share(url: string) {
      await copyToClipboard(url)
      this.$q.notify(this.$t('post.clipboard'))
    }
  }
})
</script>

<style lang="sass" scoped>
.subreddit
  text-decoration: none
.q-card__actions
  button
    width: 30px
</style>
