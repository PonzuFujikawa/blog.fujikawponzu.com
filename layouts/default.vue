<template lang="pug">
  v-app
    v-toolbar( dense )
      nuxt-link( :to="localePath('/')" class="text--primary text-decoration-none" )
        v-toolbar-title {{ $t('site_name') }}
      v-spacer
      div
        nuxt-link( v-for="locale in availableLocales"
        :key="locale.code" :to="switchLocalePath(locale.code)")
          | {{ locale.name }}
        v-btn( fab small @click="$vuetify.theme.dark = $vuetify.theme.dark ? false : true" )
          v-icon( v-if="$vuetify.theme.dark" color="yellow accent-1" ) mdi-weather-night
          v-icon( v-else color="yellow accent-4" ) mdi-weather-sunny
    v-main
      v-container
        nuxt
    v-footer( padless )
      v-col( class="text-center" ) &copy; {{ new Date().getFullYear() }} - fujikawaponzu.com
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

<style lang="stylus" scoped>
.v-toolbar
  flex initial
.v-btn:before
  opacity 0 !important
</style>
