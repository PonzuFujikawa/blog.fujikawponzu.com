import md from '@/plugins/markdown-it'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $md: typeof md
  }
}
