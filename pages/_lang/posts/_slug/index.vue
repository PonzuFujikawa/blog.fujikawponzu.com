<template lang="pug">
  div
    content_component( :post="post" )
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Entry } from 'contentful'
import { Component } from 'nuxt-property-decorator'
import HeadMixin from '~/mixins/headMixin'
import content_component from '~/components/content.vue'

@Component({
  components: {
    content_component
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
