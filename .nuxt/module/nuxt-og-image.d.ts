// Generated by nuxt-og-image

declare module 'nitropack' {
  interface NitroRouteRules {
    ogImage?: false | import('../../node_modules/nuxt-og-image/dist/runtime/types').OgImageOptions & Record<string, any>
  }
  interface NitroRouteConfig {
    ogImage?: false | import('../../node_modules/nuxt-og-image/dist/runtime/types').OgImageOptions & Record<string, any>
  }
  interface NitroRuntimeHooks {
    'nuxt-og-image:context': (ctx: import('../../node_modules/nuxt-og-image/dist/runtime/types').OgImageRenderEventContext) => void | Promise<void>
    'nuxt-og-image:satori:vnodes': (vnodes: import('../../node_modules/nuxt-og-image/dist/runtime/types').VNode, ctx: import('../../node_modules/nuxt-og-image/dist/runtime/types').OgImageRenderEventContext) => void | Promise<void>
  }
}

declare module '#nuxt-og-image/components' {
  export interface OgImageComponents {
    'CoverImage': typeof import('../../components/OgImage/CoverImage.vue')['default']
    'Custom': typeof import('../../components/OgImage/Custom.vue')['default']
    'Emoji': typeof import('../../components/OgImage/Emoji.vue')['default']
    'Simple': typeof import('../../components/OgImage/Simple.vue')['default']
    'BrandedLogo': typeof import('../../node_modules/nuxt-og-image/dist/runtime/nuxt/components/Templates/Community/BrandedLogo.vue')['default']
    'Frame': typeof import('../../node_modules/nuxt-og-image/dist/runtime/nuxt/components/Templates/Community/Frame.vue')['default']
    'Nuxt': typeof import('../../node_modules/nuxt-og-image/dist/runtime/nuxt/components/Templates/Community/Nuxt.vue')['default']
    'NuxtSeo': typeof import('../../node_modules/nuxt-og-image/dist/runtime/nuxt/components/Templates/Community/NuxtSeo.vue')['default']
    'Pergel': typeof import('../../node_modules/nuxt-og-image/dist/runtime/nuxt/components/Templates/Community/Pergel.vue')['default']
    'SimpleBlog': typeof import('../../node_modules/nuxt-og-image/dist/runtime/nuxt/components/Templates/Community/SimpleBlog.vue')['default']
    'UnJs': typeof import('../../node_modules/nuxt-og-image/dist/runtime/nuxt/components/Templates/Community/UnJs.vue')['default']
    'Wave': typeof import('../../node_modules/nuxt-og-image/dist/runtime/nuxt/components/Templates/Community/Wave.vue')['default']
    'WithEmoji': typeof import('../../node_modules/nuxt-og-image/dist/runtime/nuxt/components/Templates/Community/WithEmoji.vue')['default']
  }
}
declare module '#nuxt-og-image/unocss-config' {
  export type theme = any
}

export {}
