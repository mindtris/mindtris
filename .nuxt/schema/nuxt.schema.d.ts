export interface NuxtCustomSchema {
 appConfig?: {
  /**
   * Nuxt Icon
   * 
   * Configure Nuxt Icon module preferences.
   * 
   * 
   * @studioIcon material-symbols:star
  */
  icon?: {
   /**
    * Icon Size
    * 
    * Set the default icon size.
    * 
    * 
    * @studioIcon material-symbols:format-size-rounded
   */
   size?: string | undefined,

   /**
    * CSS Class
    * 
    * Set the default CSS class.
    * 
    * @default ""
    * 
    * @studioIcon material-symbols:css
   */
   class?: string,

   /**
    * Default Attributes
    * 
    * Attributes applied to every icon component.
    * 
    * @default { "aria-hidden": true }
    * 
    * 
    * @studioIcon material-symbols:settings
   */
   attrs?: Record<string, string | number | boolean>,

   /**
    * Default Rendering Mode
    * 
    * Set the default rendering mode for the icon component
    * 
    * @default "css"
    * 
    * @enum css,svg
    * 
    * @studioIcon material-symbols:move-down-rounded
   */
   mode?: string,

   /**
    * Icon aliases
    * 
    * Define Icon aliases to update them easily without code changes.
    * 
    * 
    * @studioIcon material-symbols:star-rounded
   */
   aliases?: { [alias: string]: string },

   /**
    * CSS Selector Prefix
    * 
    * Set the default CSS selector prefix.
    * 
    * @default "i-"
    * 
    * @studioIcon material-symbols:format-textdirection-l-to-r
   */
   cssSelectorPrefix?: string,

   /**
    * CSS Layer Name
    * 
    * Set the default CSS `@layer` name.
    * 
    * 
    * @studioIcon material-symbols:layers
   */
   cssLayer?: string | undefined,

   /**
    * Use CSS `:where()` Pseudo Selector
    * 
    * Use CSS `:where()` pseudo selector to reduce specificity.
    * 
    * @default true
    * 
    * @studioIcon material-symbols:low-priority
   */
   cssWherePseudo?: boolean,

   /**
    * Icon Collections
    * 
    * List of known icon collections name. Used to resolve collection name ambiguity.
    * e.g. `simple-icons-github` -> `simple-icons:github` instead of `simple:icons-github`
    * 
    * When not provided, will use the full Iconify collection list.
    * 
    * 
    * @studioIcon material-symbols:format-list-bulleted
   */
   collections?: string[] | null,

   /**
    * Icon Provider
    * 
    * Provider to use for fetching icons
    * 
    * - `server` - Fetch icons with a server handler
    * - `iconify` - Fetch icons with Iconify API, purely client-side
    * 
    * `server` by default; `iconify` when `ssr: false`
    * 
    * 
    * @enum server,iconify
    * 
    * @studioIcon material-symbols:cloud
   */
   provider?: "server" | "iconify" | undefined,

   /**
    * Iconify API Endpoint URL
    * 
    * Define a custom Iconify API endpoint URL. Useful if you want to use a self-hosted Iconify API. Learn more: https://iconify.design/docs/api.
    * 
    * @default "https://api.iconify.design"
    * 
    * @studioIcon material-symbols:api
   */
   iconifyApiEndpoint?: string,

   /**
    * Fallback to Iconify API
    * 
    * Fallback to Iconify API if server provider fails to found the collection.
    * 
    * @default true
    * 
    * @enum true,false,server-only,client-only
    * 
    * @studioIcon material-symbols:public
   */
   fallbackToApi?: boolean | "server-only" | "client-only",

   /**
    * Local API Endpoint Path
    * 
    * Define a custom path for the local API endpoint.
    * 
    * @default "/api/_nuxt_icon"
    * 
    * @studioIcon material-symbols:api
   */
   localApiEndpoint?: string,

   /**
    * Fetch Timeout
    * 
    * Set the timeout for fetching icons.
    * 
    * @default 1500
    * 
    * @studioIcon material-symbols:timer
   */
   fetchTimeout?: number,

   /**
    * Customize callback
    * 
    * Customize icon content (replace stroke-width, colors, etc...).
    * 
    * 
    * @studioIcon material-symbols:edit
   */
   customize?: IconifyIconCustomizeCallback,
  },

  /**
   * General
   * 
   * General configuration for the app.
   * 
  */
  general?: {
   /**
    * Title
    * 
    * Title of the application.
    * 
    * @default "New Directory"
    * 
    * @studioInput string
   */
   title?: string,

   /**
    * Logo
    * 
    * Logo of the application.
    * 
    * @default "/logo.png"
    * 
    * @studioInput media
   */
   logo?: string,
  },

  /**
   * Site Settings
   * 
   * SEO and Site Metadata Settings
   * 
  */
  site?: {
   /**
    * Title
    * 
    * Title of the application. If empty general title will be used.
    * 
    * 
    * @studioInput string
   */
   name?: string,

   /**
    * SEO Site Description
    * 
    * Used for the description meta tag. If empty general description will be used.
    * 
    * 
    * @studioInput string
   */
   description?: string,

   /**
    * URL
    * 
    * Base url of your website, important for the correct function of the seo module.
    * 
    * @default "https://example.com"
    * 
    * @studioInput string
   */
   url?: string,

   favicon?: {
    /**
     * emoji favicon
     * 
     * @default "🍃"
     * 
     * @studioInput string
    */
    emoji?: string,

    /**
     * 
     * @tile image favicon
     * 
     * @studioInput file
    */
    image?: string,
   },
  },

  /**
   * Directory
   * 
   * Directory configuration.
   * 
  */
  directory?: {
   featured?: {
    /**
     * Show Featured On All Pages
     * 
     * Show featured items on all pages.
     * 
     * @default true
     * 
     * @studioInput boolean
    */
    showOnAllPages?: boolean,

    /**
     * Featured listing location
     * 
     * Show recommended listing on side of the screen or bottom of the.
     * 
     * @default true
     * 
     * @studioInput boolean
    */
    showOnSide?: boolean,

    /**
     * Featured Text
     * 
     * Text to display for featured items.
     * 
     * @default "Featured ✨"
     * 
     * @studioInput string
    */
    labelForCard?: string,

    /**
     * Featured Icon
     * 
     * Icon for the banner of featured listings
     * 
     * 
     * @studioInput icon
    */
    icon?: string,
   },

   /**
    * Search
    * 
    * Search settings for the directory.
    * 
   */
   search?: {
    /**
     * Placeholder
     * 
     * Placeholder text for the search input. Use {0} to mark where to fill in the number of listings.
     * 
     * @default "Search among {0} tools"
     * 
     * @studioInput string
    */
    placeholder?: string,

    /**
     * Icon
     * 
     * Icon for the search input.
     * 
     * @default "tabler:bow"
     * 
     * @studioInput icon
    */
    icon?: string,

    /**
     * Tags
     * 
     * Tag settings for the search.
     * 
    */
    tags?: {
     /**
      * Display
      * 
      * Display option for tags.
      * 
      * @default "show-all"
      * 
      * @required none,select,show-all
      * 
      * @studioInput string
     */
     display?: string,

     /**
      * Intersection
      * 
      * Use intersection for tags.
      * 
      * @default false
      * 
      * @studioInput boolean
     */
     intersection?: boolean,
    },
   },

   /**
    * Grid
    * 
    * Grid settings for the directory.
    * 
   */
   grid?: {
    /**
     * List
     * 
     * Display as list.
     * 
     * @default false
     * 
     * @studioInput boolean
    */
    list?: boolean,

    /**
     * Empty State
     * 
     * Settings for the empty state.
     * 
    */
    emptyState?: {
     /**
      * Text
      * 
      * Text to display when no matches are found.
      * 
      * @default "No matches for this query."
      * 
      * @studioInput string
     */
     text?: string,

     /**
      * Type
      * 
      * Type of empty state.
      * 
      * @default "button"
      * 
      * @required button,simple,link
      * 
      * @studioInput string
     */
     type?: string,

     /**
      * Icon
      * 
      * Icon for the empty state.
      * 
      * @default "tabler:ship"
      * 
      * @studioInput icon
     */
     icon?: string,
    },

    /**
     * Listing Card
     * 
     * Settings on how to display individual cards.
     * 
    */
    card?: {
     /**
      * Image
      * 
      * Images on cards
      * 
      * @default false
      * 
      * @studioInput boolean
     */
     image?: boolean,

     /**
      * Type
      * 
      * Type of empty state.
      * 
      * @default "dashed"
      * 
      * @required dashed,shadow,outline,bullet
      * 
      * @studioInput string
     */
     type?: string,
    },

    /**
     * Submit
     * 
     * Settings for the submit button.
     * 
    */
    submit?: {
     /**
      * Show
      * 
      * Show the submit button.
      * 
      * @default true
      * 
      * @studioInput boolean
     */
     show?: boolean,

     /**
      * First
      * 
      * Show first submit button.
      * 
      * @default false
      * 
      * @studioInput boolean
     */
     first?: boolean,

     /**
      * Title
      * 
      * Title for the submit button.
      * 
      * @default "Submit a template"
      * 
      * @studioInput string
     */
     title?: string,

     /**
      * Description
      * 
      * Description for the submit button.
      * 
      * @default "Submit a template to show off a good project to other people."
      * 
      * @studioInput string
     */
     description?: string,

     /**
      * Hideable
      * 
      * Allow hiding the submit button.
      * 
      * @default true
      * 
      * @studioInput boolean
     */
     hideable?: boolean,

     /**
      * Icon
      * 
      * Icon shown in the submit suggestion in the grid.
      * 
      * @default "tabler:send"
      * 
      * @studioInput icon
     */
     icon?: string,
    },
   },

   /**
    * Tags
    * 
    * Tags for the directory.
    * 
    * @default [{"name":"SAAS","color":"blue"},{"name":"dashboard","color":"green"},{"name":"landing-page"},{"name":"toolbox"},{"name":"agency"},{"name":"markdown-based"},{"name":"basics","color":"indigo"}]
    * 
    * @studioInput array
   */
   tags?: Array<{

   }>,

   tagPages?: {
    /**
     * @default "All {0} products"
     * 
     * @studioInput string
    */
    title?: string,

    /**
     * @default "All {0} products"
     * 
     * @studioInput string
    */
    description?: string,
   },
  },

  /**
   * Header
   * 
   * Header configuration.
   * 
  */
  header?: {
   /**
    * Banner
    * 
    * Banner settings for the header.
    * 
   */
   banner?: {
    /**
     * Show
     * 
     * Show the banner.
     * 
     * @default true
     * 
     * @studioInput boolean
    */
    show?: boolean,

    /**
     * Text
     * 
     * Text to display in the banner.
     * 
     * @default "Create your own directory website in minutes."
     * 
     * @studioInput string
    */
    text?: string,

    /**
     * Link
     * 
     * Link for the banner.
     * 
     * @default "https://github.com/masterkram/nuxt-directory"
     * 
     * @studioInput string
    */
    link?: string,

    /**
     * Brand Text
     * 
     * Brand text for the banner.
     * 
     * @default "MintedDirectory"
     * 
     * @studioInput string
    */
    brandText?: string,
   },

   /**
    * Navbar
    * 
    * Navbar settings for the header.
    * 
   */
   navbar?: {
    /**
     * Color Mode Selector
     * 
     * Show the color mode selector in the navbar.
     * 
     * @default true
     * 
     * @studioInput boolean
    */
    colorModeSelector?: boolean,

    /**
     * Link Array
     * 
     * Links to show on the navbar.
     * 
     * 
     * @studioInput array
    */
    links?: Array<any>,
   },

   /**
    * Action Button
    * 
    * Action button settings for the header.
    * 
   */
   actionButton?: {
    /**
     * Text
     * 
     * Text for the action button.
     * 
     * @default "Submit a starter"
     * 
     * @studioInput string
    */
    text?: string,

    /**
     * Href
     * 
     * Link for the action button.
     * 
     * @default "/submit"
     * 
     * @studioInput string
    */
    href?: string,
   },
  },

  /**
   * Footer
   * 
   * Footer configuration.
   * 
  */
  footer?: {
   /**
    * Description
    * 
    * Description to display in the footer.
    * 
    * @default "Find the the best Nuxt templates."
    * 
    * @studioInput string
   */
   description?: string,

   /**
    * Socials
    * 
    * Social links for the footer.
    * 
   */
   socials?: {
    github?: {
     /**
      * Github Link
      * 
      * Link to github profile
      * 
      * 
      * @studioInput string
     */
     link?: string,

     /**
      * Github Icon
      * 
      * 
      * @studioInput icon
     */
     icon?: string,
    },

    x?: {
     /**
      * X Link
      * 
      * Link to X profile
      * 
      * 
      * @studioInput string
     */
     link?: string,

     /**
      * X icon
      * 
      * 
      * @studioInput icon
     */
     icon?: string,
    },

    instagram?: {
     /**
      * Instagram Link
      * 
      * Link to Instagram Profile
      * 
      * 
      * @studioInput string
     */
     link?: string,

     /**
      * Instagram Icon
      * 
      * 
      * @studioInput icon
     */
     icon?: string,
    },

    youtube?: {
     /**
      * Youtube Link
      * 
      * Link to Youtube Account
      * 
      * 
      * @studioInput string
     */
     link?: string,

     /**
      * Youtube Icon
      * 
      * 
      * @studioInput icon
     */
     icon?: string,
    },
   },
  },

  /**
   * UI
   * 
   * UI Customization.
   * 
  */
  ui?: {
   /**
    * Icons
    * 
    * Manage icons used in UI.
    * 
   */
   icons?: {
    /**
     * Dark mode
     * 
     * Icon of color mode button for dark mode.
     * 
     * @default "tabler:moon"
     * 
     * @studioInput icon
    */
    dark?: string,

    /**
     * Light mode
     * 
     * Icon of color mode button for light mode.
     * 
     * @default "tabler:sun"
     * 
     * @studioInput icon
    */
    light?: string,
   },
  },
 },
}
export type CustomAppConfig = Exclude<NuxtCustomSchema['appConfig'], undefined>
type _CustomAppConfig = CustomAppConfig

declare module '@nuxt/schema' {
  interface NuxtConfig extends Omit<NuxtCustomSchema, 'appConfig'> {}
  interface NuxtOptions extends Omit<NuxtCustomSchema, 'appConfig'> {}
  interface CustomAppConfig extends _CustomAppConfig {}
}

declare module 'nuxt/schema' {
  interface NuxtConfig extends Omit<NuxtCustomSchema, 'appConfig'> {}
  interface NuxtOptions extends Omit<NuxtCustomSchema, 'appConfig'> {}
  interface CustomAppConfig extends _CustomAppConfig {}
}
