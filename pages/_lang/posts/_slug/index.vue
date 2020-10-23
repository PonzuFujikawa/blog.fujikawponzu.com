<template lang="pug">
  div
    v-sheet( tag="article" elevation="2" rounded )
      h1 {{ post.fields.title }}
      small( class="d-inline-flex align-center" )
        v-icon( dense ) mdi-clock-outline
        div {{ $getFormattedDate(post.sys.createdAt) }}
      small( class="d-inline-flex align-center" )
        v-icon( dense ) mdi-update
        div {{ $getFormattedDate(post.sys.updatedAt) }}
      section( v-html="$md.render(post.fields.article)" )
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Entry } from 'contentful'
import { Component } from 'nuxt-property-decorator'
import HeadMixin from '~/mixins/headMixin'

@Component({
  computed: mapState(['posts'])
})
export default class PostIndex extends HeadMixin {
  posts!: Entry<any>[]

  headInfo() {
    const post = this.posts.find(
      (post: Entry<any>) => post.fields.slug === this.$route.params.slug
    )
    return {
      title: post ? post.fields.title : this.$t('site_name')
    }
  }

  get post() {
    return this.posts.find(
      (post: Entry<any>) => post.fields.slug === this.$route.params.slug
    )
  }
}
</script>

<style lang="stylus">
article
  padding 1rem 1.2rem
  h1
    font-size 2rem
  section
    margin-top 1rem
    p, pre, code
      padding-left 1rem
</style>