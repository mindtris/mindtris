// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxthq/studio",
    "@nuxtjs/color-mode",
    "@nuxtjs/seo",
    "@nuxt/scripts",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxtjs/sitemap",
  ],
  // sitemap: {
  //   hostname: 'https://your-website.com', // Replace with your site's URL
  //   gzip: true,
  //   routes: async () => {
  //     // Fetch dynamic routes (optional)
  //     return [
  //       '/about',
  //       '/contact',
  //       '/products/1',
  //       '/products/2'
  //     ];
  //   }
  // },
  colorMode: {
    classSuffix: "",
  },

  // https://content.nuxt.com/
  content: {
    documentDriven: {
      injectPage: false,
    },
    highlight: false,
  },

  ogImage: {
    defaults: {
      component: "OgImage",
    },
  },

  runtimeConfig: {
    public: {
      posthogPublicKey: process.env.POSTHOG_PUBLIC_KEY,
      posthogHost: process.env.POSTHOG_HOST,
      mdc: {
        useNuxtImage: true,
      },
    },
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      failOnError: false,
      crawlLinks: true,
      routes: ["/", "/sitemap.xml"],
    },
  },
  site: {
    url: "https://example.com",
  },
  compatibilityDate: "2024-09-20",
});
