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
        <!-- <q-btn
          label="Nuno Góis"
          flat
          @click="rightDrawerOpen = !rightDrawerOpen"
        >
          <q-icon class="q-ml-md" name="account_circle" size="lg" />
        </q-btn> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="desktop" overlay>
      <q-list>
        <!-- <q-item clickable>
          <q-item-section avatar>
            <q-avatar round icon="logout" />
          </q-item-section>
          <q-item-section>
            Logout
          </q-item-section>
        </q-item> -->
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
              {{ $t('drawer.github_caption') }}
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
  data: () => ({
    rightDrawerOpen: false
  })
})
</script>

<style lang="sass" scoped>
.toolbar-main
  max-width: 600px
  margin: auto
</style>
