import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import { HeadInfo } from '~/types'

@Component
export default class HeadMixin extends Vue {
  public headInfo(): HeadInfo {
    return {}
  }

  public head(): MetaInfo {
    const headInfo = this.headInfo()

    const siteName: string = 'ふじぽんログ'
    const title: string = headInfo.title || 'ふじぽんログ'
    const description: string = headInfo.description || 'ふじかわぽんずのブログ'

    const baseUrl: string = process.env.BASE_URL || ''
    const currentUrl: string = `${baseUrl}${this.$route.path}`

    const ogpImagePath: string = headInfo.ogpImgPath || '/ogp.webp'

    return {
      title: title,
      htmlAttrs: {
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ne/ fb#',
      },
      meta: [
        { hid: 'description', name: 'description', content: description },
        { name: 'application-name', content: siteName },

        { property: 'og:type', name: 'og:type', content: 'website' },
        { property: 'og:title', name: 'og:title', content: title },
        { property: 'og:description', name: 'og:description', content: description },
        { property: 'og:url', name: 'og:url', content: currentUrl },
        { property: 'og:image', name: 'og:image', content: ogpImagePath },
        { property: 'og:site_name', name: 'og:site_name', content: siteName },
      ],
      link: [
        { rel: "canonical", href: currentUrl },
      ]
    }
  }
}