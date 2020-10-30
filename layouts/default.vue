<template lang="pug">
  v-app
    v-toolbar( dense elevation="2" )
      nuxt-link( :to="localePath('/')" class="text--primary" )
        v-toolbar-title {{ $t('site_name') }}
      v-spacer
      div( class="d-inline-flex align-center" )
        v-btn( tag="a" elevation="2" class="langswitcher text--primary"
        v-for="locale in availableLocales"
        :key="locale.code" :href="switchLocalePath(locale.code)")
          | {{ locale.name }}
        v-btn( fab small elevation="2" @click="$vuetify.theme.dark = $vuetify.theme.dark ? false : true" )
          v-icon( v-if="$vuetify.theme.dark" color="yellow accent-1" ) mdi-weather-night
          v-icon( v-else color="yellow accent-4" ) mdi-weather-sunny
    v-main
      v-container
        nuxt
    v-footer( padless )
      v-col( class="text-center" ) &copy; {{ new Date().getFullYear() }} - 
        a( class="text--primary" href="https://fujikawaponzu.com" ) fujikawaponzu.com
</template>

<script lang="ts">
import { NuxtVueI18n } from 'nuxt-i18n';
import { Component } from 'nuxt-property-decorator';
import Vue from 'vue'

@Component
export default class Default extends Vue {
  get availableLocales() {
    let locales = this.$i18n.locales as unknown as NuxtVueI18n.Options.LocaleObject
    return locales.filter((i: { code: string; }) => i.code !== this.$i18n.locale)
  }
}
</script>

<style lang="stylus">
/* invalidation vuetify css */
.v-application code {
  background unset
  color unset
  padding unset
  border-radius unset
  font-size unset
  font-weight unset
}
code, kbd, pre, samp {
  font-family 'Consolas', 'Courier New', monospace
}
</style>

<style lang="stylus" scoped>
.v-toolbar
  flex initial
  a
    text-decoration none
.v-btn:before
  opacity 0 !important
.langswitcher
  border-radius 1rem
  padding 0 1rem
  margin 0 1rem
  color initial
</style>
