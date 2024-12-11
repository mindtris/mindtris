import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     */
    ["tailwindcss"]: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/mdc`
     */
    ["mdc"]: typeof import("@nuxtjs/mdc").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/content`
     */
    ["content"]: typeof import("@nuxt/content").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/icon`
     */
    ["icon"]: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxthq/studio`
     */
    ["studio"]: typeof import("@nuxthq/studio").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     */
    ["colorMode"]: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-site-config/dist/module`
     */
    ["site"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/robots/dist/module`
     */
    ["robots"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/sitemap/dist/module`
     */
    ["sitemap"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-og-image/dist/module`
     */
    ["ogImage"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-schema-org/dist/module`
     */
    ["schemaOrg"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-seo-experiments/dist/module`
     */
    ["seoExperiments"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-seo-experiments/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-link-checker/dist/module`
     */
    ["linkChecker"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     */
    ["seo"]: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/scripts`
     */
    ["scripts"]: typeof import("@nuxt/scripts").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/image`
     */
    ["image"]: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/fonts`
     */
    ["fonts"]: typeof import("@nuxt/fonts").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     */
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/mdc`
     */
    ["mdc"]?: typeof import("@nuxtjs/mdc").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/content`
     */
    ["content"]?: typeof import("@nuxt/content").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/icon`
     */
    ["icon"]?: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxthq/studio`
     */
    ["studio"]?: typeof import("@nuxthq/studio").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     */
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-site-config/dist/module`
     */
    ["site"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/robots/dist/module`
     */
    ["robots"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/sitemap/dist/module`
     */
    ["sitemap"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-og-image/dist/module`
     */
    ["ogImage"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-schema-org/dist/module`
     */
    ["schemaOrg"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-seo-experiments/dist/module`
     */
    ["seoExperiments"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-seo-experiments/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-link-checker/dist/module`
     */
    ["linkChecker"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     */
    ["seo"]?: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/scripts`
     */
    ["scripts"]?: typeof import("@nuxt/scripts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/image`
     */
    ["image"]?: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/fonts`
     */
    ["fonts"]?: typeof import("@nuxt/fonts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@nuxtjs/mdc", Exclude<NuxtConfig["mdc"], boolean>] | ["@nuxt/content", Exclude<NuxtConfig["content"], boolean>] | ["@nuxt/icon", Exclude<NuxtConfig["icon"], boolean>] | ["@nuxthq/studio", Exclude<NuxtConfig["studio"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-site-config/dist/module", Exclude<NuxtConfig["site"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/robots/dist/module", Exclude<NuxtConfig["robots"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/sitemap/dist/module", Exclude<NuxtConfig["sitemap"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-og-image/dist/module", Exclude<NuxtConfig["ogImage"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-schema-org/dist/module", Exclude<NuxtConfig["schemaOrg"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-seo-experiments/dist/module", Exclude<NuxtConfig["seoExperiments"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-link-checker/dist/module", Exclude<NuxtConfig["linkChecker"], boolean>] | ["@nuxtjs/seo", Exclude<NuxtConfig["seo"], boolean>] | ["@nuxt/scripts", Exclude<NuxtConfig["scripts"], boolean>] | ["@nuxt/image", Exclude<NuxtConfig["image"], boolean>] | ["@nuxt/fonts", Exclude<NuxtConfig["fonts"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     * @see https://www.npmjs.com/package/@nuxtjs/tailwindcss
     */
    ["tailwindcss"]: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/mdc`
     * @see https://www.npmjs.com/package/@nuxtjs/mdc
     */
    ["mdc"]: typeof import("@nuxtjs/mdc").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/content`
     * @see https://www.npmjs.com/package/@nuxt/content
     */
    ["content"]: typeof import("@nuxt/content").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/icon`
     * @see https://www.npmjs.com/package/@nuxt/icon
     */
    ["icon"]: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxthq/studio`
     * @see https://www.npmjs.com/package/@nuxthq/studio
     */
    ["studio"]: typeof import("@nuxthq/studio").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     * @see https://www.npmjs.com/package/@nuxtjs/color-mode
     */
    ["colorMode"]: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-site-config/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/nuxt-site-config/dist/module
     */
    ["site"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/robots/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/robots/dist/module
     */
    ["robots"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/sitemap/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/sitemap/dist/module
     */
    ["sitemap"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-og-image/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/nuxt-og-image/dist/module
     */
    ["ogImage"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-schema-org/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/nuxt-schema-org/dist/module
     */
    ["schemaOrg"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-seo-experiments/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/nuxt-seo-experiments/dist/module
     */
    ["seoExperiments"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-seo-experiments/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-link-checker/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/nuxt-link-checker/dist/module
     */
    ["linkChecker"]: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     * @see https://www.npmjs.com/package/@nuxtjs/seo
     */
    ["seo"]: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/scripts`
     * @see https://www.npmjs.com/package/@nuxt/scripts
     */
    ["scripts"]: typeof import("@nuxt/scripts").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/image`
     * @see https://www.npmjs.com/package/@nuxt/image
     */
    ["image"]: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/fonts`
     * @see https://www.npmjs.com/package/@nuxt/fonts
     */
    ["fonts"]: typeof import("@nuxt/fonts").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     * @see https://www.npmjs.com/package/@nuxtjs/tailwindcss
     */
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/mdc`
     * @see https://www.npmjs.com/package/@nuxtjs/mdc
     */
    ["mdc"]?: typeof import("@nuxtjs/mdc").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/content`
     * @see https://www.npmjs.com/package/@nuxt/content
     */
    ["content"]?: typeof import("@nuxt/content").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/icon`
     * @see https://www.npmjs.com/package/@nuxt/icon
     */
    ["icon"]?: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxthq/studio`
     * @see https://www.npmjs.com/package/@nuxthq/studio
     */
    ["studio"]?: typeof import("@nuxthq/studio").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     * @see https://www.npmjs.com/package/@nuxtjs/color-mode
     */
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-site-config/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/nuxt-site-config/dist/module
     */
    ["site"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/robots/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/robots/dist/module
     */
    ["robots"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/sitemap/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/sitemap/dist/module
     */
    ["sitemap"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-og-image/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/nuxt-og-image/dist/module
     */
    ["ogImage"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-schema-org/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/nuxt-schema-org/dist/module
     */
    ["schemaOrg"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-seo-experiments/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/nuxt-seo-experiments/dist/module
     */
    ["seoExperiments"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-seo-experiments/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-link-checker/dist/module`
     * @see https://www.npmjs.com/package//home/suneel/projects/mindtris/mindtris/node_modules/nuxt-link-checker/dist/module
     */
    ["linkChecker"]?: typeof import("/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     * @see https://www.npmjs.com/package/@nuxtjs/seo
     */
    ["seo"]?: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/scripts`
     * @see https://www.npmjs.com/package/@nuxt/scripts
     */
    ["scripts"]?: typeof import("@nuxt/scripts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/image`
     * @see https://www.npmjs.com/package/@nuxt/image
     */
    ["image"]?: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/fonts`
     * @see https://www.npmjs.com/package/@nuxt/fonts
     */
    ["fonts"]?: typeof import("@nuxt/fonts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@nuxtjs/mdc", Exclude<NuxtConfig["mdc"], boolean>] | ["@nuxt/content", Exclude<NuxtConfig["content"], boolean>] | ["@nuxt/icon", Exclude<NuxtConfig["icon"], boolean>] | ["@nuxthq/studio", Exclude<NuxtConfig["studio"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-site-config/dist/module", Exclude<NuxtConfig["site"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/robots/dist/module", Exclude<NuxtConfig["robots"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/@nuxtjs/sitemap/dist/module", Exclude<NuxtConfig["sitemap"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-og-image/dist/module", Exclude<NuxtConfig["ogImage"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-schema-org/dist/module", Exclude<NuxtConfig["schemaOrg"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-seo-experiments/dist/module", Exclude<NuxtConfig["seoExperiments"], boolean>] | ["/home/suneel/projects/mindtris/mindtris/node_modules/nuxt-link-checker/dist/module", Exclude<NuxtConfig["linkChecker"], boolean>] | ["@nuxtjs/seo", Exclude<NuxtConfig["seo"], boolean>] | ["@nuxt/scripts", Exclude<NuxtConfig["scripts"], boolean>] | ["@nuxt/image", Exclude<NuxtConfig["image"], boolean>] | ["@nuxt/fonts", Exclude<NuxtConfig["fonts"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },

   content: {
      cacheVersion: number,

      cacheIntegrity: string,

      transformers: Array<any>,

      base: string,

      api: {
         baseURL: string,
      },

      watch: {
         ws: {
            port: {
               port: number,

               portRange: Array<number>,
            },

            hostname: string,

            showURL: boolean,
         },
      },

      sources: any,

      ignores: Array<any>,

      locales: Array<any>,

      defaultLocale: any,

      highlight: boolean,

      markdown: {
         tags: {
            p: string,

            a: string,

            blockquote: string,

            "code-inline": string,

            code: string,

            em: string,

            h1: string,

            h2: string,

            h3: string,

            h4: string,

            h5: string,

            h6: string,

            hr: string,

            img: string,

            ul: string,

            ol: string,

            li: string,

            strong: string,

            table: string,

            thead: string,

            tbody: string,

            td: string,

            th: string,

            tr: string,
         },

         anchorLinks: {
            depth: number,

            exclude: Array<number>,
         },

         remarkPlugins: any,

         rehypePlugins: any,
      },

      yaml: any,

      csv: {
         delimeter: string,

         json: boolean,
      },

      navigation: {
         fields: Array<string>,
      },

      contentHead: boolean,

      documentDriven: {
         injectPage: boolean,
      },

      respectPathCase: boolean,

      experimental: {
         clientDB: boolean,

         cacheContents: boolean,

         stripQueryParameters: boolean,

         advanceQuery: boolean,

         search: any,
      },
   },

   icon: {
      serverKnownCssClasses: Array<any>,
   },

   sitemap: {
      isI18nMapped: boolean,

      sitemapName: string,

      isMultiSitemap: boolean,

      excludeAppSources: Array<any>,

      cacheMaxAgeSeconds: number,

      autoLastmod: boolean,

      defaultSitemapsChunkSize: number,

      minify: boolean,

      sortEntries: boolean,

      debug: boolean,

      discoverImages: boolean,

      discoverVideos: boolean,

      sitemapsPathPrefix: string,

      isNuxtContentDocumentDriven: boolean,

      xsl: string,

      xslTips: boolean,

      xslColumns: Array<{

      }>,

      credits: boolean,

      version: string,

      sitemaps: {
         "sitemap.xml": {
            sitemapName: string,

            route: string,

            defaults: any,

            include: Array<any>,

            exclude: Array<string>,

            includeAppSources: boolean,
         },
      },
   },

   "nuxt-scripts": {
      version: string,
   },

   "nuxt-site-config": {
      stack: Array<{

      }>,

      version: string,

      debug: boolean,
   },

   "nuxt-robots": {
      version: string,

      usingNuxtContent: boolean,

      debug: boolean,

      credits: boolean,

      groups: Array<{

      }>,

      sitemap: Array<string>,

      header: boolean,

      robotsEnabledValue: string,

      robotsDisabledValue: string,

      cacheControl: string,
   },

   "nuxt-simple-robots": {
      version: string,

      usingNuxtContent: boolean,

      debug: boolean,

      credits: boolean,

      groups: Array<{

      }>,

      sitemap: Array<string>,

      header: boolean,

      robotsEnabledValue: string,

      robotsDisabledValue: string,

      cacheControl: string,
   },

   "nuxt-og-image": {
      version: string,

      satoriOptions: any,

      resvgOptions: any,

      sharpOptions: any,

      publicStoragePath: string,

      defaults: {
         emojis: string,

         renderer: string,

         component: string,

         extension: string,

         width: number,

         height: number,

         cacheMaxAgeSeconds: number,
      },

      debug: boolean,

      baseCacheKey: string,

      fonts: Array<{

      }>,

      hasNuxtIcon: boolean,

      colorPreference: string,

      isNuxtContentDocumentDriven: boolean,
   },

   appConfigSchema: {
      properties: {
         id: string,

         properties: {
            icon: {
               title: string,

               description: string,

               tags: Array<string>,

               id: string,

               properties: {
                  size: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     tsType: string,

                     id: string,

                     default: any,

                     type: string,
                  },

                  class: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     id: string,

                     default: string,

                     type: string,
                  },

                  attrs: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     tsType: string,

                     id: string,

                     default: {
                        "aria-hidden": boolean,
                     },

                     type: string,
                  },

                  mode: {
                     title: string,

                     description: string,

                     enum: Array<string>,

                     tags: Array<string>,

                     id: string,

                     default: string,

                     type: string,
                  },

                  aliases: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     tsType: string,

                     id: string,

                     default: any,

                     type: string,
                  },

                  cssSelectorPrefix: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     id: string,

                     default: string,

                     type: string,
                  },

                  cssLayer: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     tsType: string,

                     id: string,

                     default: any,

                     type: string,
                  },

                  cssWherePseudo: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     id: string,

                     default: boolean,

                     type: string,
                  },

                  collections: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     tsType: string,

                     id: string,

                     default: any,

                     type: string,
                  },

                  provider: {
                     title: string,

                     description: string,

                     enum: Array<string>,

                     tags: Array<string>,

                     type: string,

                     id: string,

                     default: any,
                  },

                  iconifyApiEndpoint: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     id: string,

                     default: string,

                     type: string,
                  },

                  fallbackToApi: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     enum: Array<boolean|string>,

                     type: string,

                     id: string,

                     default: boolean,
                  },

                  localApiEndpoint: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     id: string,

                     default: string,

                     type: string,
                  },

                  fetchTimeout: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     id: string,

                     default: number,

                     type: string,
                  },

                  customize: {
                     title: string,

                     description: string,

                     tags: Array<string>,

                     type: string,

                     id: string,

                     default: any,
                  },
               },

               type: string,

               default: {
                  size: any,

                  class: string,

                  attrs: {
                     "aria-hidden": boolean,
                  },

                  mode: string,

                  aliases: any,

                  cssSelectorPrefix: string,

                  cssLayer: any,

                  cssWherePseudo: boolean,

                  collections: any,

                  provider: any,

                  iconifyApiEndpoint: string,

                  fallbackToApi: boolean,

                  localApiEndpoint: string,

                  fetchTimeout: number,

                  customize: any,
               },
            },

            general: {
               title: string,

               description: string,

               id: string,

               properties: {
                  title: {
                     type: string,

                     title: string,

                     description: string,

                     default: string,

                     tags: Array<string>,

                     id: string,
                  },

                  logo: {
                     type: string,

                     title: string,

                     description: string,

                     default: string,

                     tags: Array<string>,

                     id: string,
                  },
               },

               type: string,

               default: {
                  title: string,

                  logo: string,
               },
            },

            site: {
               title: string,

               description: string,

               id: string,

               properties: {
                  name: {
                     type: string,

                     title: string,

                     description: string,

                     tags: Array<string>,

                     id: string,
                  },

                  description: {
                     type: string,

                     title: string,

                     description: string,

                     tags: Array<string>,

                     id: string,
                  },

                  url: {
                     type: string,

                     title: string,

                     description: string,

                     default: string,

                     tags: Array<string>,

                     id: string,
                  },

                  favicon: {
                     title: string,

                     id: string,

                     properties: {
                        emoji: {
                           type: string,

                           title: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },

                        image: {
                           type: string,

                           tile: string,

                           tags: Array<string>,

                           id: string,
                        },
                     },

                     type: string,

                     default: {
                        emoji: string,
                     },
                  },
               },

               type: string,

               default: {
                  url: string,

                  favicon: {
                     emoji: string,
                  },
               },
            },

            directory: {
               title: string,

               description: string,

               id: string,

               properties: {
                  featured: {
                     id: string,

                     properties: {
                        showOnAllPages: {
                           type: string,

                           title: string,

                           description: string,

                           default: boolean,

                           tags: Array<string>,

                           id: string,
                        },

                        showOnSide: {
                           type: string,

                           title: string,

                           description: string,

                           default: boolean,

                           tags: Array<string>,

                           id: string,
                        },

                        labelForCard: {
                           type: string,

                           title: string,

                           description: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },

                        icon: {
                           type: string,

                           title: string,

                           description: string,

                           tags: Array<string>,

                           id: string,
                        },
                     },

                     type: string,

                     default: {
                        showOnAllPages: boolean,

                        showOnSide: boolean,

                        labelForCard: string,
                     },
                  },

                  search: {
                     title: string,

                     description: string,

                     id: string,

                     properties: {
                        placeholder: {
                           type: string,

                           title: string,

                           description: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },

                        icon: {
                           type: string,

                           title: string,

                           description: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },

                        tags: {
                           title: string,

                           description: string,

                           id: string,

                           properties: {
                              display: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: string,

                                 required: Array<string>,

                                 tags: Array<string>,

                                 id: string,
                              },

                              intersection: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: boolean,

                                 tags: Array<string>,

                                 id: string,
                              },
                           },

                           type: string,

                           default: {
                              display: string,

                              intersection: boolean,
                           },
                        },
                     },

                     type: string,

                     default: {
                        placeholder: string,

                        icon: string,

                        tags: {
                           display: string,

                           intersection: boolean,
                        },
                     },
                  },

                  grid: {
                     title: string,

                     description: string,

                     id: string,

                     properties: {
                        list: {
                           type: string,

                           title: string,

                           description: string,

                           default: boolean,

                           tags: Array<string>,

                           id: string,
                        },

                        emptyState: {
                           title: string,

                           description: string,

                           id: string,

                           properties: {
                              text: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: string,

                                 tags: Array<string>,

                                 id: string,
                              },

                              type: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: string,

                                 required: Array<string>,

                                 tags: Array<string>,

                                 id: string,
                              },

                              icon: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: string,

                                 tags: Array<string>,

                                 id: string,
                              },
                           },

                           type: string,

                           default: {
                              text: string,

                              type: string,

                              icon: string,
                           },
                        },

                        card: {
                           title: string,

                           description: string,

                           id: string,

                           properties: {
                              image: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: boolean,

                                 tags: Array<string>,

                                 id: string,
                              },

                              type: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: string,

                                 required: Array<string>,

                                 tags: Array<string>,

                                 id: string,
                              },
                           },

                           type: string,

                           default: {
                              image: boolean,

                              type: string,
                           },
                        },

                        submit: {
                           title: string,

                           description: string,

                           id: string,

                           properties: {
                              show: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: boolean,

                                 tags: Array<string>,

                                 id: string,
                              },

                              first: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: boolean,

                                 tags: Array<string>,

                                 id: string,
                              },

                              title: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: string,

                                 tags: Array<string>,

                                 id: string,
                              },

                              description: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: string,

                                 tags: Array<string>,

                                 id: string,
                              },

                              hideable: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: boolean,

                                 tags: Array<string>,

                                 id: string,
                              },

                              icon: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 default: string,

                                 tags: Array<string>,

                                 id: string,
                              },
                           },

                           type: string,

                           default: {
                              show: boolean,

                              first: boolean,

                              title: string,

                              description: string,

                              hideable: boolean,

                              icon: string,
                           },
                        },
                     },

                     type: string,

                     default: {
                        list: boolean,

                        emptyState: {
                           text: string,

                           type: string,

                           icon: string,
                        },

                        card: {
                           image: boolean,

                           type: string,
                        },

                        submit: {
                           show: boolean,

                           first: boolean,

                           title: string,

                           description: string,

                           hideable: boolean,

                           icon: string,
                        },
                     },
                  },

                  tags: {
                     type: string,

                     title: string,

                     description: string,

                     default: Array<{

                     }>,

                     tags: Array<string>,

                     id: string,

                     items: {
                        type: string,
                     },
                  },

                  tagPages: {
                     id: string,

                     properties: {
                        title: {
                           type: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },

                        description: {
                           type: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },
                     },

                     type: string,

                     default: {
                        title: string,

                        description: string,
                     },
                  },
               },

               type: string,

               default: {
                  featured: {
                     showOnAllPages: boolean,

                     showOnSide: boolean,

                     labelForCard: string,
                  },

                  search: {
                     placeholder: string,

                     icon: string,

                     tags: {
                        display: string,

                        intersection: boolean,
                     },
                  },

                  grid: {
                     list: boolean,

                     emptyState: {
                        text: string,

                        type: string,

                        icon: string,
                     },

                     card: {
                        image: boolean,

                        type: string,
                     },

                     submit: {
                        show: boolean,

                        first: boolean,

                        title: string,

                        description: string,

                        hideable: boolean,

                        icon: string,
                     },
                  },

                  tags: Array<{

                  }>,

                  tagPages: {
                     title: string,

                     description: string,
                  },
               },
            },

            header: {
               title: string,

               description: string,

               id: string,

               properties: {
                  banner: {
                     title: string,

                     description: string,

                     id: string,

                     properties: {
                        show: {
                           type: string,

                           title: string,

                           description: string,

                           default: boolean,

                           tags: Array<string>,

                           id: string,
                        },

                        text: {
                           type: string,

                           title: string,

                           description: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },

                        link: {
                           type: string,

                           title: string,

                           description: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },

                        brandText: {
                           type: string,

                           title: string,

                           description: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },
                     },

                     type: string,

                     default: {
                        show: boolean,

                        text: string,

                        link: string,

                        brandText: string,
                     },
                  },

                  navbar: {
                     title: string,

                     description: string,

                     id: string,

                     properties: {
                        colorModeSelector: {
                           type: string,

                           title: string,

                           description: string,

                           default: boolean,

                           tags: Array<string>,

                           id: string,
                        },

                        links: {
                           type: string,

                           title: string,

                           description: string,

                           default: Array<any>,

                           tags: Array<string>,

                           id: string,

                           items: {
                              type: string,
                           },
                        },
                     },

                     type: string,

                     default: {
                        colorModeSelector: boolean,

                        links: Array<any>,
                     },
                  },

                  actionButton: {
                     title: string,

                     description: string,

                     id: string,

                     properties: {
                        text: {
                           type: string,

                           title: string,

                           description: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },

                        href: {
                           type: string,

                           title: string,

                           description: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },
                     },

                     type: string,

                     default: {
                        text: string,

                        href: string,
                     },
                  },
               },

               type: string,

               default: {
                  banner: {
                     show: boolean,

                     text: string,

                     link: string,

                     brandText: string,
                  },

                  navbar: {
                     colorModeSelector: boolean,

                     links: Array<any>,
                  },

                  actionButton: {
                     text: string,

                     href: string,
                  },
               },
            },

            footer: {
               title: string,

               description: string,

               id: string,

               properties: {
                  description: {
                     type: string,

                     title: string,

                     description: string,

                     default: string,

                     tags: Array<string>,

                     id: string,
                  },

                  socials: {
                     title: string,

                     description: string,

                     id: string,

                     properties: {
                        github: {
                           id: string,

                           properties: {
                              link: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 tags: Array<string>,

                                 id: string,
                              },

                              icon: {
                                 type: string,

                                 title: string,

                                 tags: Array<string>,

                                 id: string,
                              },
                           },

                           type: string,

                           default: any,
                        },

                        x: {
                           id: string,

                           properties: {
                              link: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 tags: Array<string>,

                                 id: string,
                              },

                              icon: {
                                 type: string,

                                 title: string,

                                 tags: Array<string>,

                                 id: string,
                              },
                           },

                           type: string,

                           default: any,
                        },

                        instagram: {
                           id: string,

                           properties: {
                              link: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 tags: Array<string>,

                                 id: string,
                              },

                              icon: {
                                 type: string,

                                 title: string,

                                 tags: Array<string>,

                                 id: string,
                              },
                           },

                           type: string,

                           default: any,
                        },

                        youtube: {
                           id: string,

                           properties: {
                              link: {
                                 type: string,

                                 title: string,

                                 description: string,

                                 tags: Array<string>,

                                 id: string,
                              },

                              icon: {
                                 type: string,

                                 title: string,

                                 tags: Array<string>,

                                 id: string,
                              },
                           },

                           type: string,

                           default: any,
                        },
                     },

                     type: string,

                     default: {
                        github: any,

                        x: any,

                        instagram: any,

                        youtube: any,
                     },
                  },
               },

               type: string,

               default: {
                  description: string,

                  socials: {
                     github: any,

                     x: any,

                     instagram: any,

                     youtube: any,
                  },
               },
            },

            ui: {
               title: string,

               description: string,

               id: string,

               properties: {
                  icons: {
                     title: string,

                     description: string,

                     id: string,

                     properties: {
                        dark: {
                           type: string,

                           title: string,

                           description: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },

                        light: {
                           type: string,

                           title: string,

                           description: string,

                           default: string,

                           tags: Array<string>,

                           id: string,
                        },
                     },

                     type: string,

                     default: {
                        dark: string,

                        light: string,
                     },
                  },
               },

               type: string,

               default: {
                  icons: {
                     dark: string,

                     light: string,
                  },
               },
            },
         },

         type: string,

         default: {
            icon: {
               size: any,

               class: string,

               attrs: {
                  "aria-hidden": boolean,
               },

               mode: string,

               aliases: any,

               cssSelectorPrefix: string,

               cssLayer: any,

               cssWherePseudo: boolean,

               collections: any,

               provider: any,

               iconifyApiEndpoint: string,

               fallbackToApi: boolean,

               localApiEndpoint: string,

               fetchTimeout: number,

               customize: any,
            },

            general: {
               title: string,

               logo: string,
            },

            site: {
               url: string,

               favicon: {
                  emoji: string,
               },
            },

            directory: {
               featured: {
                  showOnAllPages: boolean,

                  showOnSide: boolean,

                  labelForCard: string,
               },

               search: {
                  placeholder: string,

                  icon: string,

                  tags: {
                     display: string,

                     intersection: boolean,
                  },
               },

               grid: {
                  list: boolean,

                  emptyState: {
                     text: string,

                     type: string,

                     icon: string,
                  },

                  card: {
                     image: boolean,

                     type: string,
                  },

                  submit: {
                     show: boolean,

                     first: boolean,

                     title: string,

                     description: string,

                     hideable: boolean,

                     icon: string,
                  },
               },

               tags: Array<{

               }>,

               tagPages: {
                  title: string,

                  description: string,
               },
            },

            header: {
               banner: {
                  show: boolean,

                  text: string,

                  link: string,

                  brandText: string,
               },

               navbar: {
                  colorModeSelector: boolean,

                  links: Array<any>,
               },

               actionButton: {
                  text: string,

                  href: string,
               },
            },

            footer: {
               description: string,

               socials: {
                  github: any,

                  x: any,

                  instagram: any,

                  youtube: any,
               },
            },

            ui: {
               icons: {
                  dark: string,

                  light: string,
               },
            },
         },
      },

      default: {
         icon: {
            size: any,

            class: string,

            attrs: {
               "aria-hidden": boolean,
            },

            mode: string,

            aliases: any,

            cssSelectorPrefix: string,

            cssLayer: any,

            cssWherePseudo: boolean,

            collections: any,

            provider: any,

            iconifyApiEndpoint: string,

            fallbackToApi: boolean,

            localApiEndpoint: string,

            fetchTimeout: number,

            customize: any,
         },

         general: {
            title: string,

            logo: string,
         },

         site: {
            url: string,

            favicon: {
               emoji: string,
            },
         },

         directory: {
            featured: {
               showOnAllPages: boolean,

               showOnSide: boolean,

               labelForCard: string,
            },

            search: {
               placeholder: string,

               icon: string,

               tags: {
                  display: string,

                  intersection: boolean,
               },
            },

            grid: {
               list: boolean,

               emptyState: {
                  text: string,

                  type: string,

                  icon: string,
               },

               card: {
                  image: boolean,

                  type: string,
               },

               submit: {
                  show: boolean,

                  first: boolean,

                  title: string,

                  description: string,

                  hideable: boolean,

                  icon: string,
               },
            },

            tags: Array<{

            }>,

            tagPages: {
               title: string,

               description: string,
            },
         },

         header: {
            banner: {
               show: boolean,

               text: string,

               link: string,

               brandText: string,
            },

            navbar: {
               colorModeSelector: boolean,

               links: Array<any>,
            },

            actionButton: {
               text: string,

               href: string,
            },
         },

         footer: {
            description: string,

            socials: {
               github: any,

               x: any,

               instagram: any,

               youtube: any,
            },
         },

         ui: {
            icons: {
               dark: string,

               light: string,
            },
         },
      },
   },

   contentSchema: any,
  }
  interface PublicRuntimeConfig {
   posthogPublicKey: string,

   posthogHost: string,

   mdc: {
      components: {
         prose: boolean,

         map: {
            p: string,

            a: string,

            blockquote: string,

            "code-inline": string,

            code: string,

            em: string,

            h1: string,

            h2: string,

            h3: string,

            h4: string,

            h5: string,

            h6: string,

            hr: string,

            img: string,

            ul: string,

            ol: string,

            li: string,

            strong: string,

            table: string,

            thead: string,

            tbody: string,

            td: string,

            th: string,

            tr: string,
         },
      },

      headings: {
         anchorLinks: {
            h1: boolean,

            h2: boolean,

            h3: boolean,

            h4: boolean,

            h5: boolean,

            h6: boolean,
         },
      },

      useNuxtImage: boolean,
   },

   content: {
      locales: Array<any>,

      defaultLocale: any,

      integrity: any,

      experimental: {
         stripQueryParameters: boolean,

         advanceQuery: boolean,

         clientDB: boolean,
      },

      respectPathCase: boolean,

      api: {
         baseURL: string,
      },

      navigation: {
         fields: Array<string>,
      },

      tags: {
         p: string,

         a: string,

         blockquote: string,

         "code-inline": string,

         code: string,

         em: string,

         h1: string,

         h2: string,

         h3: string,

         h4: string,

         h5: string,

         h6: string,

         hr: string,

         img: string,

         ul: string,

         ol: string,

         li: string,

         strong: string,

         table: string,

         thead: string,

         tbody: string,

         td: string,

         th: string,

         tr: string,
      },

      highlight: boolean,

      wsUrl: string,

      documentDriven: {
         page: boolean,

         navigation: boolean,

         surround: boolean,

         globals: any,

         layoutFallbacks: Array<string>,

         injectPage: boolean,
      },

      host: string,

      trailingSlash: boolean,

      search: any,

      contentHead: boolean,

      anchorLinks: {
         depth: number,

         exclude: Array<number>,
      },
   },

   "nuxt-schema-org": {
      reactive: boolean,

      minify: boolean,

      scriptAttributes: {
         id: string,
      },

      identity: any,

      version: string,
   },

   "nuxt-link-checker": {
      version: string,

      hasSitemapModule: boolean,

      rootDir: string,

      isNuxtContentDocumentDriven: {
         injectPage: boolean,
      },

      excludeLinks: Array<any>,

      skipInspections: Array<any>,

      fetchTimeout: number,

      showLiveInspections: boolean,

      fetchRemoteUrls: boolean,
   },

   "nuxt-seo": {
      canonicalQueryWhitelist: Array<string>,
   },

   "nuxt-scripts": {
      version: string,

      defaultScriptOptions: {
         trigger: string,
      },
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }