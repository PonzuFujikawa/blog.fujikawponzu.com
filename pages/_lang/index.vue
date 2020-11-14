<template lang="pug">
  div.articles-wrapper
    card(v-for="(post, index) in posts" :key="index" :post="post")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, mixins } from 'nuxt-property-decorator'
import card from '@/components/card.vue'
import { mapState } from 'vuex'
import HeadMixin from '@/mixins/headMixin'

@Component(
  {
    components: {
      card
    },
    computed: {
      ...mapState(['posts'])
    }
  }
)
export default class IndexPage extends mixins(HeadMixin) {
}
</script>

<style lang="stylus" scoped>
.articles-wrapper 
  display grid
  grid-column-gap 2.5rem
  grid-row-gap 2.5rem
  grid-template-columns repeat(auto-fill, minmax(20.75rem, 1fr)) 
</style>