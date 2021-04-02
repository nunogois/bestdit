<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div>
      <lottie src="lottie/404.json" />

      <h5 class="q-ma-sm">404 - Not Found.</h5>

      <q-btn class="q-mt-xl" outline to="/" label="Go Home" no-caps />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Lottie from 'components/Lottie.vue'

export default Vue.extend({
  name: 'Error404',
  components: { Lottie }
})
</script>
