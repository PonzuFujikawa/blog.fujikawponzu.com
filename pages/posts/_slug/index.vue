<template lang="pug">
  div.content-container
    contentComponent( :post="post" )
    div
    contentSidebar( :posts="posts" )
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { Entry } from 'contentful'
import { Component, mixins } from 'nuxt-property-decorator'
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
      title: post ? post.fields.title : 'ふじぽんログ',
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
  align-items center
  flex-wrap wrap
  flex-direction column
</style>
