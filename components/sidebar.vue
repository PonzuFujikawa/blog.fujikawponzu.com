<template lang="pug">
  aside.sidebar
    section.profile
      h1.sidebar_title 管理者
      div.profile-wrapper
        img.profile-img( src="https://res.cloudinary.com/dktvrqec9/image/upload/v1620961855/portfolio_yxewx1.png" alt="プロフィール画像" )
        cite ふじかわぽんず
      div
        a.social-badge( href="https://twitter.com/PonzuFujikawa" target="_brank" ref="noopener noreferrer" )
          img( alt="Twitter Follow" src="https://img.shields.io/static/v1?label=twitter&style=flat&logo=twitter&message=%40PonzuFujikawa" )
        a.social-badge( href="https://github.com/PonzuFujikawa" target="_brank" ref="noopener noreferrer" )
          img( alt="GitHub followers" src="https://img.shields.io/static/v1?label=github&style=flat&logo=github&message=%40PonzuFujikawa")
    section.recent-articles
      h1.sidebar_title 最新記事
      nuxt-link.article-card( v-for="(post, index) in recent3Article" :key="index" :to="getLink(post.fields.slug)" )
        img( :src="post.fields.thumbnail" :alt="post.fields.title" width=128 height=128 )
        h2 {{ post.fields.title }}
</template>

<script lang="ts">
import Vue from 'vue'
import { Entry } from 'contentful'
import { Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Content extends Vue {
  @Prop()
  posts!: Entry<any>[]

  public getLink(slug: string) {
    return `/posts/${slug}`
  }

  get recent3Article() {
    return this.posts.slice(0, 3)
  }
}
</script>

<style lang="stylus" scoped>
.sidebar
  width calc(100% - 20rem)
  max-width 100%
  display flex
  flex-wrap wrap
  margin-top 1rem

  section
    padding 1rem

    h1
      font-size 1.2rem
      border-bottom solid 2px #0D47A1
      margin-bottom .5rem

    .article-card
      display flex
      justify-content flex-start
      align-items center
      padding 0.2rem 0
      img
        background-image url("~@/assets/img/Blocks-0.6s-256px.svg")
        background-position center 
        object-fit cover
        margin-right 1rem
      h2
        margin 0
        font-size 1rem

.sidebar
  .profile
    .profile-img
      width 10rem
      height 10rem
      object-fit cover
  .profile-wrapper
    display flex
    flex-wrap wrap
    .social-badge
      display block

@media screen and (max-width 768px)
  .sidebar
    width 100%
</style>
