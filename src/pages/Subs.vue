<template>
  <q-page>
    <div class="absolute fit column no-wrap flex-center">
      <lottie src="lottie/topics.json" :height="200" />
      <h5 class="q-mb-md q-mt-none bestdit text-center">
        {{ $t('drawer.subs') }}
      </h5>
      <q-item class="subs q-pa-sm">
        <q-item-section>
          <q-input
            v-model="new_sub"
            :label="$t('subs.add')"
            dense
            prefix="r/"
            @keyup.enter="add"
          />
        </q-item-section>
        <q-item-section class="col-auto">
          <q-btn
            flat
            icon="fas fa-plus"
            color="positive"
            size="sm"
            @click="add"
          />
        </q-item-section>
      </q-item>
      <q-list class="subs scroll">
        <q-item v-for="sub in subs_sorted" :key="sub" class="q-pa-sm">
          <q-item-section>
            <q-item-label>
              <a
                :href="'https://www.reddit.com/r' + sub"
                target="_blank"
                class="sub-link"
                >r/{{ sub }}</a
              >
            </q-item-label>
          </q-item-section>
          <q-item-section class="col-auto">
            <q-btn
              flat
              icon="fas fa-trash"
              color="negative"
              size="sm"
              @click="remove(sub)"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <div class="q-mt-xl text-center">
        <q-btn
          :label="$t('subs.save')"
          no-caps
          outline
          color="positive"
          @click="save"
          :disabled="subs.length === 0"
        >
          <q-icon name="fas fa-chevron-right" class="q-ml-sm" size="15px" />
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

import Lottie from 'components/Lottie.vue'

export default Vue.extend({
  name: 'Subs',
  components: { Lottie },
  data() {
    return {
      new_sub: '',
      subs: [] as Array<string>
    }
  },
  computed: {
    subs_sorted(): Array<string> {
      return this.subs
        .slice()
        .sort((a, b) =>
          a.toLowerCase() < b.toLowerCase()
            ? -1
            : a.toLowerCase() > b.toLowerCase()
            ? 1
            : 0
        )
    }
  },
  mounted() {
    const subs =
      (this.$q.localStorage.getItem('bestdit_subs') as Array<string>) || null
    if (subs !== null) this.subs = subs
  },
  methods: {
    add() {
      const sub = this.new_sub.replace('r/', '')
      if (
        this.subs.filter(s => s.toLowerCase() === sub.toLowerCase()).length ===
        0
      ) {
        this.subs.push(sub)
        this.$q.notify({
          type: 'positive',
          message: this.$t('subs.added', { s: this.new_sub }) as string
        })
        this.new_sub = ''
      } else
        this.$q.notify({
          type: 'negative',
          message: this.$t('subs.already_added', { s: this.new_sub }) as string
        })
    },
    remove(sub: string) {
      this.subs = this.subs.filter(s => s !== sub)
    },
    save() {
      this.$q.localStorage.set('bestdit_subs', this.subs)
      void this.$router.replace('/')
    }
  }
})
</script>

<style lang="sass">
.subs
  min-width: 250px

.sub-link
  text-decoration: none
  color: #2c8aff
</style>
