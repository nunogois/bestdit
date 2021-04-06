<template>
  <q-page>
    <div class="column no-wrap flex-center scroll">
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
    </div>
    <div class="fixed-bottom full-width column no-wrap flex-center">
      <q-btn :label="$t('about.back')" no-caps outline to="/">
        <q-icon name="fas fa-home" class="q-ml-sm" size="15px" />
      </q-btn>
    </div>
  </q-page>
</template>
