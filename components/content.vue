<template lang="pug">
  v-sheet( tag="article" elevation="2" rounded class="ctf_content" )
    h1( class="ctf_content__title" ) {{ post.fields.title }}
    small( class="d-inline-flex align-center" )
      v-icon( dense ) {{ icons.mdiClockOutline }}
      div {{ $getFormattedDate(post.sys.createdAt) }}
    small( class="d-inline-flex align-center" )
      v-icon( dense ) {{ icons.mdiUpdate }}
      div {{ $getFormattedDate(post.sys.updatedAt) }}
    section( v-html="post.fields.html" class="ctf_content__md_body" )
</template>

<script lang="ts">
import Vue from 'vue'
import { Entry } from 'contentful'
import { Component, Prop } from 'nuxt-property-decorator'
import { mdiClockOutline, mdiUpdate } from '@mdi/js'

@Component
export default class Content extends Vue {
  @Prop()
  post!: Entry<any>

  private icons = {
    mdiClockOutline,
    mdiUpdate,
  }
}
</script>

<style lang="stylus">
/* overrite highlight css */
pre, .hljs {
  position relative
  padding-top 2em
  max-height 25rem
  border 1px solid white
}
pre[name]:not([name="undefined"])::after
  content attr(name)
  position absolute
  top 0
  left 1em
  background #777
  color #eee
  padding 0 .2em
/* original css */
.ctf_content
  width calc(100% - 20rem)
  max-width 100%
  padding 1rem 1.2rem
  .ctf_content__title
    font-size 3rem
    line-height 1.4
  .ctf_content__md_body
    margin-top 1rem
.ctf_content
  h1, h2, h3, h4, h5, h6
    font-weight bold
    line-height 1.5
    margin-top 1rem
    margin-bottom .8rem
  h1
    font-size 2rem
  h2
    font-size 1.6rem
    border-bottom solid 2px #0D47A1
  h3
    font-size 1.4rem
  h4
    font-size 1.2rem
  h5
    font-size 1.1rem
  h6
    font-size 1rem
/* linkcard */
.linkcard
  display inline-block
  max-width 100%
  height 7.5rem
  border  2px solid #eee
  border-radius .5rem
  overflow hidden
  transition .2s ease

  &:hover
    background #a8e0ff24

  .linkcard-link
    display: flex;
    justify-content space-between
    width: 100%;
    height: 100%;

    .linkcard-text
      display flex
      justify-content space-between
      flex-direction column
      padding: .4rem .4rem .4rem .8rem;

      p
        margin 0
        margin-bottom .1rem

      .linkcard-title
        color #333
        font-weight bold
        margin-bottom .3rem
      
      .linkcard-disc
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        overflow hidden
        color #555
        height 4rem
      
      .linkcard-link
        display flex
        justify-content flex-start
        align-items flex-end
        font-size .875rem
        line-height 1.4
        color #555

        .linkcard-icon
          vertical-align middle
          margin-right .2rem

    .linkcard-thumbnail
      max-width 7.5rem
      max-height 7.5rem

      .linkcard-img
        object-fit cover

@media screen and (max-width 768px)
  .ctf_content
    width 100%
    margin-bottom 1rem
</style>
