<template lang="pug">
 section
    v-sheet
      h1 {{ post.fields.title }}
      p
        small {{ $getFormattedDate(post.sys.createdAt) }}
      article( v-html="rendererMdToHtml(post.fields.article)" )
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Entry } from 'contentful'
import md from '@/plugins/markdownit'
import { Component } from 'nuxt-property-decorator'
import HeadMixin from '~/mixins/headMixin'
import { Context } from '@nuxt/types'

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

  private rendererMdToHtml(data: string) {
    return md.render(data)
  }
}
</script>
