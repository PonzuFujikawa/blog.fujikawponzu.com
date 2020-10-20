import Vue, { ComponentOptions } from 'vue';
import VueI18n, { IVueI18n } from 'vue-i18n'

interface NuxtI18nSeo {
  htmlAttrs: {
    [key: string]: string
  }
  link: {
    rel: string
    href: string
    [key: string]: any
  }[]
  meta: {
    vmid?: string
    charset?: string
    content?: string
    "http-equiv"?: "content-security-policy" | "refresh"
    name?: string
    [key: string]: any
  }[]
}

declare module "vue/types/vue" {
  interface Vue {
    $nuxtI18nSeo(): NuxtI18nSeo
  }
}
