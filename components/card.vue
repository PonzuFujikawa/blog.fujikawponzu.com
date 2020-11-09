<template lang="pug">
  v-hover
    template( v-slot="{hover}" )
      v-card( :elevation="hover ? 8 : 4" class="transition-swing" )
        nuxt-link( :to="getLink(post.fields.slug)" class="text--primary text-decoration-none" )
          v-img( :lazy-src="loadingImg" :src="post.fields.thumbnail" :alt="post.fields.title" aspect-ratio=1200/630  )
</template>

<script lang="ts">
import { Entry } from 'contentful'
import { Component, Prop } from 'nuxt-property-decorator'
import Vue from 'vue'

@Component
export default class Card extends Vue {
  @Prop()
  post!: Object
  loadingImg = require('../assets/img/loading.png')

  public getLink(slug: string) {
    return this.localePath(`/posts/${slug}`)
  }
}
</script>

<style lang="stylus" scoped>
.v-card
  width 100%

.v-image
  width 100%
  height auto
</style>
