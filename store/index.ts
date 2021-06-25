import { ActionTree, GetterTree, MutationTree } from 'vuex'
import contentfulClient from '~/plugins/contentful'
import { Entry, EntryCollection } from 'contentful'
import md from '~/middleware/markdown-it'
import axios from '@nuxtjs/axios'

export type RootState = ReturnType<typeof state>

export const state = () => ({
  posts: new Array<Entry<any>>()
})

export const getters: GetterTree<RootState, RootState> = {
}

export const mutations: MutationTree<RootState> = {
  setPosts(state, payload) {
    state.posts = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }) {
    await contentfulClient.getEntries({
      content_type: 'blogPost',
      order: '-sys.createdAt',
      locale: 'ja-JP',
    }).then((response: EntryCollection<any>) => {
      commit('setPosts', response.items)
    }).catch(console.error)
    for (const post of this.state.posts) {
      const thumbnailUrl = post.fields.thumbnail ? post.fields.thumbnail[0].secure_url : ''
      post.fields.thumbnail = thumbnailUrl

      const html = md.render(post.fields.article)
      const URL_REGEXP = /<p>(https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+)<\/p>/im
      const match = URL_REGEXP.exec(html)
      if (!match || match.length < 2) {
        post.fields.html = html
      } else {
        const replace = match[0]
        const url = match[1]
        const response = await this.$axios.get(url)

        /* baseurl */
        const scheme = 'https://'
        const domain = (url.indexOf('://') > -1 ? url.split('/')[2] : url.split('/')[0]).split(':')[0]
        const baseUrl = scheme + domain

        /* favicon */
        const FAVICON_REGEXP = /<link.*?href=("[^"]*(\.ico|\.png|\.svg)"|'[^']*(\.ico|\.png|\.svg)'|[^'"]*(\.ico|\.png|\.svg)).*?/
        const faviconMatch = FAVICON_REGEXP.exec(response.data)
        console.log(faviconMatch ? faviconMatch[1] : '')
        const favicon = !faviconMatch ? '' : faviconMatch[1].replace(/['"]/, '').replace('\'', '')

        /* title */
        const TITLE_REGEXP = /<title>(.*?)<\/title>/
        const titleMatch = TITLE_REGEXP.exec(response.data)
        const title = !titleMatch ? '' : titleMatch[1]

        const OG_TITLE_REGEXP = /<meta property="og:title" content=("[^"]*"|'[^']*'|[^"']*)/
        const ogTitleMatch = OG_TITLE_REGEXP.exec(response.data)
        const ogTitle = !ogTitleMatch ? '' : ogTitleMatch[1]

        /* description */
        const OG_DESC_REGEXP = /<meta property="og:description" content=("[^"]*"|'[^']*'|[^"']*)/
        const ogDescMatch = OG_DESC_REGEXP.exec(response.data)
        const ogDesc = !ogDescMatch ? '' : ogDescMatch[1]

        const DESC_REGEXP = /<p>([\s\S]*?)<\/p>/
        const descMatch = DESC_REGEXP.exec(response.data)
        let desc = !descMatch ? '' : descMatch[1]
        desc = desc.replace(/<(".*?"|'.*?'|[^'"])*?>/, '').replace(/<("[^"]*"|'[^']*'|[^'">])*>/, '')

        /* img */
        const OG_IMG_REGEXP = /<meta property="og:image" content=("[^"]*"|'[^']*'|[^"']*)/
        const ogImgMatch = OG_IMG_REGEXP.exec(response.data)
        const ogImg = !ogImgMatch ? '' : ogImgMatch[1]

        const thumbnailHTML = ogImg ? `
    <div class="linkcard-thumbnail">
      <img loading="lazy" src="${ogImg}" alt="thumbnail" width="120" height="120" class="linkcard-img" />
    </div>` : ''

        /* html replace */
        post.fields.html = html.replace(
          replace,
          `<div class="linkcard">
  <a href="${url}" rel="noopener noreferrer" target="_blank" class="linkcard-link">
    <div class="linkcard-text">
      <p class="linkcard-title">${ogTitle || title}</p>
      <p class="linkcard-disc">${ogDesc || desc}</p>
      <div class="linkcard-spacer"></div>
      <p class="linkcard-link">
        <img loading="lazy" src="${favicon ? baseUrl + favicon : ''}" alt="icon" width="18" height="18" class="linkcard-icon" />
        ${domain}
      </p>
    </div>${thumbnailHTML}
  </a>
</div>`
        )
      }
    }
  }
}
