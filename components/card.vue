<template lang="pug">
  v-hover
    template( v-slot="{hover}" )
      v-card( :elevation="hover ? 12 : 4" class="transition-swing" )
        nuxt-link( :to="getLink(post.fields.slug)" class="text--primary text-decoration-none" )
          v-img( :src="post.fields.thumbnail" :alt="post.fields.title" )
          v-card-title
            | {{ post.fields.title }}
</template>

<script lang="ts">
import { Entry } from 'contentful'
import { Component, Prop } from 'nuxt-property-decorator'
import Vue from 'vue'

@Component
export default class Card extends Vue {
  @Prop({
    default: {
      fields: {
        title: 'sample',
        thumbnail: null,
        article: '',
        publishedDate: null,
      },
    },
  })
  post!: Object

  public getLink(slug: string) {
    let localePath = this.$route.fullPath.includes('en') ? '/en' : '/'
    return `${localePath}/posts/${slug}`
  }
}
</script>

<style lang="stylus" scoped>
.v-card
  width 100%

.v-image
  height 11.25rem
</style>
