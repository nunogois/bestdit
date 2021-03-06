<template>
  <q-page>
    <q-pull-to-refresh @refresh="refresh" class="fit">
      <q-infinite-scroll
        @load="loadMore"
        class="row items-start content-start posts-list fit"
      >
        <reddit-post
          v-for="post in posts"
          :key="post.id"
          :post="post"
          :loading="loading"
          :ref="post.name"
        ></reddit-post>

        <template
          v-slot:loading
          class="row items-start content-start posts-list fit"
        >
          <reddit-post-loading v-for="i in 3" :key="i" />
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

import { Post, RedditResponse } from 'components/models'
import RedditPost from 'components/RedditPost.vue'
import RedditPostLoading from 'src/components/RedditPostLoading.vue'

export default Vue.extend({
  name: 'PageIndex',
  components: { RedditPost, RedditPostLoading },
  data() {
    const loading = true
    const posts: Post[] = []
    return { loading, posts }
  },
  async mounted() {
    if (!this.posts.length) {
      await this.load(true)
    }
  },
  methods: {
    async load(reset = false) {
      const subs = this.$q.localStorage.getItem('bestdit_subs') as Array<string>
      let query = 'pics/top.json?t=day'
      if (subs !== null)
        query = subs.join().replace(/,/g, '+') + '/top.json?t=day'

      await this.$axios
        .get(`https://www.reddit.com/r/${query}${this.getAfter(reset)}`)
        .then(res => {
          const response = res.data as RedditResponse
          const posts = response.data.children
            .map(p => p.data)
            .filter(
              p => p.thumbnail !== 'self' && !p.url.startsWith('http://')
            ) as Post[]

          if (reset) this.posts = posts
          else this.posts = this.posts.concat(posts)

          this.loading = false
        })
        .catch(e => {
          console.error(e)
        })
    },
    async refresh(done: () => void) {
      await this.load(true)
      done()
    },
    async loadMore(_: number, done: () => void) {
      let el

      if (this.posts[this.posts.length - 1]) {
        const ref = this.$refs[this.posts[this.posts.length - 1].name] as Vue[]
        el = ref[0].$el as HTMLElement
      }
      await this.load()

      if (el) {
        const target = getScrollTarget(el)
        const offset = el.offsetTop
        setScrollPosition(target, offset, 100)
      }
      done()
    },
    getAfter(reset = false) {
      if (!reset && this.posts.length) {
        return '&after=' + this.posts[this.posts.length - 1].name
      }
      return ''
    }
  }
})
</script>

<style lang="sass">
.posts-list
  max-width: 600px
  margin: auto
  .q-infinite-scroll__loading
    width: 100%
</style>
