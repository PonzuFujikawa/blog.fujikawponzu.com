<template lang="pug">
  nuxt-link.card( :to="getLink(post.fields.slug)" )
    section
      h3 {{ post.fields.title }}
      div.flex.text-center
        img( :src="post.fields.thumbnail" :alt="post.fields.title" width=320 height=240 loading=lazy )
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import Vue from 'vue'

@Component
export default class Card extends Vue {
  @Prop()
  post!: Object

  public getDescription(article: string) {
    return "要約"
  }

  public getLink(slug: string) {
    return `/posts/${slug}`
  }
}
</script>

<style lang="stylus" scoped>
.card
  position relative
  border-radius 10px
  padding-bottom 1rem
  overflow hidden
  text-decoration none

  section 
    display flex
    flex-direction column

    div
      align-items: center;
      justify-content: center;

      img 
        background-image url("~@/assets/img/Blocks-0.6s-256px.svg")
        background-position center 
        object-fit cover
        order 1
    h3
      overflow-wrap break-word
      letter-spacing 0.1em
      font-size 1.6rem
      padding 0 1rem
      order 2
    p
      overflow-wrap break-word
      font-size 1rem
      padding 0 1rem
      order 3

.card
  &:after
    content ""
    transition background .2s ease-in-out
  &:hover, &:focus, &:active
    &:after
      content: "";
      background rgba(245, 245, 245, 0.1)
      display: block;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 2rem;
      padding-top: calc(50% - 2rem);
</style>
