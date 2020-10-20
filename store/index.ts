import { ActionTree, GetterTree, MutationTree } from 'vuex'
import contentfulClient from '~/plugins/contentful'
import { Entry, EntryCollection } from 'contentful'

export type RootState = ReturnType<typeof state>

export const state = () => ({
  posts: [],
})

export const getters: GetterTree<RootState, RootState> = {
}

export const mutations: MutationTree<RootState> = {
  setPosts(state: { posts: Entry<unknown>[] }, payload: Entry<unknown>[]) {
    state.posts = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit ({ commit }) {
    let isEnLang = this.$router.currentRoute.fullPath.includes('en');
    await contentfulClient.getEntries({
      content_type: 'blogPost',
      order: '-sys.createdAt',
      locale: isEnLang ? 'en-US' : 'ja-JP',
    }).then((response: EntryCollection<unknown>) => {
      commit('setPosts', response.items)
    }).catch(console.error)
  }
}