export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    script: [
      {
        src: "https://www.google.com/recaptcha/api.js?",
      },
      {
        src: "https://yubinbango.github.io/yubinbango-core/yubinbango-core.js",
      },
    ],
    ssr: false,
    title: "cloudfunding-front-end",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/style.scss", "@mdi/font/css/materialdesignicons.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/vuex-persistedstate", ssr: false },
    { src: "@/plugins/axios" },
    { src: "@/plugins/filters" },
    { src: "@/plugins/consumerRepositories" },
    { src: "@/plugins/businessRepositories" },
    { src: "@/plugins/authRepositories" },
    { src: "@/plugins/vue-quill-editor", ssr: false },
    { src: "@/plugins/yubinbango", ssr: false },
    { src: "@/plugins/vuelidate", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    "@nuxtjs/toast",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/style-resources",
    "@nuxtjs/axios",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["jp-prefectures"],
    babel: {
      compact: true,
    },
  },

  server: {
    port: 4300,
    host: "0.0.0.0",
  },

  styleResources: {
    scss: ["@/assets/scss/variables.scss", "@/assets/scss/mixins.scss"],
  },

  bootstrapVue: {
    bootstrapCSS: false,
    icons: true,
  },

  toast: {
    position: "top-right",
    duration: 3000,
    theme: "bubble",
    iconPack: "material",
  },

  loading: "@/components/shared/Loading.vue",

  env: {
    authApiUrl:
      process.env.NODE_ENV === "dev"
        ? "http://localhost:4010/v1"
        : process.env.AUTH_API_URL,

    consumerApiUrl:
      process.env.NODE_ENV === "dev"
        ? "http://localhost:4040/v1"
        : process.env.CONSUMER_API_URL,

    businessApiUrl:
      process.env.NODE_ENV === "dev"
        ? "http://localhost:4000/v1"
        : process.env.BUSINESS_API_URL,

    gmoPgEnv: process.env.YOUR_GMOPG_TEST_ENV,
    gmoPgShopId: process.env.YOUR_GMOPG_SHOP_ID,
  },
};
