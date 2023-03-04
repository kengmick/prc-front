export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  loading: '~/components/Loading.vue',
  // target: 'static',
  ssr: true,
  head: {
    title: 'punkrockcompound',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
      },
      {
        src: '/js/fb-sdk.js',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  // router config

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css', '@/assets/css/form.css'],

  router: {
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      const findEl = (hash, x) => {
        return (
          document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => {
              resolve(findEl(hash, ++x || 1))
            }, 100)
          })
        )
      }

      if (to.hash) {
        const el = await findEl(to.hash)
        if ('scrollBehavior' in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
        } else {
          return window.scrollTo(0, el.offsetTop)
        }
      }

      return { x: 0, y: 0 }
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@braid/vue-formulate/nuxt',
    '@nuxt/image',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/strapi',
    'nuxt-socket-io',
    '@nuxt/image',
    'nuxt-compress',
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
  ],

  firebase: {
    config: {
      apiKey: 'AIzaSyAeQtPg6N2Nnfj8j_XOAaXENpCgRZfxKz0',
      authDomain: 'punk-64434.firebaseapp.com',
      projectId: 'punk-64434',
      storageBucket: 'punk-64434.appspot.com',
      messagingSenderId: '47047508047',
      appId: '1:47047508047:web:d084476a2802dbfcfaea3a',
    },
    services: {
      storage: true, // Just as example. Can be any other service.
    },
  },

  // compression nuxt-compress
  // 'nuxt-compress': {
  //   gzip: {
  //     threshold: 8192,
  //   },
  //   brotli: {
  //     threshold: 8192,
  //   },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  image: {
    domains: ['https://punkrockcompund.s3.amazonaws.com'],
  },
  'nuxt-compress': {
    gzip: {
      threshold: 8192,
    },
    brotli: {
      threshold: 8192,
    },
  },
  build: {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        preserveLineBreaks: false,
        collapseWhitespace: true,
      },
    },
  },
  strapi: {
    url: process.env.BACKEND_URL,
    // url: 'http://localhost:1337',
    entities: ['bands'],
  },
  io: {
    // module options
    sockets: [
      {
        name: 'chat',
        url: 'https://punkrockcompound-backend-lb57o.ondigitalocean.app',
        default: true,
      },
      {
        name: 'post',
        url: 'https://punkrockcompound-backend-lb57o.ondigitalocean.app',
      },
    ],
  },
}
