import { Inject, NuxtApp } from "@nuxt/types/app"

const getFormattedDate = (date: string) => {
  const originDate = new Date(date)
  return `${originDate.getFullYear()}年${originDate.getMonth() + 1}月${originDate.getDate()}日`
}

export default ({}: NuxtApp, inject: Inject) => {
  inject('getFormattedDate', getFormattedDate)
}
