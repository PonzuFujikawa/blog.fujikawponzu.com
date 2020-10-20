import { Context, Middleware } from "@nuxt/types"

const getPosts: Middleware = async ({ store, payload }: Context,) => {
  if (!store.state.posts.length && !payload) {
    await store.dispatch('getPosts')
  }
}
export default getPosts
