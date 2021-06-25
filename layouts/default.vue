<template lang="pug">
  div#application
    header
      nuxt-link( to="/" )
        h1 ふじぽんログ
      button.darkmode( @click="darkmode()" type="button" name="darkmode" )
        i.icon.light-icon( v-if="!isDarkMode" )
          svg( viewBox="0 0 24 24" )
            path( :d="icons.mdiWeatherSunny" )
        i.icon.dark-icon( v-else )
          svg( viewBox="0 0 24 24" )
            path( :d="icons.mdiWeatherNight" )
    main
      div( id="container" )
        nuxt
    footer
      small &copy; {{ new Date().getFullYear() }} - 
        a( href="https://fujikawaponzu.com" target="_blank" rel="noopener noreferrer" ) fujikawaponzu.com
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js'

@Component
export default class Default extends Vue {
  private isDarkMode = false;

  private icons = {
    mdiWeatherSunny,
    mdiWeatherNight,
  }

  darkmode() {
    this.isDarkMode = !this.isDarkMode
    let elm = document.getElementById('application')
    if (elm) {
      elm.classList.toggle('dark')
    }
  }
}
</script>

<style lang="stylus">
/* invalidation vuetify css */
#application code {
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
#application
  position relative
  transition background .2s ease-in-out
  padding-bottom 30px
  min-height 100%

header
  display flex
  justify-content space-between
  padding 1rem 1.2rem
  a
    text-decoration none

main
  margin 0 2vw

.darkmode
  background transparent
  border 0

footer 
  display flex
  justify-content center 
  align-content center
  position absolute
  bottom 0
  width 100%
</style>
