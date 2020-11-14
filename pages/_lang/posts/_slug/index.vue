<template lang="pug">
  div.content-container
    content_component( :post="post" )
    v-spacer
    content_sidebar( :posts="posts" )
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Entry } from 'contentful'
import { Component } from 'nuxt-property-decorator'
import HeadMixin from '~/mixins/headMixin'
import content_component from '~/components/content.vue'
import content_sidebar from '~/components/sidebar.vue'

@Component({
  components: {
    content_component,
    content_sidebar
  },
  computed: mapState(['posts']),
})
export default class PostIndex extends HeadMixin {
  posts!: Entry<any>[]

  headInfo() {
    const post = this.posts.find(
      (post: Entry<any>) => post.fields.slug === this.$route.params.slug
    )
    return {
      title: post ? post.fields.title : this.$t('site_name'),
      ogpImgPath: post ? post.fields.thumbnail : ''
    }
  }

  get post() {
    return this.posts.find(
      (post: Entry<any>) => post.fields.slug === this.$route.params.slug
    )
  }
}
</script>

<style lang="stylus" scoped>
.content-container
  display flex
  justify-content center
  align-items flex-start
  flex-wrap wrap
</style>