import { Inject, NuxtApp } from "@nuxt/types/app"

const getFormattedDate = (date: string) => {
  const originDate = new Date(date)
  return `${originDate.getFullYear()}/${originDate.getMonth() + 1}/${originDate.getDate()}`
}

export default ({}: NuxtApp, inject: Inject) => {
  inject('getFormattedDate', getFormattedDate)
}
