<template lang="pug">
  div.content-container
    contentComponent( :post="post" )
    v-spacer
    contentSidebar( :posts="posts" )
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { Entry } from 'contentful'
import { Component } from 'nuxt-property-decorator'
import HeadMixin from '~/mixins/headMixin'

const contentComponent = () => import('~/components/content.vue')
const contentSidebar = () => import('~/components/sidebar.vue')

@Component({
  components: {
    contentComponent,
    contentSidebar,
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
      ogpImgPath: post ? post.fields.thumbnail : '',
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
