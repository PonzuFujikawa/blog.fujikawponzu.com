<template lang="pug">
  v-sheet( tag="aside" elevation="2" rounded class="sidebar")
    section.profile
      h1.sidebar_title {{ $t("sidebar_webmaster") }}
      div.profile-wrapper
        div
          v-img( src="https://storage.googleapis.com/storage.fujikawaponzu.com/portfolio.png" 
          aspect-ratio="1" position="center 20%" alt="プロフィール画像" )
          cite {{ $t("webmaster_name") }}
        div
          a( href="https://twitter.com/PonzuFujikawa" target="_brank" ref="noopener noreferrer" class="social-badge" )
            img( alt="Twitter Follow" src="https://img.shields.io/static/v1?label=twitter&style=flat&logo=twitter&message=%40PonzuFujikawa" )
          a( href="https://github.com/PonzuFujikawa" target="_brank" ref="noopener noreferrer" class="social-badge" )
            img( alt="GitHub followers" src="https://img.shields.io/static/v1?label=github&style=flat&logo=github&message=%40PonzuFujikawa")
    section.recent-articles
      h1.sidebar_title {{ $t("sidebar_recent_articles") }}
      ul
        li( v-for="(post, index) in recent3Article" :key="index" )
          nuxt-link( :to="getLink(post.fields.slug)" class="text--primary text-decoration-none" )
            v-img( :lazy-src="loadingImg" :src="post.fields.thumbnail" :alt="post.fields.title" aspect-ratio=1200/630 )
</template>

<script lang="ts">
import Vue from 'vue'
import { Entry } from 'contentful'
import { Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Content extends Vue {
  @Prop()
  posts!: Entry<any>[]
  
  loadingImg = require('../assets/img/loading.png')

  public getLink(slug: string) {
    return this.localePath(`/posts/${slug}`)
  }

  get recent3Article() {
    return this.posts.slice(0, 3)
  }
}
</script>

<style lang="stylus" scoped>
.sidebar
  width 18rem
  max-width 100%
  padding 1rem 1.2rem

  section
    margin-bottom 1rem

    h1
      font-size 1.2rem
      border-bottom solid 2px #0D47A1
      margin-bottom .5rem

    ul
      padding-left 0
      list-style none

      li
        padding 0.2rem 0

.sidebar
  .profile
    .v-image
      width 10rem
      border-radius 50%
  .profile-wrapper
    display flex
    flex-wrap wrap
    .social-badge
      display block

@media screen and (max-width 768px)
  .sidebar
    width 100%
</style>
