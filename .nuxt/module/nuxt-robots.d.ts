// Generated by nuxt-robots

declare module 'nitropack' {
  interface NitroApp {
    _robots: {
      ctx: import('../../node_modules/@nuxtjs/robots/dist/runtime/types').HookRobotsConfigContext
      nuxtContentUrls?: Set<string>
    },
    _robotsRuleMactcher: (url: string) => string
  }
  interface NitroRouteRules {
    /**
     * @deprecated Use `robots: <boolean>` instead.
     */
    index?: boolean
    robots?: boolean | string | {
      indexable: boolean
      rule: string
    }
  }
  interface NitroRouteConfig {
    /**
     * @deprecated Use `robots: <boolean>` instead.
     */
    index?: boolean
    robots?: boolean | string | {
      indexable: boolean
      rule: string
    }
  }
  interface NitroRuntimeHooks {
    'robots:config': (ctx: import('../../node_modules/@nuxtjs/robots/dist/runtime/types').HookRobotsConfigContext) => void | Promise<void>
    'robots:robots-txt': (ctx: import('../../node_modules/@nuxtjs/robots/dist/runtime/types').HookRobotsTxtContext) => void | Promise<void>
  }
}
declare module 'h3' {
  interface H3EventContext {
    robots: {
      rule: string
      indexable: boolean
    }
  }
}

export {}
