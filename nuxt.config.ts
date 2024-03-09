// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules:["@nuxtjs/tailwindcss", "@vueuse/nuxt", '@pinia/nuxt'],
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  ssr: false
})
