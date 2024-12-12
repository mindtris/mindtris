import { effectScope, shallowReactive, reactive, getCurrentScope, hasInjectionContext, getCurrentInstance, inject, toRef, version, unref, ref, watchEffect, watch, onMounted, isRef, onScopeDispose, h, shallowRef, isReadonly, onServerPrefetch, isShallow, isReactive, toRaw, defineAsyncComponent, computed, toValue, mergeProps, useSSRContext, defineComponent, resolveComponent, withCtx, createVNode, createTextVNode, provide, Suspense, nextTick, Transition, Fragment, onErrorCaptured, resolveDynamicComponent, createApp } from "vue";
import { $fetch as $fetch$1 } from "ofetch";
import { baseURL } from "#internal/nuxt/paths";
import { createHooks } from "hookable";
import { getContext } from "unctx";
import { sanitizeStatusCode, createError as createError$1, appendHeader, getRequestHeader, setCookie, getCookie, deleteCookie } from "h3";
import { getActiveHead, useScript as useScript$1, CapoPlugin, useHead as useHead$1 } from "unhead";
import { defineHeadPlugin as defineHeadPlugin$1, composableNames, unpackMeta } from "@unhead/shared";
import { START_LOCATION, createMemoryHistory, createRouter as createRouter$1, useRoute as useRoute$1, RouterView } from "vue-router";
import { toRouteMatcher, createRouter } from "radix3";
import { defu as defu$1, defuFn } from "defu";
import { hasProtocol, isScriptProtocol, joinURL, withQuery, withoutTrailingSlash, hasTrailingSlash, withTrailingSlash, withBase, parseURL, withLeadingSlash, withoutBase, stringifyQuery } from "ufo";
import destr from "destr";
import { klona } from "klona";
import "consola";
import { InferSeoMetaPlugin } from "@unhead/addons";
import { isEqual, hash } from "ohash";
import { camelCase } from "scule";
import { parse as parse$1, stringify } from "devalue";
import { _api, disableCache, addAPIProvider, getIcon, loadIcon as loadIcon$1, Icon } from "@iconify/vue";
import { parse } from "cookie-es";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderSlot, ssrRenderSuspense, ssrRenderVNode } from "vue/server-renderer";
import { getIconCSS } from "@iconify/utils/lib/css/icon";
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink", "prefetch": true, "prefetchOn": { "visibility": true } };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.14.1592";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin2.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  const global2 = options.global || typeof name !== "string";
  const mw = typeof name !== "string" ? name : middleware;
  if (!mw) {
    console.warn("[nuxt] No route middleware passed to `addRouteMiddleware`.", name);
    return;
  }
  if (global2) {
    nuxtApp._middleware.global.push(mw);
  } else {
    nuxtApp._middleware.named[name] = mw;
  }
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version[0] === "3";
function resolveUnref$2(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput$2(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root = resolveUnref$2(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput$2(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput$2(root[k]);
    }
    return resolved;
  }
  return root;
}
defineHeadPlugin$1({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput$2(entry2.input);
    }
  }
});
const headSymbol$2 = "usehead";
const _global$2 = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$3 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global$2[globalKey$3] = handler;
}
function injectHead$2() {
  if (globalKey$3 in _global$2) {
    return _global$2[globalKey$3]();
  }
  const head = inject(headSymbol$2);
  if (!head && process.env.NODE_ENV !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
version[0] === "3";
function resolveUnref$1(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput$1(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root = resolveUnref$1(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput$1(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput$1(root[k]);
    }
    return resolved;
  }
  return root;
}
defineHeadPlugin$1({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput$1(entry2.input);
    }
  }
});
const headSymbol$1 = "usehead";
const _global$1 = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$2 = "__unhead_injection_handler__";
function injectHead$1() {
  if (globalKey$2 in _global$1) {
    return _global$1[globalKey$2]();
  }
  const head = inject(headSymbol$1);
  if (!head && process.env.NODE_ENV !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead$1();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput$1(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames$1 = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames$1, ...composableNames]
});
function registerVueScopeHandlers(script, scope) {
  if (!scope) {
    return;
  }
  const _registerCb = (key, cb) => {
    if (!script._cbs[key]) {
      cb(script.instance);
      return () => {
      };
    }
    let i = script._cbs[key].push(cb);
    const destroy = () => {
      var _a;
      if (i) {
        (_a = script._cbs[key]) == null ? void 0 : _a.splice(i - 1, 1);
        i = null;
      }
    };
    onScopeDispose(destroy);
    return destroy;
  };
  script.onLoaded = (cb) => _registerCb("loaded", cb);
  script.onError = (cb) => _registerCb("error", cb);
  onScopeDispose(() => {
    var _a;
    (_a = script._triggerAbortController) == null ? void 0 : _a.abort();
  });
}
function useScript(_input, _options) {
  const input = typeof _input === "string" ? { src: _input } : _input;
  const options = _options || {};
  const head = (options == null ? void 0 : options.head) || injectHead$1();
  options.head = head;
  const scope = getCurrentInstance();
  options.eventContext = scope;
  if (scope && typeof options.trigger === "undefined") {
    options.trigger = onMounted;
  } else if (isRef(options.trigger)) {
    const refTrigger = options.trigger;
    let off;
    options.trigger = new Promise((resolve) => {
      off = watch(refTrigger, (val) => {
        if (val) {
          resolve(true);
        }
      }, {
        immediate: true
      });
      onScopeDispose(() => resolve(false), true);
    }).then((val) => {
      off == null ? void 0 : off();
      return val;
    });
  }
  head._scriptStatusWatcher = head._scriptStatusWatcher || head.hooks.hook("script:updated", ({ script: s }) => {
    s._statusRef.value = s.status;
  });
  const script = useScript$1(input, options);
  script._statusRef = script._statusRef || ref(script.status);
  registerVueScopeHandlers(script, scope);
  return new Proxy(script, {
    get(_, key, a) {
      return Reflect.get(_, key === "status" ? "_statusRef" : key, a);
    }
  });
}
function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = unpackMeta({ ...t._flatMeta });
      delete t._flatMeta;
      return {
        // @ts-expect-error runtime type
        ...t,
        meta: meta2
      };
    }
  });
}
function useServerHead$1(input, options = {}) {
  const head = options.head || injectHead$1();
  delete options.head;
  if (head)
    return head.push(input, { ...options, mode: "server" });
}
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$1 = "__unctx__";
_globalThis[globalKey$1] || (_globalThis[globalKey$1] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
const interpolatePath = (route, match) => {
  return match.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(url) {
  {
    const _routeRulesMatcher2 = toRouteMatcher(
      createRouter({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu$1({}, ..._routeRulesMatcher2.matchAll(url).reverse());
  }
}
const __nuxt_page_meta = {
  documentDriven: false
};
const _routes = [
  {
    name: "all",
    path: "/:all(.*)*",
    component: () => import("./_nuxt/_...all_-CF548uRu.js")
  },
  {
    name: "About",
    path: "/About",
    component: () => import("./_nuxt/About-sc89Q0F3.js")
  },
  {
    name: "Blogs",
    path: "/Blogs",
    component: () => import("./_nuxt/Blogs-CtYewINw.js")
  },
  {
    name: "Changelog",
    path: "/Changelog",
    component: () => import("./_nuxt/Changelog-DIeZlQPk.js")
  },
  {
    name: "Contact",
    path: "/Contact",
    component: () => import("./_nuxt/Contact-xCnEmTvG.js")
  },
  {
    name: "Customers",
    path: "/Customers",
    component: () => import("./_nuxt/Customers-D-JHWPTW.js")
  },
  {
    name: "Help",
    path: "/Help",
    component: () => import("./_nuxt/Help-BPhEh0hM.js")
  },
  {
    name: "Integrations",
    path: "/Integrations",
    component: () => import("./_nuxt/Integrations-DYDbqgU0.js")
  },
  {
    name: "Pricing",
    path: "/Pricing",
    component: () => import("./_nuxt/Pricing-63a6mGXT.js")
  },
  {
    name: "SignIn",
    path: "/SignIn",
    component: () => import("./_nuxt/SignIn-ugQoV6_7.js")
  },
  {
    name: "SignUp",
    path: "/SignUp",
    component: () => import("./_nuxt/SignUp-DPWV766j.js")
  },
  {
    name: "tags-slug",
    path: "/tags/:slug()",
    meta: __nuxt_page_meta || {},
    component: () => import("./_nuxt/_slug_-ClhTQJP6.js")
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index2) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index2]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  const unsub = router.beforeResolve((final) => {
    unsub();
    if (final === to) {
      const unsub2 = router.afterEach(async () => {
        unsub2();
        await nuxtApp.runWithContext(() => showError(error));
      });
      return false;
    }
  });
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes2 = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter$1({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes: routes2
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    if (!((_b = nuxtApp.ssrContext) == null ? void 0 : _b.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray$1(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from) => {
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a, _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler = !import.meta.prerender || !((_a = nuxtApp.ssrContext) == null ? void 0 : _a._sharedPrerenderCache) ? _handler : () => {
    const value = nuxtApp.ssrContext._sharedPrerenderCache.get(key);
    if (value) {
      return value;
    }
    const promise = Promise.resolve().then(() => nuxtApp.runWithContext(_handler));
    nuxtApp.ssrContext._sharedPrerenderCache.set(key, promise);
    return promise;
  };
  const getDefault = () => asyncDataDefaults.value;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = options.server ?? true;
  options.default = options.default ?? getDefault;
  options.getCachedData = options.getCachedData ?? getDefaultCachedData;
  options.lazy = options.lazy ?? false;
  options.immediate = options.immediate ?? true;
  options.deep = options.deep ?? asyncDataDefaults.deep;
  options.dedupe = options.dedupe ?? "cancel";
  const initialCachedData = options.getCachedData(key, nuxtApp);
  const hasCachedData = initialCachedData != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_b = nuxtApp.payload._errors)[key] ?? (_b[key] = asyncDataDefaults.errorValue);
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(hasCachedData ? initialCachedData : options.default()),
      pending: ref(!hasCachedData),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle"),
      _default: options.default
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  delete asyncData._default;
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer(opts.dedupe ?? options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial || nuxtApp.isHydrating && opts._initial !== false) {
      const cachedData = opts._initial ? initialCachedData : options.getCachedData(key, nuxtApp);
      if (cachedData != null) {
        return Promise.resolve(cachedData);
      }
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = asyncDataDefaults.errorValue;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function prerenderRoutes(path) {
  if (!import.meta.prerender) {
    return;
  }
  const paths = toArray(path);
  appendHeader(useRequestEvent(), "x-nitro-prerender", paths.map((p) => encodeURIComponent(p)).join(", "));
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ?? (opts.filter = (key) => key === name);
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const cfg0 = defineAppConfig({
  general: {
    title: "Minted Directory",
    logo: "",
    iconLogo: "fluent-emoji-flat:leaf-fluttering-in-wind"
  },
  site: {
    // override the general settings for seo tags.
    // leave empty for general priority.
    // url is necessary for correct function of seo module.
    name: "Minted Directory",
    description: "Example Description",
    url: "https://example.com",
    favicon: {
      image: "",
      emoji: "🍃"
    }
  },
  directory: {
    search: {
      placeholder: "Search among {0} tools",
      icon: "tabler:bow",
      tags: {
        // options: none,select,show-all,
        display: "select",
        intersection: false
      }
    },
    grid: {
      list: false,
      emptyState: {
        text: "Seems that this entry is missing from the archives.",
        // options: button, simple, link
        type: "button",
        icon: "tabler:exclamation-mark"
      },
      card: {
        image: true,
        // options: dashed, shadow, outline, bullet
        type: "shadow"
      },
      submit: {
        show: true,
        first: false,
        title: "Submit a template",
        description: "Submit a template to show off a good project to other people.",
        hideable: true
      }
    },
    featured: {
      showOnAllPages: true,
      showOnSide: true,
      icon: "tabler:star",
      labelForCard: "Featured ✨"
    },
    tags: [
      { name: "SAAS", color: "blue" },
      { name: "dashboard", color: "green" },
      { name: "landing-page" },
      { name: "toolbox" },
      { name: "agency" },
      { name: "markdown-based" },
      { name: "basics", color: "indigo" }
    ],
    tagPages: {
      title: "Available {0} products:",
      description: "View all available tools and templates in the {0} category..."
    }
  },
  header: {
    banner: {
      show: true,
      text: "Create your own directory website in minutes.",
      link: "https://minteddirectory.com",
      brandText: "MintedDirectory"
    },
    navbar: {
      colorModeSelector: true,
      links: [
        { name: "Directory", to: "/" },
        { name: "Blog", to: "/blog" },
        { name: "Advertise", to: "/advertise" },
        {
          name: "Analytics",
          to: "https://us.posthog.com/shared/7dgSk4cvgNYnJwBu6R47kZXHBUBJWQ",
          target: "_blank"
        }
      ]
    },
    actionButton: {
      text: "Submit a starter",
      href: "/submit"
    }
  },
  footer: {
    description: "Best directory for my niche.",
    socials: {
      github: {
        link: "",
        icon: "tabler:brand-github"
      },
      facebook: {
        link: "",
        icon: "tabler:brand-facebook"
      },
      instagram: {
        link: "",
        icon: "tabler:brand-instagram"
      },
      x: {
        link: "https://x.com/mark_bruderer",
        icon: "tabler:brand-twitter"
      },
      youtube: {
        link: "https://www.youtube.com/@mark_hacks",
        icon: "tabler:brand-youtube"
      }
    }
  },
  ui: {
    icons: {
      dark: "tabler:moon",
      light: "tabler:sun"
    }
  },
  icon: {
    attrs: {
      "key-129": ""
    }
  }
});
const inlineConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  }
};
const __appConfig = /* @__PURE__ */ defuFn(cfg0, inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = klona(__appConfig);
  }
  return nuxtApp._appConfig;
}
const _0_siteConfig_MwZUzHrRNP = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-site-config:init",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a;
    const state = useState("site-config");
    {
      const context = (_a = useRequestEvent()) == null ? void 0 : _a.context;
      nuxtApp.hooks.hook("app:rendered", () => {
        state.value = context == null ? void 0 : context.siteConfig.get({
          debug: (/* @__PURE__ */ useRuntimeConfig())["nuxt-site-config"].debug,
          resolveRefs: true
        });
      });
    }
    let stack = {};
    return {
      provide: {
        nuxtSiteConfig: stack
      }
    };
  }
});
function updateSiteConfig(input = {}) {
  {
    const stack = useRequestEvent().context.siteConfig;
    stack.push(input);
    return;
  }
}
const site_config_server_pnEF9VM0sY = /* @__PURE__ */ defineNuxtPlugin({
  enforce: "pre",
  // make it happen early
  setup() {
    const config = useAppConfig().site;
    updateSiteConfig({
      name: config.name ?? "",
      url: config.url ?? "",
      description: config.description ?? "",
      defaultLocale: "en"
    });
    if (config.favicon.emoji) {
      useHead({
        link: [
          {
            rel: "icon",
            href: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${config.favicon.emoji}</text></svg>`
          }
        ]
      });
    } else if (config.favicon.image) {
      useHead({
        link: [
          {
            rel: "icon",
            href: config.favicon.image
          }
        ]
      });
    }
  }
});
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
{
  reducers.push(["Island", (data) => data && (data == null ? void 0 : data.__nuxt_island)]);
}
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const LazyFeatureExample = defineAsyncComponent(() => import("./_nuxt/FeatureExample-CEUi9yAT.js").then((r) => r["default"] || r.default || r));
const LazySponsorExample = defineAsyncComponent(() => import("./_nuxt/SponsorExample-BsAPdrh2.js").then((r) => r["default"] || r.default || r));
const LazyBlogGrid = defineAsyncComponent(() => import("./_nuxt/BlogGrid-BoVEs82t.js").then((r) => r["default"] || r.default || r));
const LazyDirectoryGrid = defineAsyncComponent(() => import("./_nuxt/DirectoryGrid-DSFTDC8h.js").then((r) => r["default"] || r.default || r));
const LazySearch = defineAsyncComponent(() => import("./_nuxt/Search-DQPBQmFA.js").then((r) => r["default"] || r.default || r));
const LazyLinkButton = defineAsyncComponent(() => import("./_nuxt/LinkButton-Dibepu1Q.js").then((r) => r["default"] || r.default || r));
const LazyNewsletterForm = defineAsyncComponent(() => import("./_nuxt/NewsletterForm-DWFdhJAV.js").then((r) => r["default"] || r.default || r));
const LazyNewsletterWithCTA = defineAsyncComponent(() => import("./_nuxt/NewsletterWithCTA-Ce0onBNc.js").then((r) => r["default"] || r.default || r));
const LazyTweet = defineAsyncComponent(() => import("./_nuxt/Tweet-C9s_ybJS.js").then((r) => r["default"] || r.default || r));
const LazyCenterHero = defineAsyncComponent(() => import("./_nuxt/CenterHero-CYxEF2LY.js").then((r) => r["default"] || r.default || r));
const LazyImageHero = defineAsyncComponent(() => import("./_nuxt/ImageHero-IhLlDq60.js").then((r) => r["default"] || r.default || r));
const LazySimpleLeftHero = defineAsyncComponent(() => import("./_nuxt/SimpleLeftHero-DHDB-kqe.js").then((r) => r["default"] || r.default || r));
const LazyTwoColumnHero = defineAsyncComponent(() => import("./_nuxt/TwoColumnHero-C9u3KEMl.js").then((r) => r["default"] || r.default || r));
const LazyAbout = defineAsyncComponent(() => import("./_nuxt/About-B_LP0-By.js").then((r) => r["default"] || r.default || r));
const LazyBlogPost = defineAsyncComponent(() => import("./_nuxt/BlogPost-BEd4mR6S.js").then((r) => r["default"] || r.default || r));
const LazyBlogs = defineAsyncComponent(() => import("./_nuxt/Blogs-BJc9NluI.js").then((r) => r["default"] || r.default || r));
const LazyChangelog = defineAsyncComponent(() => import("./_nuxt/Changelog-BDodY0l1.js").then((r) => r["default"] || r.default || r));
const LazyContact = defineAsyncComponent(() => import("./_nuxt/Contact-DX3DPM_q.js").then((r) => r["default"] || r.default || r));
const LazyCustomer = defineAsyncComponent(() => import("./_nuxt/Customer-BSHh8NNY.js").then((r) => r["default"] || r.default || r));
const LazyCustomers = defineAsyncComponent(() => import("./_nuxt/Customers-C6hDP1Vn.js").then((r) => r["default"] || r.default || r));
const LazyHelp = defineAsyncComponent(() => import("./_nuxt/Help-C3VM3yJE.js").then((r) => r["default"] || r.default || r));
const LazyHome = defineAsyncComponent(() => import("./_nuxt/Home-Dsp7qjJu.js").then((r) => r["default"] || r.default || r));
const LazyIntegrations = defineAsyncComponent(() => import("./_nuxt/Integrations-Ct6PtuO0.js").then((r) => r["default"] || r.default || r));
const LazyIntegrationsSingle = defineAsyncComponent(() => import("./_nuxt/IntegrationsSingle-C56b3RMx.js").then((r) => r["default"] || r.default || r));
const LazyPricing = defineAsyncComponent(() => import("./_nuxt/Pricing-BshuYvZh.js").then((r) => r["default"] || r.default || r));
const LazyResetPassword = defineAsyncComponent(() => import("./_nuxt/ResetPassword-C3xvwbW2.js").then((r) => r["default"] || r.default || r));
const LazySignIn = defineAsyncComponent(() => import("./_nuxt/SignIn-BVFUlbpZ.js").then((r) => r["default"] || r.default || r));
const LazySignUp = defineAsyncComponent(() => import("./_nuxt/SignUp-QnvLB52K.js").then((r) => r["default"] || r.default || r));
const LazyBlogList = defineAsyncComponent(() => import("./_nuxt/BlogList-CHlFJdeD.js").then((r) => r["default"] || r.default || r));
const LazyBlogSingle = defineAsyncComponent(() => import("./_nuxt/BlogSingle-D9v_-4B3.js").then((r) => r["default"] || r.default || r));
const LazyClients = defineAsyncComponent(() => import("./_nuxt/Clients-BuD0zmt0.js").then((r) => r["default"] || r.default || r));
const LazyCta = defineAsyncComponent(() => import("./_nuxt/Cta-gN73Wmjw.js").then((r) => r["default"] || r.default || r));
const LazyCta02 = defineAsyncComponent(() => import("./_nuxt/Cta02-Cvv9NR8S.js").then((r) => r["default"] || r.default || r));
const LazyCta03 = defineAsyncComponent(() => import("./_nuxt/Cta03-PUJestZk.js").then((r) => r["default"] || r.default || r));
const LazyCta04 = defineAsyncComponent(() => import("./_nuxt/Cta04-Cj16Rgdj.js").then((r) => r["default"] || r.default || r));
const LazyCta05 = defineAsyncComponent(() => import("./_nuxt/Cta05-BPZq9cdM.js").then((r) => r["default"] || r.default || r));
const LazyCustomersList = defineAsyncComponent(() => import("./_nuxt/CustomersList-v2d7bY8L.js").then((r) => r["default"] || r.default || r));
const LazyCustomersRelated = defineAsyncComponent(() => import("./_nuxt/CustomersRelated-NSXnswKF.js").then((r) => r["default"] || r.default || r));
const LazyFaqs = defineAsyncComponent(() => import("./_nuxt/Faqs-CnnOqSSv.js").then((r) => r["default"] || r.default || r));
const LazyFeatures = defineAsyncComponent(() => import("./_nuxt/Features-DPmrTuVO.js").then((r) => r["default"] || r.default || r));
const LazyFeatures02 = defineAsyncComponent(() => import("./_nuxt/Features02-DhcnkBvu.js").then((r) => r["default"] || r.default || r));
const LazyFeatures03 = defineAsyncComponent(() => import("./_nuxt/Features03-DCvlWSMb.js").then((r) => r["default"] || r.default || r));
const LazyFeatures04 = defineAsyncComponent(() => import("./_nuxt/Features04-53k-q-T7.js").then((r) => r["default"] || r.default || r));
const LazyFeatures05 = defineAsyncComponent(() => import("./_nuxt/Features05-D5l-MtYu.js").then((r) => r["default"] || r.default || r));
const LazyFooter = defineAsyncComponent(() => import("./_nuxt/Footer-Ca_tsc5K.js").then((r) => r["default"] || r.default || r));
const LazyHeader = defineAsyncComponent(() => import("./_nuxt/Header-BY-WppDT.js").then((r) => r["default"] || r.default || r));
const LazyHero = defineAsyncComponent(() => import("./_nuxt/Hero-BUyOBQlu.js").then((r) => r["default"] || r.default || r));
const LazyHeroAbout = defineAsyncComponent(() => import("./_nuxt/HeroAbout-CKc0WI5-.js").then((r) => r["default"] || r.default || r));
const LazyHighlighter = defineAsyncComponent(() => import("./_nuxt/Highlighter-rDu8yanv.js").then((r) => r["default"] || r.default || r));
const LazyHighlighterItem = defineAsyncComponent(() => import("./_nuxt/HighlighterItem-BtY04OnY.js").then((r) => r["default"] || r.default || r));
const LazyHighlighterItem02 = defineAsyncComponent(() => import("./_nuxt/HighlighterItem02-Dte_jkz4.js").then((r) => r["default"] || r.default || r));
const LazyIntegrationCard = defineAsyncComponent(() => import("./_nuxt/IntegrationCard-DsQXQExq.js").then((r) => r["default"] || r.default || r));
const LazyIntegrationsCarousel = defineAsyncComponent(() => import("./_nuxt/IntegrationsCarousel-CLDUuhvC.js").then((r) => r["default"] || r.default || r));
const LazyIntegrationsHero = defineAsyncComponent(() => import("./_nuxt/IntegrationsHero-DH2Kj0bt.js").then((r) => r["default"] || r.default || r));
const LazyIntegrationsList = defineAsyncComponent(() => import("./_nuxt/IntegrationsList-w57EZI2Q.js").then((r) => r["default"] || r.default || r));
const LazyPageIllustration = defineAsyncComponent(() => import("./_nuxt/PageIllustration-Ux88KiB_.js").then((r) => r["default"] || r.default || r));
const LazyParticles = defineAsyncComponent(() => import("./_nuxt/Particles-D_AH7wgF.js").then((r) => r["default"] || r.default || r));
const LazyPricingHero = defineAsyncComponent(() => import("./_nuxt/PricingHero-D9YMp3EL.js").then((r) => r["default"] || r.default || r));
const LazyPricingHome = defineAsyncComponent(() => import("./_nuxt/PricingHome-Da2KEpdC.js").then((r) => r["default"] || r.default || r));
const LazyPricingTable = defineAsyncComponent(() => import("./_nuxt/PricingTable-B_hPLfAD.js").then((r) => r["default"] || r.default || r));
const LazyRecruitment = defineAsyncComponent(() => import("./_nuxt/Recruitment-YB20nvCM.js").then((r) => r["default"] || r.default || r));
const LazyStory = defineAsyncComponent(() => import("./_nuxt/Story-DxjtdPtj.js").then((r) => r["default"] || r.default || r));
const LazyTeam = defineAsyncComponent(() => import("./_nuxt/Team-v3qKNBQA.js").then((r) => r["default"] || r.default || r));
const LazyTestimonials = defineAsyncComponent(() => import("./_nuxt/Testimonials-DmG9KlYs.js").then((r) => r["default"] || r.default || r));
const LazyTestimonials02 = defineAsyncComponent(() => import("./_nuxt/Testimonials02-Byr4a68S.js").then((r) => r["default"] || r.default || r));
const LazyTestimonialsCarousel = defineAsyncComponent(() => import("./_nuxt/TestimonialsCarousel-C_vOx5z5.js").then((r) => r["default"] || r.default || r));
const LazyProseA = defineAsyncComponent(() => import("./_nuxt/ProseA-A6ogBwcs.js").then((r) => r["default"] || r.default || r));
const LazyTallyForm = defineAsyncComponent(() => import("./_nuxt/TallyForm-BYqJN8EA.js").then((r) => r["default"] || r.default || r));
const LazyMousePosition = defineAsyncComponent(() => import("./_nuxt/MousePosition-B1c7Rcu_.js").then((r) => r["default"] || r.default || r));
const LazyContentDoc = defineAsyncComponent(() => import("./_nuxt/ContentDoc-BS8051SL.js").then((r) => r["default"] || r.default || r));
const LazyContentList = defineAsyncComponent(() => import("./_nuxt/ContentList-BpPemIBn.js").then((r) => r["default"] || r.default || r));
const LazyContentNavigation = defineAsyncComponent(() => import("./_nuxt/ContentNavigation-CKhEdCwg.js").then((r) => r["default"] || r.default || r));
const LazyContentQuery = defineAsyncComponent(() => import("./_nuxt/ContentQuery-CphY0VWJ.js").then((r) => r["default"] || r.default || r));
const LazyContentRenderer = defineAsyncComponent(() => import("./_nuxt/ContentRenderer-4hSCwL5S.js").then((r) => r["default"] || r.default || r));
const LazyContentRendererMarkdown = defineAsyncComponent(() => import("./_nuxt/ContentRendererMarkdown-0Fj0P90W.js").then((r) => r["default"] || r.default || r));
const LazyContentSlot = defineAsyncComponent(() => import("./_nuxt/ContentSlot-DNhFlZPM.js").then((r) => r["default"] || r.default || r));
const LazyDocumentDrivenEmpty = defineAsyncComponent(() => import("./_nuxt/DocumentDrivenEmpty-CVfz7tly.js").then((r) => r["default"] || r.default || r));
const LazyDocumentDrivenNotFound = defineAsyncComponent(() => import("./_nuxt/DocumentDrivenNotFound-4pTrsASA.js").then((r) => r["default"] || r.default || r));
const LazyMarkdown = defineAsyncComponent(() => import("./_nuxt/Markdown-DRg0F_8k.js").then((r) => r["default"] || r.default || r));
const LazyProseCode = defineAsyncComponent(() => import("./_nuxt/ProseCode-xuPxMa16.js").then((r) => r["default"] || r.default || r));
const LazyProseCodeInline = defineAsyncComponent(() => import("./_nuxt/ProseCodeInline-D6r0rmSy.js").then((r) => r["default"] || r.default || r));
const LazyProsePre = defineAsyncComponent(() => import("./_nuxt/ProsePre-Brs49lSw.js").then((r) => r["default"] || r.default || r));
const LazyProseBlockquote = defineAsyncComponent(() => import("./_nuxt/ProseBlockquote-08ih46k7.js").then((r) => r["default"] || r.default || r));
const LazyProseEm = defineAsyncComponent(() => import("./_nuxt/ProseEm-8tMIYa5o.js").then((r) => r["default"] || r.default || r));
const LazyProseH1 = defineAsyncComponent(() => import("./_nuxt/ProseH1-CVSd7TLm.js").then((r) => r["default"] || r.default || r));
const LazyProseH2 = defineAsyncComponent(() => import("./_nuxt/ProseH2-YGmo65kJ.js").then((r) => r["default"] || r.default || r));
const LazyProseH3 = defineAsyncComponent(() => import("./_nuxt/ProseH3-CdnuKTOE.js").then((r) => r["default"] || r.default || r));
const LazyProseH4 = defineAsyncComponent(() => import("./_nuxt/ProseH4-Bw3Vo0a3.js").then((r) => r["default"] || r.default || r));
const LazyProseH5 = defineAsyncComponent(() => import("./_nuxt/ProseH5-CtLAWTlL.js").then((r) => r["default"] || r.default || r));
const LazyProseH6 = defineAsyncComponent(() => import("./_nuxt/ProseH6-DJ8UuCOF.js").then((r) => r["default"] || r.default || r));
const LazyProseHr = defineAsyncComponent(() => import("./_nuxt/ProseHr-CUPznU3M.js").then((r) => r["default"] || r.default || r));
const LazyProseImg = defineAsyncComponent(() => import("./_nuxt/ProseImg-CblXvgNe.js").then((r) => r["default"] || r.default || r));
const LazyProseLi = defineAsyncComponent(() => import("./_nuxt/ProseLi-CtpLr8iS.js").then((r) => r["default"] || r.default || r));
const LazyProseOl = defineAsyncComponent(() => import("./_nuxt/ProseOl-BAZd6C40.js").then((r) => r["default"] || r.default || r));
const LazyProseP = defineAsyncComponent(() => import("./_nuxt/ProseP-BkqLxeK7.js").then((r) => r["default"] || r.default || r));
const LazyProseScript = defineAsyncComponent(() => import("./_nuxt/ProseScript-D0R07iM6.js").then((r) => r["default"] || r.default || r));
const LazyProseStrong = defineAsyncComponent(() => import("./_nuxt/ProseStrong-CAxaYJkb.js").then((r) => r["default"] || r.default || r));
const LazyProseTable = defineAsyncComponent(() => import("./_nuxt/ProseTable-vC_3KUB6.js").then((r) => r["default"] || r.default || r));
const LazyProseTbody = defineAsyncComponent(() => import("./_nuxt/ProseTbody-BTmxqo40.js").then((r) => r["default"] || r.default || r));
const LazyProseTd = defineAsyncComponent(() => import("./_nuxt/ProseTd-C5CSnDUd.js").then((r) => r["default"] || r.default || r));
const LazyProseTh = defineAsyncComponent(() => import("./_nuxt/ProseTh-Aw8dTQ5C.js").then((r) => r["default"] || r.default || r));
const LazyProseThead = defineAsyncComponent(() => import("./_nuxt/ProseThead-CxymZ1Bk.js").then((r) => r["default"] || r.default || r));
const LazyProseTr = defineAsyncComponent(() => import("./_nuxt/ProseTr-Caefp4uf.js").then((r) => r["default"] || r.default || r));
const LazyProseUl = defineAsyncComponent(() => import("./_nuxt/ProseUl-CyDWvMfX.js").then((r) => r["default"] || r.default || r));
const LazyIcon = defineAsyncComponent(() => Promise.resolve().then(function() {
  return index;
}).then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["FeatureExample", LazyFeatureExample],
  ["SponsorExample", LazySponsorExample],
  ["BlogGrid", LazyBlogGrid],
  ["DirectoryGrid", LazyDirectoryGrid],
  ["Search", LazySearch],
  ["LinkButton", LazyLinkButton],
  ["NewsletterForm", LazyNewsletterForm],
  ["NewsletterWithCTA", LazyNewsletterWithCTA],
  ["Tweet", LazyTweet],
  ["CenterHero", LazyCenterHero],
  ["ImageHero", LazyImageHero],
  ["SimpleLeftHero", LazySimpleLeftHero],
  ["TwoColumnHero", LazyTwoColumnHero],
  ["About", LazyAbout],
  ["BlogPost", LazyBlogPost],
  ["Blogs", LazyBlogs],
  ["Changelog", LazyChangelog],
  ["Contact", LazyContact],
  ["Customer", LazyCustomer],
  ["Customers", LazyCustomers],
  ["Help", LazyHelp],
  ["Home", LazyHome],
  ["Integrations", LazyIntegrations],
  ["IntegrationsSingle", LazyIntegrationsSingle],
  ["Pricing", LazyPricing],
  ["ResetPassword", LazyResetPassword],
  ["SignIn", LazySignIn],
  ["SignUp", LazySignUp],
  ["BlogList", LazyBlogList],
  ["BlogSingle", LazyBlogSingle],
  ["Clients", LazyClients],
  ["Cta", LazyCta],
  ["Cta02", LazyCta02],
  ["Cta03", LazyCta03],
  ["Cta04", LazyCta04],
  ["Cta05", LazyCta05],
  ["CustomersList", LazyCustomersList],
  ["CustomersRelated", LazyCustomersRelated],
  ["Faqs", LazyFaqs],
  ["Features", LazyFeatures],
  ["Features02", LazyFeatures02],
  ["Features03", LazyFeatures03],
  ["Features04", LazyFeatures04],
  ["Features05", LazyFeatures05],
  ["Footer", LazyFooter],
  ["Header", LazyHeader],
  ["Hero", LazyHero],
  ["HeroAbout", LazyHeroAbout],
  ["Highlighter", LazyHighlighter],
  ["HighlighterItem", LazyHighlighterItem],
  ["HighlighterItem02", LazyHighlighterItem02],
  ["IntegrationCard", LazyIntegrationCard],
  ["IntegrationsCarousel", LazyIntegrationsCarousel],
  ["IntegrationsHero", LazyIntegrationsHero],
  ["IntegrationsList", LazyIntegrationsList],
  ["PageIllustration", LazyPageIllustration],
  ["Particles", LazyParticles],
  ["PricingHero", LazyPricingHero],
  ["PricingHome", LazyPricingHome],
  ["PricingTable", LazyPricingTable],
  ["Recruitment", LazyRecruitment],
  ["Story", LazyStory],
  ["Team", LazyTeam],
  ["Testimonials", LazyTestimonials],
  ["Testimonials02", LazyTestimonials02],
  ["TestimonialsCarousel", LazyTestimonialsCarousel],
  ["ProseA", LazyProseA],
  ["TallyForm", LazyTallyForm],
  ["MousePosition", LazyMousePosition],
  ["ContentDoc", LazyContentDoc],
  ["ContentList", LazyContentList],
  ["ContentNavigation", LazyContentNavigation],
  ["ContentQuery", LazyContentQuery],
  ["ContentRenderer", LazyContentRenderer],
  ["ContentRendererMarkdown", LazyContentRendererMarkdown],
  ["MDCSlot", LazyContentSlot],
  ["DocumentDrivenEmpty", LazyDocumentDrivenEmpty],
  ["DocumentDrivenNotFound", LazyDocumentDrivenNotFound],
  ["Markdown", LazyMarkdown],
  ["ProseCode", LazyProseCode],
  ["ProseCodeInline", LazyProseCodeInline],
  ["ProsePre", LazyProsePre],
  ["ProseBlockquote", LazyProseBlockquote],
  ["ProseEm", LazyProseEm],
  ["ProseH1", LazyProseH1],
  ["ProseH2", LazyProseH2],
  ["ProseH3", LazyProseH3],
  ["ProseH4", LazyProseH4],
  ["ProseH5", LazyProseH5],
  ["ProseH6", LazyProseH6],
  ["ProseHr", LazyProseHr],
  ["ProseImg", LazyProseImg],
  ["ProseLi", LazyProseLi],
  ["ProseOl", LazyProseOl],
  ["ProseP", LazyProseP],
  ["ProseScript", LazyProseScript],
  ["ProseStrong", LazyProseStrong],
  ["ProseTable", LazyProseTable],
  ["ProseTbody", LazyProseTbody],
  ["ProseTd", LazyProseTd],
  ["ProseTh", LazyProseTh],
  ["ProseThead", LazyProseThead],
  ["ProseTr", LazyProseTr],
  ["ProseUl", LazyProseUl],
  ["Icon", LazyIcon]
];
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
function titleCase(s) {
  return s.replaceAll("-", " ").replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
}
const titles_dw2T9lEw4h = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-seo:fallback-titles",
  env: {
    islands: false
  },
  setup() {
    const route = useRoute();
    const title = computed(() => {
      var _a, _b;
      if (typeof ((_a = route.meta) == null ? void 0 : _a.title) === "string")
        return (_b = route.meta) == null ? void 0 : _b.title;
      const path = withoutTrailingSlash(route.path || "/");
      const lastSegment = path.split("/").pop();
      return lastSegment ? titleCase(lastSegment) : null;
    });
    const minimalPriority = {
      // give nuxt.config values higher priority
      tagPriority: 101
    };
    useHead({ title: () => title.value }, minimalPriority);
  }
});
function useSiteConfig(options) {
  let stack;
  stack = useRequestEvent().context.siteConfig.get(defu$1({ resolveRefs: true }, options));
  return stack || {};
}
const siteConfig_izaWKZ8rEu = /* @__PURE__ */ defineNuxtPlugin(() => {
  const head = injectHead$1();
  if (!head)
    return;
  const siteConfig = useSiteConfig();
  const input = {
    meta: [],
    templateParams: {
      site: siteConfig,
      // support legacy
      siteUrl: siteConfig.url,
      siteName: siteConfig.name
    }
  };
  if (siteConfig.separator)
    input.templateParams.separator = siteConfig.separator;
  if (siteConfig.titleSeparator)
    input.templateParams.titleSeparator = siteConfig.titleSeparator;
  if (siteConfig.description) {
    input.templateParams.siteDescription = siteConfig.description;
    input.meta.push(
      {
        name: "description",
        content: "%site.description"
      }
    );
  }
  head.push(input, { tagPriority: 150 });
});
const inferSeoMetaPlugin_Uk9bcXDHeN = /* @__PURE__ */ defineNuxtPlugin(() => {
  const head = injectHead$1();
  if (!head)
    return;
  head.use(InferSeoMetaPlugin());
});
function defineSchemaOrgResolver(schema) {
  return schema;
}
function idReference(node) {
  return {
    "@id": typeof node !== "string" ? node["@id"] : node
  };
}
function resolvableDateToDate(val) {
  try {
    const date = val instanceof Date ? val : new Date(Date.parse(val));
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  } catch (e) {
  }
  return typeof val === "string" ? val : val.toString();
}
const IS_VALID_W3C_DATE = [
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
  /^\d{4}-[01]\d-[0-3]\d$/,
  /^\d{4}-[01]\d$/,
  /^\d{4}$/
];
function isValidW3CDate(d) {
  return IS_VALID_W3C_DATE.some((r) => r.test(d));
}
function resolvableDateToIso(val) {
  if (!val)
    return val;
  try {
    if (val instanceof Date)
      return val.toISOString();
    else if (isValidW3CDate(val))
      return val;
    else
      return new Date(Date.parse(val)).toISOString();
  } catch (e) {
  }
  return typeof val === "string" ? val : val.toString();
}
const IdentityId = "#identity";
function setIfEmpty(node, field, value) {
  if (!(node == null ? void 0 : node[field]) && value)
    node[field] = value;
}
function asArray(input) {
  return Array.isArray(input) ? input : [input];
}
function dedupeMerge(node, field, value) {
  const data = new Set(asArray(node[field]));
  data.add(value);
  node[field] = [...data].filter(Boolean);
}
function prefixId(url, id) {
  if (hasProtocol(id))
    return id;
  if (!id.includes("#"))
    id = `#${id}`;
  return withBase(id, url);
}
function trimLength(val, length) {
  if (!val)
    return val;
  if (val.length > length) {
    const trimmedString = val.substring(0, length);
    return trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
  }
  return val;
}
function resolveDefaultType(node, defaultType) {
  const val = node["@type"];
  if (val === defaultType)
    return;
  const types = /* @__PURE__ */ new Set([
    ...asArray(defaultType),
    ...asArray(val)
  ]);
  node["@type"] = types.size === 1 ? val : [...types.values()];
}
function resolveWithBase(base, urlOrPath) {
  if (!urlOrPath || hasProtocol(urlOrPath) || urlOrPath[0] !== "/" && urlOrPath[0] !== "#")
    return urlOrPath;
  return withBase(urlOrPath, base);
}
function resolveAsGraphKey(key) {
  if (!key)
    return key;
  return key.substring(key.lastIndexOf("#"));
}
function stripEmptyProperties(obj) {
  for (const k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) {
      continue;
    }
    if (obj[k] && typeof obj[k] === "object") {
      if (obj[k].__v_isReadonly || obj[k].__v_isRef)
        return;
      stripEmptyProperties(obj[k]);
      return;
    }
    if (obj[k] === "" || obj[k] === null || obj[k] === void 0)
      delete obj[k];
  }
  return obj;
}
const quantitativeValueResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "number") {
      return {
        value: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "QuantitativeValue"
  }
});
const monetaryAmountResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "MonetaryAmount"
  },
  resolve(node, ctx) {
    if (typeof node.value !== "number")
      node.value = resolveRelation(node.value, ctx, quantitativeValueResolver);
    return node;
  }
});
const merchantReturnPolicyResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "MerchantReturnPolicy"
  },
  resolve(node, ctx) {
    if (node.returnPolicyCategory)
      node.returnPolicyCategory = withBase(node.returnPolicyCategory, "https://schema.org/");
    if (node.returnFees)
      node.returnFees = withBase(node.returnFees, "https://schema.org/");
    if (node.returnMethod)
      node.returnMethod = withBase(node.returnMethod, "https://schema.org/");
    node.returnShippingFeesAmount = resolveRelation(node.returnShippingFeesAmount, ctx, monetaryAmountResolver);
    return node;
  }
});
const definedRegionResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "DefinedRegion"
  }
});
const shippingDeliveryTimeResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "ShippingDeliveryTime"
  },
  resolve(node, ctx) {
    node.handlingTime = resolveRelation(node.handlingTime, ctx, quantitativeValueResolver);
    node.transitTime = resolveRelation(node.transitTime, ctx, quantitativeValueResolver);
    return node;
  }
});
const offerShippingDetailsResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "OfferShippingDetails"
  },
  resolve(node, ctx) {
    node.deliveryTime = resolveRelation(node.deliveryTime, ctx, shippingDeliveryTimeResolver);
    node.shippingDestination = resolveRelation(node.shippingDestination, ctx, definedRegionResolver);
    node.shippingRate = resolveRelation(node.shippingRate, ctx, monetaryAmountResolver);
    return node;
  }
});
const offerResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "number" || typeof node === "string") {
      return {
        price: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "Offer",
    "availability": "InStock"
  },
  resolve(node, ctx) {
    setIfEmpty(node, "priceCurrency", ctx.meta.currency);
    setIfEmpty(node, "priceValidUntil", new Date(Date.UTC((/* @__PURE__ */ new Date()).getFullYear() + 1, 12, -1, 0, 0, 0)));
    if (node.url)
      resolveWithBase(ctx.meta.host, node.url);
    if (node.availability)
      node.availability = withBase(node.availability, "https://schema.org/");
    if (node.itemCondition)
      node.itemCondition = withBase(node.itemCondition, "https://schema.org/");
    if (node.priceValidUntil)
      node.priceValidUntil = resolvableDateToIso(node.priceValidUntil);
    node.hasMerchantReturnPolicy = resolveRelation(node.hasMerchantReturnPolicy, ctx, merchantReturnPolicyResolver);
    node.shippingDetails = resolveRelation(node.shippingDetails, ctx, offerShippingDetailsResolver);
    return node;
  }
});
const aggregateOfferResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "AggregateOffer"
  },
  inheritMeta: [
    { meta: "currency", key: "priceCurrency" }
  ],
  resolve(node, ctx) {
    node.offers = resolveRelation(node.offers, ctx, offerResolver);
    if (node.offers)
      setIfEmpty(node, "offerCount", asArray(node.offers).length);
    return node;
  }
});
const aggregateRatingResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "AggregateRating"
  }
});
const listItemResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "string") {
      node = {
        name: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "ListItem"
  },
  resolve(node, ctx) {
    if (typeof node.item === "string")
      node.item = resolveWithBase(ctx.meta.host, node.item);
    else if (typeof node.item === "object")
      node.item = resolveRelation(node.item, ctx);
    return node;
  }
});
const PrimaryBreadcrumbId = "#breadcrumb";
const breadcrumbResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "BreadcrumbList"
  },
  idPrefix: ["url", PrimaryBreadcrumbId],
  resolve(breadcrumb, ctx) {
    if (breadcrumb.itemListElement) {
      let index2 = 1;
      breadcrumb.itemListElement = resolveRelation(breadcrumb.itemListElement, ctx, listItemResolver, {
        array: true,
        afterResolve(node) {
          setIfEmpty(node, "position", index2++);
        }
      });
    }
    return breadcrumb;
  },
  resolveRootNode(node, { find }) {
    const webPage = find(PrimaryWebPageId);
    if (webPage)
      setIfEmpty(webPage, "breadcrumb", idReference(node));
  }
});
const imageResolver = defineSchemaOrgResolver({
  alias: "image",
  cast(input) {
    if (typeof input === "string") {
      input = {
        url: input
      };
    }
    return input;
  },
  defaults: {
    "@type": "ImageObject"
  },
  inheritMeta: [
    // @todo possibly only do if there's a caption
    "inLanguage"
  ],
  idPrefix: "host",
  resolve(image, { meta }) {
    image.url = resolveWithBase(meta.host, image.url);
    setIfEmpty(image, "contentUrl", image.url);
    if (image.height && !image.width)
      delete image.height;
    if (image.width && !image.height)
      delete image.width;
    return image;
  }
});
const addressResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "PostalAddress"
  }
});
const searchActionResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint"
    },
    "query-input": {
      "@type": "PropertyValueSpecification",
      "valueRequired": true,
      "valueName": "search_term_string"
    }
  },
  resolve(node, ctx) {
    if (typeof node.target === "string") {
      node.target = {
        "@type": "EntryPoint",
        "urlTemplate": resolveWithBase(ctx.meta.host, node.target)
      };
    }
    return node;
  }
});
const PrimaryWebSiteId = "#website";
const webSiteResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "WebSite"
  },
  inheritMeta: [
    "inLanguage",
    { meta: "host", key: "url" }
  ],
  idPrefix: ["host", PrimaryWebSiteId],
  resolve(node, ctx) {
    node.potentialAction = resolveRelation(node.potentialAction, ctx, searchActionResolver, {
      array: true
    });
    node.publisher = resolveRelation(node.publisher, ctx);
    return node;
  },
  resolveRootNode(node, { find }) {
    if (resolveAsGraphKey(node["@id"]) === PrimaryWebSiteId) {
      const identity = find(IdentityId);
      if (identity)
        setIfEmpty(node, "publisher", idReference(identity));
      const webPage = find(PrimaryWebPageId);
      if (webPage)
        setIfEmpty(webPage, "isPartOf", idReference(node));
    }
    return node;
  }
});
const organizationResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Organization"
  },
  idPrefix: ["host", IdentityId],
  inheritMeta: [
    { meta: "host", key: "url" }
  ],
  resolve(node, ctx) {
    resolveDefaultType(node, "Organization");
    node.address = resolveRelation(node.address, ctx, addressResolver);
    return node;
  },
  resolveRootNode(node, ctx) {
    const isIdentity = resolveAsGraphKey(node["@id"]) === IdentityId;
    const webPage = ctx.find(PrimaryWebPageId);
    if (node.logo && isIdentity) {
      if (!ctx.find("#organization")) {
        const logoNode = resolveRelation(node.logo, ctx, imageResolver, {
          root: true,
          afterResolve(logo) {
            logo["@id"] = prefixId(ctx.meta.host, "#logo");
            setIfEmpty(logo, "caption", node.name);
          }
        });
        if (webPage && logoNode)
          setIfEmpty(webPage, "primaryImageOfPage", idReference(logoNode));
        ctx.nodes.push({
          // we want to make a simple node that has the essentials, this will allow parent nodes to inject
          // as well without inserting invalid data (i.e LocalBusiness operatingHours)
          "@type": "Organization",
          "name": node.name,
          "url": node.url,
          "sameAs": node.sameAs,
          // 'image': idReference(logoNode),
          "address": node.address,
          // needs to be a URL
          "logo": resolveRelation(node.logo, ctx, imageResolver, { root: false }).url,
          "_priority": -1,
          "@id": prefixId(ctx.meta.host, "#organization")
          // avoid the id so nothing can link to it
        });
      }
      delete node.logo;
    }
    if (isIdentity && webPage)
      setIfEmpty(webPage, "about", idReference(node));
    const webSite = ctx.find(PrimaryWebSiteId);
    if (webSite)
      setIfEmpty(webSite, "publisher", idReference(node));
  }
});
const readActionResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "ReadAction"
  },
  resolve(node, ctx) {
    if (!node.target.includes(ctx.meta.url))
      node.target.unshift(ctx.meta.url);
    return node;
  }
});
const PrimaryWebPageId = "#webpage";
const webPageResolver = defineSchemaOrgResolver({
  defaults({ meta }) {
    const endPath = withoutTrailingSlash(meta.url.substring(meta.url.lastIndexOf("/") + 1));
    let type = "WebPage";
    switch (endPath) {
      case "about":
      case "about-us":
        type = "AboutPage";
        break;
      case "search":
        type = "SearchResultsPage";
        break;
      case "checkout":
        type = "CheckoutPage";
        break;
      case "contact":
      case "get-in-touch":
      case "contact-us":
        type = "ContactPage";
        break;
      case "faq":
        type = "FAQPage";
        break;
    }
    const defaults = {
      "@type": type
    };
    return defaults;
  },
  idPrefix: ["url", PrimaryWebPageId],
  inheritMeta: [
    { meta: "title", key: "name" },
    "description",
    "datePublished",
    "dateModified",
    "url"
  ],
  resolve(node, ctx) {
    node.dateModified = resolvableDateToIso(node.dateModified);
    node.datePublished = resolvableDateToIso(node.datePublished);
    resolveDefaultType(node, "WebPage");
    node.about = resolveRelation(node.about, ctx, organizationResolver);
    node.breadcrumb = resolveRelation(node.breadcrumb, ctx, breadcrumbResolver);
    node.author = resolveRelation(node.author, ctx, personResolver);
    node.primaryImageOfPage = resolveRelation(node.primaryImageOfPage, ctx, imageResolver);
    node.potentialAction = resolveRelation(node.potentialAction, ctx, readActionResolver);
    if (node["@type"] === "WebPage" && ctx.meta.url) {
      setIfEmpty(node, "potentialAction", [
        {
          "@type": "ReadAction",
          "target": [ctx.meta.url]
        }
      ]);
    }
    return node;
  },
  resolveRootNode(webPage, { find, meta }) {
    const identity = find(IdentityId);
    const webSite = find(PrimaryWebSiteId);
    const logo = find("#logo");
    if (identity && meta.url === meta.host)
      setIfEmpty(webPage, "about", idReference(identity));
    if (logo)
      setIfEmpty(webPage, "primaryImageOfPage", idReference(logo));
    if (webSite)
      setIfEmpty(webPage, "isPartOf", idReference(webSite));
    const breadcrumb = find(PrimaryBreadcrumbId);
    if (breadcrumb)
      setIfEmpty(webPage, "breadcrumb", idReference(breadcrumb));
    return webPage;
  }
});
const personResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "string") {
      return {
        name: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "Person"
  },
  idPrefix: ["host", IdentityId],
  resolve(node, ctx) {
    if (node.url)
      node.url = resolveWithBase(ctx.meta.host, node.url);
    return node;
  },
  resolveRootNode(node, { find, meta }) {
    if (resolveAsGraphKey(node["@id"]) === IdentityId) {
      setIfEmpty(node, "url", meta.host);
      const webPage = find(PrimaryWebPageId);
      if (webPage)
        setIfEmpty(webPage, "about", idReference(node));
      const webSite = find(PrimaryWebSiteId);
      if (webSite)
        setIfEmpty(webSite, "publisher", idReference(node));
    }
    const article = find(PrimaryArticleId);
    if (article)
      setIfEmpty(article, "author", idReference(node));
  }
});
const PrimaryArticleId = "#article";
const articleResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Article"
  },
  inheritMeta: [
    "inLanguage",
    "description",
    "image",
    "dateModified",
    "datePublished",
    { meta: "title", key: "headline" }
  ],
  idPrefix: ["url", PrimaryArticleId],
  resolve(node, ctx) {
    node.author = resolveRelation(node.author, ctx, personResolver, {
      root: true
    });
    node.publisher = resolveRelation(node.publisher, ctx);
    node.dateModified = resolvableDateToIso(node.dateModified);
    node.datePublished = resolvableDateToIso(node.datePublished);
    resolveDefaultType(node, "Article");
    node.headline = trimLength(node.headline, 110);
    return node;
  },
  resolveRootNode(node, { find, meta }) {
    var _a;
    const webPage = find(PrimaryWebPageId);
    const identity = find(IdentityId);
    if (node.image && !node.thumbnailUrl) {
      const firstImage = asArray(node.image)[0];
      if (typeof firstImage === "string")
        setIfEmpty(node, "thumbnailUrl", resolveWithBase(meta.host, firstImage));
      else if (firstImage == null ? void 0 : firstImage["@id"])
        setIfEmpty(node, "thumbnailUrl", (_a = find(firstImage["@id"])) == null ? void 0 : _a.url);
    }
    if (identity) {
      setIfEmpty(node, "publisher", idReference(identity));
      setIfEmpty(node, "author", idReference(identity));
    }
    if (webPage) {
      setIfEmpty(node, "isPartOf", idReference(webPage));
      setIfEmpty(node, "mainEntityOfPage", idReference(webPage));
      setIfEmpty(webPage, "potentialAction", [
        {
          "@type": "ReadAction",
          "target": [meta.url]
        }
      ]);
      setIfEmpty(webPage, "dateModified", node.dateModified);
      setIfEmpty(webPage, "datePublished", node.datePublished);
    }
    return node;
  }
});
const bookEditionResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Book"
  },
  inheritMeta: [
    "inLanguage"
  ],
  resolve(node, ctx) {
    if (node.bookFormat)
      node.bookFormat = withBase(node.bookFormat, "https://schema.org/");
    if (node.datePublished)
      node.datePublished = resolvableDateToDate(node.datePublished);
    node.author = resolveRelation(node.author, ctx);
    return node;
  },
  resolveRootNode(node, { find }) {
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(node, "provider", idReference(identity));
    return node;
  }
});
const PrimaryBookId = "#book";
const bookResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Book"
  },
  inheritMeta: [
    "description",
    "url",
    { meta: "title", key: "name" }
  ],
  idPrefix: ["url", PrimaryBookId],
  resolve(node, ctx) {
    node.workExample = resolveRelation(node.workExample, ctx, bookEditionResolver);
    node.author = resolveRelation(node.author, ctx);
    if (node.url)
      withBase(node.url, ctx.meta.host);
    return node;
  },
  resolveRootNode(node, { find }) {
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(node, "author", idReference(identity));
    return node;
  }
});
const commentResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Comment"
  },
  idPrefix: "url",
  resolve(node, ctx) {
    node.author = resolveRelation(node.author, ctx, personResolver, {
      root: true
    });
    return node;
  },
  resolveRootNode(node, { find }) {
    const article = find(PrimaryArticleId);
    if (article)
      setIfEmpty(node, "about", idReference(article));
  }
});
const courseResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Course"
  },
  resolve(node, ctx) {
    node.provider = resolveRelation(node.provider, ctx, organizationResolver, {
      root: true
    });
    return node;
  },
  resolveRootNode(node, { find }) {
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(node, "provider", idReference(identity));
    return node;
  }
});
const placeResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Place"
  },
  resolve(node, ctx) {
    if (typeof node.address !== "string")
      node.address = resolveRelation(node.address, ctx, addressResolver);
    return node;
  }
});
const virtualLocationResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "string") {
      return {
        url: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "VirtualLocation"
  }
});
const PrimaryEventId = "#event";
const eventResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Event"
  },
  inheritMeta: [
    "inLanguage",
    "description",
    "image",
    { meta: "title", key: "name" }
  ],
  idPrefix: ["url", PrimaryEventId],
  resolve(node, ctx) {
    var _a;
    if (node.location) {
      const isVirtual = node.location === "string" || ((_a = node.location) == null ? void 0 : _a.url) !== "undefined";
      node.location = resolveRelation(node.location, ctx, isVirtual ? virtualLocationResolver : placeResolver);
    }
    node.performer = resolveRelation(node.performer, ctx, personResolver, {
      root: true
    });
    node.organizer = resolveRelation(node.organizer, ctx, organizationResolver, {
      root: true
    });
    node.offers = resolveRelation(node.offers, ctx, offerResolver);
    if (node.eventAttendanceMode)
      node.eventAttendanceMode = withBase(node.eventAttendanceMode, "https://schema.org/");
    if (node.eventStatus)
      node.eventStatus = withBase(node.eventStatus, "https://schema.org/");
    const isOnline = node.eventStatus === "https://schema.org/EventMovedOnline";
    const dates = ["startDate", "previousStartDate", "endDate"];
    dates.forEach((date) => {
      if (!isOnline) {
        if (node[date] instanceof Date && node[date].getHours() === 0 && node[date].getMinutes() === 0)
          node[date] = resolvableDateToDate(node[date]);
      } else {
        node[date] = resolvableDateToIso(node[date]);
      }
    });
    setIfEmpty(node, "endDate", node.startDate);
    return node;
  },
  resolveRootNode(node, { find }) {
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(node, "organizer", idReference(identity));
  }
});
const openingHoursResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "OpeningHoursSpecification",
    "opens": "00:00",
    "closes": "23:59"
  }
});
const localBusinessResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": ["Organization", "LocalBusiness"]
  },
  inheritMeta: [
    { key: "url", meta: "host" },
    { key: "currenciesAccepted", meta: "currency" }
  ],
  idPrefix: ["host", IdentityId],
  resolve(node, ctx) {
    resolveDefaultType(node, ["Organization", "LocalBusiness"]);
    node.address = resolveRelation(node.address, ctx, addressResolver);
    node.openingHoursSpecification = resolveRelation(node.openingHoursSpecification, ctx, openingHoursResolver);
    node = resolveNode({ ...node }, ctx, organizationResolver);
    return node;
  },
  resolveRootNode(node, ctx) {
    organizationResolver.resolveRootNode(node, ctx);
    return node;
  }
});
const ratingResolver = defineSchemaOrgResolver({
  cast(node) {
    if (node === "number") {
      return {
        ratingValue: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "Rating",
    "bestRating": 5,
    "worstRating": 1
  }
});
const foodEstablishmentResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": ["Organization", "LocalBusiness", "FoodEstablishment"]
  },
  inheritMeta: [
    { key: "url", meta: "host" },
    { key: "currenciesAccepted", meta: "currency" }
  ],
  idPrefix: ["host", IdentityId],
  resolve(node, ctx) {
    resolveDefaultType(node, ["Organization", "LocalBusiness", "FoodEstablishment"]);
    node.starRating = resolveRelation(node.starRating, ctx, ratingResolver);
    node = resolveNode(node, ctx, localBusinessResolver);
    return node;
  },
  resolveRootNode(node, ctx) {
    localBusinessResolver.resolveRootNode(node, ctx);
    return node;
  }
});
const howToStepDirectionResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "string") {
      return {
        text: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "HowToDirection"
  }
});
const howToStepResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "string") {
      return {
        text: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "HowToStep"
  },
  resolve(step, ctx) {
    if (step.url)
      step.url = resolveWithBase(ctx.meta.url, step.url);
    if (step.image) {
      step.image = resolveRelation(step.image, ctx, imageResolver, {
        root: true
      });
    }
    if (step.itemListElement)
      step.itemListElement = resolveRelation(step.itemListElement, ctx, howToStepDirectionResolver);
    return step;
  }
});
const HowToId = "#howto";
const howToResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "HowTo"
  },
  inheritMeta: [
    "description",
    "image",
    "inLanguage",
    { meta: "title", key: "name" }
  ],
  idPrefix: ["url", HowToId],
  resolve(node, ctx) {
    node.step = resolveRelation(node.step, ctx, howToStepResolver);
    return node;
  },
  resolveRootNode(node, { find }) {
    const webPage = find(PrimaryWebPageId);
    if (webPage)
      setIfEmpty(node, "mainEntityOfPage", idReference(webPage));
  }
});
const itemListResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "ItemList"
  },
  resolve(node, ctx) {
    if (node.itemListElement) {
      let index2 = 1;
      node.itemListElement = resolveRelation(node.itemListElement, ctx, listItemResolver, {
        array: true,
        afterResolve(node2) {
          setIfEmpty(node2, "position", index2++);
        }
      });
    }
    return node;
  }
});
const jobPostingResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "JobPosting"
  },
  idPrefix: ["url", "#job-posting"],
  resolve(node, ctx) {
    node.datePosted = resolvableDateToIso(node.datePosted);
    node.hiringOrganization = resolveRelation(node.hiringOrganization, ctx, organizationResolver);
    node.jobLocation = resolveRelation(node.jobLocation, ctx, placeResolver);
    node.baseSalary = resolveRelation(node.baseSalary, ctx, monetaryAmountResolver);
    node.validThrough = resolvableDateToIso(node.validThrough);
    return node;
  },
  resolveRootNode(jobPosting, { find }) {
    const webPage = find(PrimaryWebPageId);
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(jobPosting, "hiringOrganization", idReference(identity));
    if (webPage)
      setIfEmpty(jobPosting, "mainEntityOfPage", idReference(webPage));
    return jobPosting;
  }
});
const reviewResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Review"
  },
  inheritMeta: [
    "inLanguage"
  ],
  resolve(review, ctx) {
    review.reviewRating = resolveRelation(review.reviewRating, ctx, ratingResolver);
    review.author = resolveRelation(review.author, ctx, personResolver);
    return review;
  }
});
const videoResolver = defineSchemaOrgResolver({
  cast(input) {
    if (typeof input === "string") {
      input = {
        url: input
      };
    }
    return input;
  },
  alias: "video",
  defaults: {
    "@type": "VideoObject"
  },
  inheritMeta: [
    { meta: "title", key: "name" },
    "description",
    "image",
    "inLanguage",
    { meta: "datePublished", key: "uploadDate" }
  ],
  idPrefix: "host",
  resolve(video, ctx) {
    if (video.uploadDate)
      video.uploadDate = resolvableDateToIso(video.uploadDate);
    video.url = resolveWithBase(ctx.meta.host, video.url);
    if (video.caption && !video.description)
      video.description = video.caption;
    if (!video.description)
      video.description = "No description";
    if (video.thumbnailUrl && (typeof video.thumbnailUrl === "string" || Array.isArray(video.thumbnailUrl))) {
      const images = asArray(video.thumbnailUrl).map((image) => resolveWithBase(ctx.meta.host, image));
      video.thumbnailUrl = images.length > 1 ? images : images[0];
    }
    if (video.thumbnail)
      video.thumbnail = resolveRelation(video.thumbnailUrl, ctx, imageResolver);
    return video;
  },
  resolveRootNode(video, { find }) {
    var _a;
    if (video.image && !video.thumbnail) {
      const firstImage = asArray(video.image)[0];
      setIfEmpty(video, "thumbnail", (_a = find(firstImage["@id"])) == null ? void 0 : _a.url);
    }
  }
});
const movieResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Movie"
  },
  resolve(node, ctx) {
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.review = resolveRelation(node.review, ctx, reviewResolver);
    node.director = resolveRelation(node.director, ctx, personResolver);
    node.actor = resolveRelation(node.actor, ctx, personResolver);
    node.trailer = resolveRelation(node.trailer, ctx, videoResolver);
    if (node.dateCreated)
      node.dateCreated = resolvableDateToDate(node.dateCreated);
    return node;
  }
});
const ProductId = "#product";
const productResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Product"
  },
  inheritMeta: [
    "description",
    "image",
    { meta: "title", key: "name" }
  ],
  idPrefix: ["url", ProductId],
  resolve(node, ctx) {
    setIfEmpty(node, "sku", hash(node.name));
    node.aggregateOffer = resolveRelation(node.aggregateOffer, ctx, aggregateOfferResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.offers = resolveRelation(node.offers, ctx, offerResolver);
    node.review = resolveRelation(node.review, ctx, reviewResolver);
    return node;
  },
  resolveRootNode(product, { find }) {
    const webPage = find(PrimaryWebPageId);
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(product, "brand", idReference(identity));
    if (webPage)
      setIfEmpty(product, "mainEntityOfPage", idReference(webPage));
    return product;
  }
});
const answerResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "string") {
      return {
        text: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "Answer"
  }
});
const questionResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Question"
  },
  inheritMeta: [
    "inLanguage"
  ],
  idPrefix: "url",
  resolve(question, ctx) {
    if (question.question) {
      question.name = question.question;
      delete question.question;
    }
    if (question.answer) {
      question.acceptedAnswer = question.answer;
      delete question.answer;
    }
    question.acceptedAnswer = resolveRelation(question.acceptedAnswer, ctx, answerResolver);
    return question;
  },
  resolveRootNode(question, { find }) {
    const webPage = find(PrimaryWebPageId);
    if (webPage && asArray(webPage["@type"]).includes("FAQPage"))
      dedupeMerge(webPage, "mainEntity", idReference(question));
  }
});
const RecipeId = "#recipe";
const recipeResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Recipe"
  },
  inheritMeta: [
    { meta: "title", key: "name" },
    "description",
    "image",
    "datePublished"
  ],
  idPrefix: ["url", RecipeId],
  resolve(node, ctx) {
    node.recipeInstructions = resolveRelation(node.recipeInstructions, ctx, howToStepResolver);
    return node;
  },
  resolveRootNode(node, { find }) {
    const article = find(PrimaryArticleId);
    const webPage = find(PrimaryWebPageId);
    if (article)
      setIfEmpty(node, "mainEntityOfPage", idReference(article));
    else if (webPage)
      setIfEmpty(node, "mainEntityOfPage", idReference(webPage));
    if (article == null ? void 0 : article.author)
      setIfEmpty(node, "author", article.author);
    return node;
  }
});
const softwareAppResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "SoftwareApplication"
  },
  resolve(node, ctx) {
    resolveDefaultType(node, "SoftwareApplication");
    node.offers = resolveRelation(node.offers, ctx, offerResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.review = resolveRelation(node.review, ctx, reviewResolver);
    return node;
  }
});
function defineHeadPlugin(plugin2) {
  return plugin2;
}
function hashCode(s) {
  let h2 = 9;
  for (let i = 0; i < s.length; )
    h2 = Math.imul(h2 ^ s.charCodeAt(i++), 9 ** 9);
  return ((h2 ^ h2 >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
const sepSub = "%separator";
function sub(p, token, isJson = false) {
  var _a;
  let val;
  if (token === "s" || token === "pageTitle") {
    val = p.pageTitle;
  } else if (token.includes(".")) {
    const dotIndex = token.indexOf(".");
    val = (_a = p[token.substring(0, dotIndex)]) == null ? void 0 : _a[token.substring(dotIndex + 1)];
  } else {
    val = p[token];
  }
  if (val !== void 0) {
    return isJson ? (val || "").replace(/"/g, '\\"') : val || "";
  }
  return void 0;
}
const sepSubRe = new RegExp(`${sepSub}(?:\\s*${sepSub})*`, "g");
function processTemplateParams(s, p, sep, isJson = false) {
  if (typeof s !== "string" || !s.includes("%"))
    return s;
  let decoded = s;
  try {
    decoded = decodeURI(s);
  } catch {
  }
  const tokens = decoded.match(/%\w+(?:\.\w+)?/g);
  if (!tokens) {
    return s;
  }
  const hasSepSub = s.includes(sepSub);
  s = s.replace(/%\w+(?:\.\w+)?/g, (token) => {
    if (token === sepSub || !tokens.includes(token)) {
      return token;
    }
    const re = sub(p, token.slice(1), isJson);
    return re !== void 0 ? re : token;
  }).trim();
  if (hasSepSub) {
    if (s.endsWith(sepSub))
      s = s.slice(0, -sepSub.length);
    if (s.startsWith(sepSub))
      s = s.slice(sepSub.length);
    s = s.replace(sepSubRe, sep).trim();
  }
  return s;
}
function loadResolver(resolver2) {
  switch (resolver2) {
    case "address":
      return addressResolver;
    case "aggregateOffer":
      return aggregateOfferResolver;
    case "aggregateRating":
      return aggregateRatingResolver;
    case "article":
      return articleResolver;
    case "breadcrumb":
      return breadcrumbResolver;
    case "comment":
      return commentResolver;
    case "event":
      return eventResolver;
    case "foodEstablishment":
      return foodEstablishmentResolver;
    case "virtualLocation":
      return virtualLocationResolver;
    case "place":
      return placeResolver;
    case "howTo":
      return howToResolver;
    case "howToStep":
      return howToStepResolver;
    case "image":
      return imageResolver;
    case "localBusiness":
      return localBusinessResolver;
    case "offer":
      return offerResolver;
    case "openingHours":
      return openingHoursResolver;
    case "organization":
      return organizationResolver;
    case "person":
      return personResolver;
    case "product":
      return productResolver;
    case "question":
      return questionResolver;
    case "recipe":
      return recipeResolver;
    case "review":
      return reviewResolver;
    case "video":
      return videoResolver;
    case "webPage":
      return webPageResolver;
    case "webSite":
      return webSiteResolver;
    case "book":
      return bookResolver;
    case "course":
      return courseResolver;
    case "itemList":
      return itemListResolver;
    case "jobPosting":
      return jobPostingResolver;
    case "listItem":
      return listItemResolver;
    case "movie":
      return movieResolver;
    case "searchAction":
      return searchActionResolver;
    case "readAction":
      return readActionResolver;
    case "softwareApp":
      return softwareAppResolver;
    case "bookEdition":
      return bookEditionResolver;
  }
  return null;
}
const resolver = {
  __proto__: null,
  loadResolver
};
function resolveMeta(meta) {
  if (!meta.host && meta.canonicalHost)
    meta.host = meta.canonicalHost;
  if (!meta.tagPosition && meta.position)
    meta.tagPosition = meta.position;
  if (!meta.currency && meta.defaultCurrency)
    meta.currency = meta.defaultCurrency;
  if (!meta.inLanguage && meta.defaultLanguage)
    meta.inLanguage = meta.defaultLanguage;
  if (!meta.path)
    meta.path = "/";
  if (!meta.host && false)
    meta.host = (void 0).location.host;
  if (!meta.url && meta.canonicalUrl)
    meta.url = meta.canonicalUrl;
  if (meta.path !== "/") {
    if (meta.trailingSlash && !hasTrailingSlash(meta.path))
      meta.path = withTrailingSlash(meta.path);
    else if (!meta.trailingSlash && hasTrailingSlash(meta.path))
      meta.path = withoutTrailingSlash(meta.path);
  }
  meta.url = joinURL(meta.host || "", meta.path);
  return {
    ...meta,
    host: meta.host,
    url: meta.url,
    currency: meta.currency,
    image: meta.image,
    inLanguage: meta.inLanguage,
    title: meta.title,
    description: meta.description,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified
  };
}
function resolveNode(node, ctx, resolver2) {
  var _a;
  if (resolver2 == null ? void 0 : resolver2.cast)
    node = resolver2.cast(node, ctx);
  if (resolver2 == null ? void 0 : resolver2.defaults) {
    let defaults = resolver2.defaults || {};
    if (typeof defaults === "function")
      defaults = defaults(ctx);
    node = {
      ...defaults,
      ...node
    };
  }
  (_a = resolver2.inheritMeta) == null ? void 0 : _a.forEach((entry2) => {
    if (typeof entry2 === "string")
      setIfEmpty(node, entry2, ctx.meta[entry2]);
    else
      setIfEmpty(node, entry2.key, ctx.meta[entry2.meta]);
  });
  if (resolver2 == null ? void 0 : resolver2.resolve)
    node = resolver2.resolve(node, ctx);
  for (const k in node) {
    const v = node[k];
    if (typeof v === "object" && (v == null ? void 0 : v._resolver))
      node[k] = resolveRelation(v, ctx, v._resolver);
  }
  stripEmptyProperties(node);
  return node;
}
function resolveNodeId(node, ctx, resolver2, resolveAsRoot = false) {
  var _a, _b, _c, _d;
  if (node["@id"] && node["@id"].startsWith("http"))
    return node;
  const prefix = resolver2 ? (Array.isArray(resolver2.idPrefix) ? resolver2.idPrefix[0] : resolver2.idPrefix) || "url" : "url";
  const rootId = node["@id"] || (resolver2 ? Array.isArray(resolver2.idPrefix) ? (_a = resolver2.idPrefix) == null ? void 0 : _a[1] : void 0 : "");
  if (!node["@id"] && resolveAsRoot && rootId) {
    node["@id"] = prefixId(ctx.meta[prefix], rootId);
    return node;
  }
  if (((_b = node["@id"]) == null ? void 0 : _b.startsWith("#/schema/")) || ((_c = node["@id"]) == null ? void 0 : _c.startsWith("/"))) {
    node["@id"] = prefixId(ctx.meta[prefix], node["@id"]);
    return node;
  }
  let alias = resolver2 == null ? void 0 : resolver2.alias;
  if (!alias) {
    const type = ((_d = asArray(node["@type"])) == null ? void 0 : _d[0]) || "";
    alias = type.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  const hashNodeData = {};
  for (const key in node) {
    if (key[0] === "_") {
      continue;
    }
    if (!Object.prototype.hasOwnProperty.call(node, key)) {
      continue;
    }
    hashNodeData[key] = node[key];
  }
  node["@id"] = prefixId(ctx.meta[prefix], `#/schema/${alias}/${node["@id"] || hashCode(JSON.stringify(hashNodeData))}`);
  return node;
}
function resolveRelation(input, ctx, fallbackResolver, options = {}) {
  if (!input)
    return input;
  const ids = asArray(input).map((a) => {
    var _a;
    const keys = Object.keys(a).length;
    if (keys === 1 && a["@id"] || keys === 2 && a["@id"] && a["@type"]) {
      return resolveNodeId({
        // we drop @type
        "@id": ((_a = ctx.find(a["@id"])) == null ? void 0 : _a["@id"]) || a["@id"]
      }, ctx);
    }
    let resolver2 = fallbackResolver;
    if (a._resolver) {
      resolver2 = a._resolver;
      if (typeof resolver2 === "string")
        resolver2 = loadResolver(resolver2);
      delete a._resolver;
    }
    if (!resolver2)
      return a;
    let node = resolveNode(a, ctx, resolver2);
    if (options.afterResolve)
      options.afterResolve(node);
    if (options.generateId || options.root)
      node = resolveNodeId(node, ctx, resolver2, false);
    if (options.root) {
      if (resolver2.resolveRootNode)
        resolver2.resolveRootNode(node, ctx);
      ctx.push(node);
      return idReference(node["@id"]);
    }
    return node;
  });
  if (!options.array && ids.length === 1)
    return ids[0];
  return ids;
}
function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
function groupBy(array, predicate) {
  return array.reduce((acc, value, index2, array2) => {
    const key = predicate(value, index2, array2);
    if (!acc[key])
      acc[key] = [];
    acc[key].push(value);
    return acc;
  }, {});
}
function uniqueBy(array, predicate) {
  return Object.values(groupBy(array, predicate)).map((a) => a[a.length - 1]);
}
const merge = createDefu((object, key, value) => {
  if (Array.isArray(object[key])) {
    if (Array.isArray(value)) {
      const map = {};
      for (const item of [...object[key], ...value])
        map[hash(item)] = item;
      object[key] = Object.values(map);
      if (key === "itemListElement") {
        object[key] = [...uniqueBy(object[key], (item) => item.position)];
      }
      return true;
    }
    object[key] = merge(object[key], Array.isArray(value) ? value : [value]);
    return true;
  }
});
function dedupeNodes(nodes) {
  const dedupedNodes = {};
  for (const key of nodes.keys()) {
    const n = nodes[key];
    const nodeKey = resolveAsGraphKey(n["@id"] || hash(n));
    if (dedupedNodes[nodeKey] && n._dedupeStrategy !== "replace")
      dedupedNodes[nodeKey] = merge(nodes[key], dedupedNodes[nodeKey]);
    else
      dedupedNodes[nodeKey] = nodes[key];
  }
  return Object.values(dedupedNodes);
}
function normaliseNodes(nodes) {
  const sortedNodeKeys = nodes.keys();
  const dedupedNodes = {};
  for (const key of sortedNodeKeys) {
    const n = nodes[key];
    const nodeKey = resolveAsGraphKey(n["@id"] || hash(n));
    const groupedKeys = groupBy(Object.keys(n), (key2) => {
      const val = n[key2];
      if (key2[0] === "_")
        return "ignored";
      if (Array.isArray(val) || typeof val === "object")
        return "relations";
      return "primitives";
    });
    const keys = [
      ...(groupedKeys.primitives || []).sort(),
      ...(groupedKeys.relations || []).sort()
    ];
    let newNode = {};
    for (const key2 of keys)
      newNode[key2] = n[key2];
    if (dedupedNodes[nodeKey])
      newNode = merge(newNode, dedupedNodes[nodeKey]);
    dedupedNodes[nodeKey] = newNode;
  }
  return Object.values(dedupedNodes);
}
const baseRelationNodes = [
  "translationOfWork",
  "workTranslation"
];
function createSchemaOrgGraph() {
  const ctx = {
    find(id) {
      let resolver2 = (s) => s;
      if (id[0] === "#") {
        resolver2 = resolveAsGraphKey;
      } else if (id[0] === "/") {
        resolver2 = (s) => s.replace(/(https?:)?\/\//, "").split("/")[0];
      }
      const key = resolver2(id);
      return ctx.nodes.filter((n) => !!n["@id"]).find((n) => resolver2(n["@id"]) === key);
    },
    push(input) {
      asArray(input).forEach((node) => {
        const registeredNode = node;
        ctx.nodes.push(registeredNode);
      });
    },
    resolveGraph(meta) {
      ctx.meta = resolveMeta({ ...meta });
      ctx.nodes.forEach((node, key) => {
        const resolver2 = node._resolver;
        if (resolver2) {
          node = resolveNode(node, ctx, resolver2);
          node = resolveNodeId(node, ctx, resolver2, true);
        }
        ctx.nodes[key] = node;
      });
      ctx.nodes = dedupeNodes(ctx.nodes);
      ctx.nodes.forEach((node) => {
        var _a;
        if (node.image && typeof node.image === "string") {
          node.image = resolveRelation(node.image, ctx, imageResolver, {
            root: true
          });
        }
        baseRelationNodes.forEach((k) => {
          node[k] = resolveRelation(node[k], ctx);
        });
        if ((_a = node._resolver) == null ? void 0 : _a.resolveRootNode)
          node._resolver.resolveRootNode(node, ctx);
        delete node._resolver;
      });
      return normaliseNodes(ctx.nodes);
    },
    nodes: [],
    meta: {}
  };
  return ctx;
}
function UnheadSchemaOrg(options) {
  return SchemaOrgUnheadPlugin({}, () => ({}), options);
}
function SchemaOrgUnheadPlugin(config, meta, options) {
  config = resolveMeta({ ...config });
  let graph;
  let resolvedMeta = {};
  return defineHeadPlugin((head) => ({
    key: "schema-org",
    hooks: {
      "entries:resolve": () => {
        graph = createSchemaOrgGraph();
      },
      "tag:normalise": async ({ tag }) => {
        if (tag.tag === "script" && tag.props.type === "application/ld+json" && tag.props.nodes) {
          const { loadResolver: loadResolver2 } = await Promise.resolve().then(function() {
            return resolver;
          });
          const nodes = await tag.props.nodes;
          for (const node of Array.isArray(nodes) ? nodes : [nodes]) {
            if (typeof node !== "object" || Object.keys(node).length === 0) {
              continue;
            }
            const newNode = {
              ...node,
              _dedupeStrategy: tag.tagDuplicateStrategy,
              _resolver: loadResolver2(await node._resolver)
            };
            graph.push(newNode);
          }
          tag.tagPosition = tag.tagPosition || config.tagPosition === "head" ? "head" : "bodyClose";
        }
        if (tag.tag === "htmlAttrs" && tag.props.lang) {
          resolvedMeta.inLanguage = tag.props.lang;
        } else if (tag.tag === "title") {
          resolvedMeta.title = tag.textContent;
        } else if (tag.tag === "meta" && tag.props.name === "description") {
          resolvedMeta.description = tag.props.content;
        } else if (tag.tag === "link" && tag.props.rel === "canonical") {
          resolvedMeta.url = tag.props.href;
          if (resolvedMeta.url && !resolvedMeta.host) {
            try {
              resolvedMeta.host = new URL(resolvedMeta.url).origin;
            } catch {
            }
          }
        } else if (tag.tag === "meta" && tag.props.property === "og:image") {
          resolvedMeta.image = tag.props.content;
        } else if (tag.tag === "templateParams" && tag.props.schemaOrg) {
          resolvedMeta = {
            ...resolvedMeta,
            // @ts-expect-error untyped
            ...tag.props.schemaOrg
          };
          delete tag.props.schemaOrg;
        }
      },
      "tags:resolve": async (ctx) => {
        for (const k in ctx.tags) {
          const tag = ctx.tags[k];
          if (tag.tag === "script" && tag.props.type === "application/ld+json" && tag.props.nodes) {
            delete tag.props.nodes;
            const resolvedGraph = graph.resolveGraph({ ...await (meta == null ? void 0 : meta()) || {}, ...config, ...resolvedMeta });
            if (!resolvedGraph.length) {
              tag.props = {};
              return;
            }
            const minify = (options == null ? void 0 : options.minify) || process.env.NODE_ENV === "production";
            tag.innerHTML = JSON.stringify({
              "@context": "https://schema.org",
              "@graph": resolvedGraph
            }, (_, value) => {
              if (typeof value !== "object")
                return processTemplateParams(value, head._templateParams, head._separator);
              return value;
            }, minify ? 0 : 2);
            return;
          }
        }
      },
      "tags:afterResolve": (ctx) => {
        let firstNodeKey;
        for (const k in ctx.tags) {
          const tag = ctx.tags[k];
          if (tag.props.type === "application/ld+json" && tag.props.nodes || tag.key === "schema-org-graph") {
            delete tag.props.nodes;
            if (typeof firstNodeKey === "undefined") {
              firstNodeKey = k;
              continue;
            }
            ctx.tags[firstNodeKey].props = defu(ctx.tags[firstNodeKey].props, tag.props);
            delete ctx.tags[firstNodeKey].props.nodes;
            ctx.tags[k] = false;
          }
        }
        ctx.tags = ctx.tags.filter(Boolean);
      }
    }
  }));
}
function useSchemaOrg$1(input, options) {
  const head = getActiveHead();
  if (!head)
    return;
  if (Array.isArray(input) && input.length === 0 || !input) {
    return;
  }
  head.use(UnheadSchemaOrg());
  return useHead$1({
    script: [
      {
        type: "application/ld+json",
        key: "schema-org-graph",
        nodes: input
      }
    ]
  }, options);
}
version[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}
defineHeadPlugin$1({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__unhead_injection_handler__";
function injectHead() {
  if (globalKey in _global) {
    return _global[globalKey]();
  }
  const head = inject(headSymbol);
  if (!head && process.env.NODE_ENV !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
function useServerHead(input, options = {}) {
  const head = options.head || injectHead();
  delete options.head;
  if (head)
    return head.push(input, { ...options, mode: "server" });
}
function useSchemaOrgConfig() {
  const runtimeConfig = /* @__PURE__ */ useRuntimeConfig();
  return defu$1(runtimeConfig["nuxt-schema-org"], {
    scriptAttributes: {}
  });
}
function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
  if (base !== "/" && origin.endsWith(base)) {
    origin = origin.slice(0, origin.indexOf(base));
  }
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
function isPathFile(path) {
  var _a;
  const lastSegment = path.split("/").pop();
  return !!((_a = (lastSegment || path).match(/\.[0-9a-z]+$/i)) == null ? void 0 : _a[0]);
}
function fixSlashes(trailingSlash, pathOrUrl) {
  const $url = parseURL(pathOrUrl);
  if (isPathFile($url.pathname))
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}
function useNitroOrigin(e) {
  {
    e = e || useRequestEvent();
    return e.context.siteConfigNitroOrigin;
  }
}
function createSitePathResolver(options = {}) {
  const siteConfig = useSiteConfig();
  const nitroOrigin = useNitroOrigin();
  const nuxtBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL || "/";
  return (path) => {
    return computed(() => resolveSitePath(unref(path), {
      absolute: unref(options.absolute),
      withBase: unref(options.withBase),
      siteUrl: unref(options.canonical) !== false || import.meta.prerender ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base: nuxtBase
    }));
  };
}
function withSiteUrl(path, options = {}) {
  const siteConfig = useSiteConfig();
  const nitroOrigin = useNitroOrigin();
  const base = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL || "/";
  return computed(() => {
    return resolveSitePath(unref(path), {
      absolute: true,
      siteUrl: unref(options.canonical) !== false || import.meta.prerender ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base,
      withBase: unref(options.withBase)
    });
  });
}
function initPlugin(nuxtApp) {
  const head = injectHead();
  const config = useSchemaOrgConfig();
  const route = useRoute();
  const siteConfig = useSiteConfig();
  const resolvePath = createSitePathResolver({
    absolute: false,
    withBase: true
  });
  const resolveUrl = createSitePathResolver({
    canonical: true,
    absolute: true,
    withBase: true
  });
  const schemaOrg = computed(() => {
    var _a;
    return {
      ...((_a = route.meta) == null ? void 0 : _a.schemaOrg) || {},
      ...siteConfig,
      url: resolveUrl(route.path),
      host: withoutTrailingSlash(siteConfig.url),
      inLanguage: siteConfig.currentLocale || siteConfig.defaultLocale,
      path: resolvePath(route.path)
    };
  });
  head.push({ templateParams: { schemaOrg } });
  head.use(
    SchemaOrgUnheadPlugin({}, async () => {
      const meta = {};
      await nuxtApp.hooks.callHook("schema-org:meta", meta);
      return meta;
    }, {
      minify: config.minify,
      trailingSlash: siteConfig.trailingSlash
    })
  );
}
function maybeAddIdentitySchemaOrg() {
  const config = useSchemaOrgConfig();
  const siteConfig = useSiteConfig();
  if (config.identity || siteConfig.identity) {
    const identity = config.identity || siteConfig.identity;
    let identityPayload = {
      name: siteConfig.name,
      url: siteConfig.url
    };
    let identityType;
    if (typeof identity !== "string") {
      identityPayload = defu$1(identity, identityPayload);
      identityType = identity.type;
      delete identityPayload.type;
    } else {
      identityType = identity;
    }
    if (siteConfig.twitter) {
      const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter.slice(1) : siteConfig.twitter;
      identityPayload.sameAs = [
        `https://twitter.com/${id}`
      ];
    }
    identityPayload._resolver = identityPayload._resolver || camelCase(identityType);
    useSchemaOrg$1([identityPayload]);
  }
}
function provideResolver(input, resolver2) {
  if (!input)
    input = {};
  input._resolver = resolver2;
  return input;
}
function defineWebPage(input) {
  return provideResolver(input, "webPage");
}
function defineWebSite(input) {
  return provideResolver(input, "webSite");
}
function useSchemaOrg(input) {
  var _a;
  const config = useSchemaOrgConfig();
  const script = {
    type: "application/ld+json",
    key: "schema-org-graph",
    nodes: input,
    ...config.scriptAttributes
  };
  {
    const event = useRequestEvent();
    if (typeof (event == null ? void 0 : event.context.robots) !== "undefined" && !((_a = event.context.robots) == null ? void 0 : _a.indexable)) {
      return;
    }
    return useServerHead({
      script: [script]
    });
  }
}
const defaults_ejC916ejE3 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-schema-org:defaults",
  dependsOn: [
    "nuxt-schema-org:init"
  ],
  setup() {
    const siteConfig = useSiteConfig();
    useSchemaOrg([
      defineWebSite({
        name: (siteConfig == null ? void 0 : siteConfig.name) || "",
        inLanguage: (siteConfig == null ? void 0 : siteConfig.currentLocale) || "",
        description: (siteConfig == null ? void 0 : siteConfig.description) || ""
      }),
      defineWebPage()
    ]);
    maybeAddIdentitySchemaOrg();
  }
});
const init_8zxuXEdLTw = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-schema-org:init",
  setup(nuxtApp) {
    initPlugin(nuxtApp);
  }
});
function isInternalRoute(path) {
  return path.startsWith("/_") || path.startsWith("@");
}
function filterIsOgImageOption(key) {
  const keys = [
    "url",
    "extension",
    "width",
    "height",
    "fonts",
    "alt",
    "props",
    "renderer",
    "html",
    "component",
    "renderer",
    "emojis",
    "_query",
    "satori",
    "resvg",
    "sharp",
    "screenshot",
    "cacheMaxAgeSeconds"
  ];
  return keys.includes(key);
}
function separateProps(options, ignoreKeys = []) {
  options = options || {};
  const _props = defu$1(options.props, Object.fromEntries(
    Object.entries({ ...options }).filter(([k]) => !filterIsOgImageOption(k) && !ignoreKeys.includes(k))
  ));
  const props = {};
  Object.entries(_props).forEach(([key, val]) => {
    props[key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = val;
  });
  return {
    ...Object.fromEntries(
      Object.entries({ ...options }).filter(([k]) => filterIsOgImageOption(k) || ignoreKeys.includes(k))
    ),
    props
  };
}
function withoutQuery(path) {
  return path.split("?")[0];
}
function getExtension(path) {
  path = withoutQuery(path);
  const lastSegment = path.split("/").pop() || path;
  return lastSegment.split(".").pop() || lastSegment;
}
const og_image_canonical_urls_server_YYKCE0iokV = /* @__PURE__ */ defineNuxtPlugin({
  setup(nuxtApp) {
    nuxtApp.hooks.hook("app:rendered", async (ctx) => {
      const { ssrContext } = ctx;
      const e = useRequestEvent();
      const path = parseURL(e.path).pathname;
      if (isInternalRoute(path))
        return;
      ssrContext == null ? void 0 : ssrContext.head.use({
        key: "nuxt-og-image:overrides-and-canonical-urls",
        hooks: {
          "tags:resolve": async (ctx2) => {
            const hasPrimaryPayload = ctx2.tags.some((tag) => tag.tag === "script" && tag.props.id === "nuxt-og-image-options");
            let overrides;
            for (const tag of ctx2.tags) {
              if (tag.tag === "script" && tag.props.id === "nuxt-og-image-overrides") {
                if (hasPrimaryPayload) {
                  overrides = separateProps(parse$1(tag.innerHTML || "{}"));
                  delete ctx2.tags[ctx2.tags.indexOf(tag)];
                } else {
                  tag.props.id = "nuxt-og-image-options";
                  tag.innerHTML = stringify(separateProps(parse$1(tag.innerHTML || "{}")));
                  tag._d = "script:id:nuxt-og-image-options";
                }
                break;
              }
            }
            ctx2.tags = ctx2.tags.filter(Boolean);
            for (const tag of ctx2.tags) {
              if (tag.tag === "meta" && (tag.props.property === "og:image" || ["twitter:image:src", "twitter:image"].includes(tag.props.name))) {
                if (!tag.props.content.startsWith("https")) {
                  await nuxtApp.runWithContext(() => {
                    tag.props.content = toValue(withSiteUrl(tag.props.content, {
                      withBase: true
                    }));
                  });
                }
              } else if (overrides && tag.tag === "script" && tag.props.id === "nuxt-og-image-options") {
                tag.innerHTML = stringify(defu$1(overrides, parse$1(tag.innerHTML)));
              }
            }
          }
        }
      });
    });
  }
});
function getOgImagePath(pagePath, _options) {
  const baseURL2 = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
  const options = defu$1(_options, useOgImageRuntimeConfig().defaults);
  return joinURL("/", baseURL2, "__og-image__/image", pagePath, `og.${options.extension}`);
}
function useOgImageRuntimeConfig() {
  return (/* @__PURE__ */ useRuntimeConfig())["nuxt-og-image"];
}
const componentNames = [{ "hash": "V86RHnlnYf", "pascalName": "OgImageCoverImage", "kebabName": "og-image-cover-image", "category": "app" }, { "hash": "T7tM3JnN9s", "pascalName": "OgImageCustom", "kebabName": "og-image-custom", "category": "app" }, { "hash": "ES4qXmibZz", "pascalName": "OgImageEmoji", "kebabName": "og-image-emoji", "category": "app" }, { "hash": "fXZMeQXy5p", "pascalName": "OgImageSimple", "kebabName": "og-image-simple", "category": "app" }, { "hash": "i0Vxmj8bqg", "pascalName": "BrandedLogo", "kebabName": "branded-logo", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }, { "hash": "tBHg51xiAt", "pascalName": "Frame", "kebabName": "frame", "category": "community", "credits": "@arashsheyda <https://github.com/arashsheyda>" }, { "hash": "Sqc3OTP2KQ", "pascalName": "Nuxt", "kebabName": "nuxt", "category": "community", "credits": "NuxtLabs <https://nuxtlabs.com/>" }, { "hash": "tEswIE9Ciw", "pascalName": "NuxtSeo", "kebabName": "nuxt-seo", "category": "community", "credits": "Nuxt SEO <https://nuxtseo.com/>" }, { "hash": "q432NYEB0T", "pascalName": "Pergel", "kebabName": "pergel", "category": "community", "credits": "Pergel <https://nuxtlabs.com/>" }, { "hash": "YDrRRvPRVl", "pascalName": "SimpleBlog", "kebabName": "simple-blog", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }, { "hash": "wt558K6QyQ", "pascalName": "UnJs", "kebabName": "un-js", "category": "community", "credits": "UnJS <https://unjs.io/>" }, { "hash": "6RdQZcuwZZ", "pascalName": "Wave", "kebabName": "wave", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }, { "hash": "gaB1TrbtTl", "pascalName": "WithEmoji", "kebabName": "with-emoji", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }];
function createOgImageMeta(src, input, resolvedOptions, ssrContext) {
  const _input = separateProps(defu$1(input, ssrContext._ogImagePayload));
  let url = src || input.url || resolvedOptions.url;
  if (!url)
    return;
  if (input._query && Object.keys(input._query).length && url)
    url = withQuery(url, { _query: input._query });
  let urlExtension = getExtension(url) || resolvedOptions.extension;
  if (urlExtension === "jpg")
    urlExtension = "jpeg";
  const meta = [
    { property: "og:image", content: url },
    { property: "og:image:type", content: `image/${urlExtension}` },
    { name: "twitter:card", content: "summary_large_image" },
    // we don't need this but avoids issue when using useSeoMeta({ twitterImage })
    { name: "twitter:image", content: url },
    { name: "twitter:image:src", content: url }
  ];
  if (resolvedOptions.width) {
    meta.push({ property: "og:image:width", content: resolvedOptions.width });
    meta.push({ name: "twitter:image:width", content: resolvedOptions.width });
  }
  if (resolvedOptions.height) {
    meta.push({ property: "og:image:height", content: resolvedOptions.height });
    meta.push({ name: "twitter:image:height", content: resolvedOptions.height });
  }
  if (resolvedOptions.alt) {
    meta.push({ property: "og:image:alt", content: resolvedOptions.alt });
    meta.push({ name: "twitter:image:alt", content: resolvedOptions.alt });
  }
  ssrContext._ogImageInstances = ssrContext._ogImageInstances || [];
  const script = [];
  if (src) {
    script.push({
      id: "nuxt-og-image-options",
      type: "application/json",
      processTemplateParams: true,
      innerHTML: () => {
        const payload = resolveUnrefHeadInput$1(_input);
        if (typeof payload.props.title === "undefined")
          payload.props.title = "%s";
        delete payload.url;
        return stringify(payload);
      },
      // we want this to be last in our head
      tagPosition: "bodyClose"
    });
  }
  const instance = useServerHead$1({
    script,
    meta
  }, {
    tagPriority: 35
  });
  ssrContext._ogImagePayload = _input;
  ssrContext._ogImageInstances.push(instance);
}
function normaliseOptions(_options) {
  const options = { ...unref(_options) };
  if (!options)
    return options;
  if (options.component && componentNames) {
    const originalName = options.component;
    for (const component of componentNames) {
      if (component.pascalName.endsWith(originalName) || component.kebabName.endsWith(originalName)) {
        options.component = component.pascalName;
        break;
      }
    }
  }
  return options;
}
const route_rule_og_image_server_xL1rf4QeLE = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook("app:rendered", async (ctx) => {
    var _a, _b, _c, _d, _e, _f;
    const { ssrContext } = ctx;
    const e = useRequestEvent();
    const path = parseURL(e.path).pathname;
    if (isInternalRoute(path))
      return;
    const _routeRulesMatcher2 = toRouteMatcher(
      createRouter({ routes: (_b = (_a = ssrContext == null ? void 0 : ssrContext.runtimeConfig) == null ? void 0 : _a.nitro) == null ? void 0 : _b.routeRules })
    );
    let routeRules = defu$1({}, ..._routeRulesMatcher2.matchAll(
      withoutBase(path.split("?")[0], (_c = ssrContext == null ? void 0 : ssrContext.runtimeConfig) == null ? void 0 : _c.app.baseURL)
    ).reverse()).ogImage;
    if (typeof routeRules === "undefined")
      return;
    const ogImageInstances = nuxtApp.ssrContext._ogImageInstances || [];
    if (routeRules === false) {
      ogImageInstances == null ? void 0 : ogImageInstances.forEach((e2) => {
        e2.dispose();
      });
      nuxtApp.ssrContext._ogImagePayload = void 0;
      nuxtApp.ssrContext._ogImageInstances = void 0;
      return;
    }
    routeRules = normaliseOptions(defu$1((_f = (_e = (_d = nuxtApp.ssrContext) == null ? void 0 : _d.event.context._nitro) == null ? void 0 : _e.routeRules) == null ? void 0 : _f.ogImage, routeRules));
    const { defaults } = useOgImageRuntimeConfig();
    const resolvedOptions = normaliseOptions(defu$1(routeRules, defaults));
    const src = getOgImagePath(ssrContext.url, resolvedOptions);
    createOgImageMeta(src, routeRules, resolvedOptions, nuxtApp.ssrContext);
  });
});
const robot_meta_server_6Qhe4cPOr2 = /* @__PURE__ */ defineNuxtPlugin({
  setup() {
    var _a;
    const event = useRequestEvent();
    const ctx = (_a = event == null ? void 0 : event.context) == null ? void 0 : _a.robots;
    if (!ctx)
      return;
    const config = /* @__PURE__ */ useRuntimeConfig();
    useServerHead$1({
      meta: [
        {
          "name": "robots",
          "content": () => ctx.rule || "",
          "data-hint": () => {
            var _a2, _b;
            return ((_a2 = config["nuxt-robots"]) == null ? void 0 : _a2.debug) ? (_b = ctx.debug) == null ? void 0 : _b.source : void 0;
          }
        }
      ]
    });
  }
});
const preference = "system";
const plugin_server_ano7jnMEqi = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  var _a;
  const colorMode = ((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) ? ref({}) : useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
const plugin_WLsn00x1qh = /* @__PURE__ */ defineNuxtPlugin({
  name: "@nuxt/icon",
  setup() {
    var _a, _b;
    const config = /* @__PURE__ */ useRuntimeConfig();
    const options = useAppConfig().icon;
    _api.setFetch($fetch.native);
    disableCache("all");
    const resources = [];
    if (options.provider === "server") {
      const baseURL2 = ((_b = (_a = config.app) == null ? void 0 : _a.baseURL) == null ? void 0 : _b.replace(/\/$/, "")) ?? "";
      resources.push(baseURL2 + (options.localApiEndpoint || "/api/_nuxt_icon"));
      if (options.fallbackToApi === true || options.fallbackToApi === "client-only") {
        resources.push(options.iconifyApiEndpoint);
      }
    } else {
      resources.push(options.iconifyApiEndpoint);
    }
    addAPIProvider("", { resources });
  }
});
const useContentState = () => {
  const pages = useState("dd-pages", () => shallowRef(shallowReactive({})));
  const surrounds = useState("dd-surrounds", () => shallowRef(shallowReactive({})));
  const navigation = useState("dd-navigation");
  const globals = useState("dd-globals", () => shallowRef(shallowReactive({})));
  return {
    pages,
    surrounds,
    navigation,
    globals
  };
};
const useContent = () => {
  const { navigation, pages, surrounds, globals } = useContentState();
  const _path = computed(() => withoutTrailingSlash(useRoute().path));
  const page = computed(() => pages.value[_path.value]);
  const surround = computed(() => surrounds.value[_path.value]);
  const toc = computed(() => {
    var _a, _b;
    return (_b = (_a = page == null ? void 0 : page.value) == null ? void 0 : _a.body) == null ? void 0 : _b.toc;
  });
  const type = computed(() => {
    var _a;
    return (_a = page.value) == null ? void 0 : _a._type;
  });
  const excerpt = computed(() => {
    var _a;
    return (_a = page.value) == null ? void 0 : _a.excerpt;
  });
  const layout = computed(() => {
    var _a;
    return (_a = page.value) == null ? void 0 : _a.layout;
  });
  const next = computed(() => {
    var _a;
    return (_a = surround.value) == null ? void 0 : _a[1];
  });
  const prev = computed(() => {
    var _a;
    return (_a = surround.value) == null ? void 0 : _a[0];
  });
  return {
    // Refs
    globals,
    navigation,
    surround,
    page,
    // From page
    excerpt,
    toc,
    type,
    layout,
    // From surround
    next,
    prev
  };
};
const navBottomLink = (link) => {
  if (!link.children) {
    return link._path;
  }
  for (const child of (link == null ? void 0 : link.children) || []) {
    const result = navBottomLink(child);
    if (result) {
      return result;
    }
  }
};
const navDirFromPath = (path, tree) => {
  for (const file of tree) {
    if (file._path === path && !file._id) {
      return file.children;
    }
    if (file.children) {
      const result = navDirFromPath(path, file.children);
      if (result) {
        return result;
      }
    }
  }
};
const navPageFromPath = (path, tree) => {
  for (const file of tree) {
    if (file._path === path) {
      return file;
    }
    if (file.children) {
      const result = navPageFromPath(path, file.children);
      if (result) {
        return result;
      }
    }
  }
};
const navKeyFromPath = (path, key, tree) => {
  let value;
  const goDeep = (path2, tree2) => {
    for (const file of tree2) {
      if (path2 !== "/" && file._path === "/") {
        continue;
      }
      if ((path2 == null ? void 0 : path2.startsWith(file._path)) && file[key]) {
        value = file[key];
      }
      if (file._path === path2) {
        return;
      }
      if (file.children) {
        goDeep(path2, file.children);
      }
    }
  };
  goDeep(path, tree);
  return value;
};
const useContentHelpers = () => {
  return {
    navBottomLink,
    navDirFromPath,
    navPageFromPath,
    navKeyFromPath
  };
};
function jsonStringify(value) {
  return JSON.stringify(value, regExpReplacer);
}
function regExpReplacer(_key, value) {
  if (value instanceof RegExp) {
    return `--REGEX ${value.toString()}`;
  }
  return value;
}
const encodeQueryParams = (params) => {
  let encoded = jsonStringify(params);
  encoded = typeof Buffer !== "undefined" ? Buffer.from(encoded).toString("base64") : btoa(encoded);
  encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const chunks = encoded.match(/.{1,100}/g) || [];
  return chunks.join("/");
};
const useContentPreview = () => {
  const getPreviewToken = () => {
    return useCookie("previewToken").value || false || void 0;
  };
  const setPreviewToken = (token) => {
    useCookie("previewToken").value = token;
    useRoute().query.preview = token || "";
  };
  const isEnabled = () => {
    const query = useRoute().query;
    if (Object.prototype.hasOwnProperty.call(query, "preview") && !query.preview) {
      return false;
    }
    if (query.preview || useCookie("previewToken").value) {
      return true;
    }
    return false;
  };
  return {
    isEnabled,
    getPreviewToken,
    setPreviewToken
  };
};
const withContentBase = (url) => withBase(url, (/* @__PURE__ */ useRuntimeConfig()).public.content.api.baseURL);
const addPrerenderPath = (path) => {
  const event = useRequestEvent();
  if (event) {
    event.node.res.setHeader(
      "x-nitro-prerender",
      [
        event.node.res.getHeader("x-nitro-prerender"),
        path
      ].filter(Boolean).join(",")
    );
  }
};
const shouldUseClientDB = () => {
  (/* @__PURE__ */ useRuntimeConfig()).public.content;
  {
    return false;
  }
};
const get = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj);
const _pick = (obj, condition) => Object.keys(obj).filter(condition).reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
const omit = (keys) => (obj) => keys && keys.length ? _pick(obj, (key) => !keys.includes(key)) : obj;
const apply = (fn) => (data) => Array.isArray(data) ? data.map((item) => fn(item)) : fn(data);
const detectProperties = (keys) => {
  const prefixes = [];
  const properties = [];
  for (const key of keys) {
    if (["$", "_"].includes(key)) {
      prefixes.push(key);
    } else {
      properties.push(key);
    }
  }
  return { prefixes, properties };
};
const withoutKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => !properties.includes(key) && !prefixes.includes(key[0]));
};
const withKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => properties.includes(key) || prefixes.includes(key[0]));
};
const sortList = (data, params) => {
  const comperable = new Intl.Collator(params.$locale, {
    numeric: params.$numeric,
    caseFirst: params.$caseFirst,
    sensitivity: params.$sensitivity
  });
  const keys = Object.keys(params).filter((key) => !key.startsWith("$"));
  for (const key of keys) {
    data = data.sort((a, b) => {
      const values = [get(a, key), get(b, key)].map((value) => {
        if (value === null) {
          return void 0;
        }
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      });
      if (params[key] === -1) {
        values.reverse();
      }
      return comperable.compare(values[0], values[1]);
    });
  }
  return data;
};
const assertArray = (value, message = "Expected an array") => {
  if (!Array.isArray(value)) {
    throw new TypeError(message);
  }
};
const ensureArray = (value) => {
  return Array.isArray(value) ? value : [void 0, null].includes(value) ? [] : [value];
};
const arrayParams = ["sort", "where", "only", "without"];
function createQuery(fetcher, opts = {}) {
  const queryParams = {};
  for (const key of Object.keys(opts.initialParams || {})) {
    queryParams[key] = arrayParams.includes(key) ? ensureArray(opts.initialParams[key]) : opts.initialParams[key];
  }
  const $set = (key, fn = (v) => v) => {
    return (...values) => {
      queryParams[key] = fn(...values);
      return query;
    };
  };
  const resolveResult = (result) => {
    var _a;
    if (opts.legacy) {
      if (result == null ? void 0 : result.surround) {
        return result.surround;
      }
      if (!result) {
        return result;
      }
      if (result == null ? void 0 : result.dirConfig) {
        result.result = {
          _path: (_a = result.dirConfig) == null ? void 0 : _a._path,
          ...result.result,
          _dir: result.dirConfig
        };
      }
      return (result == null ? void 0 : result._path) || Array.isArray(result) || !Object.prototype.hasOwnProperty.call(result, "result") ? result : result == null ? void 0 : result.result;
    }
    return result;
  };
  const query = {
    params: () => ({
      ...queryParams,
      ...queryParams.where ? { where: [...ensureArray(queryParams.where)] } : {},
      ...queryParams.sort ? { sort: [...ensureArray(queryParams.sort)] } : {}
    }),
    only: $set("only", ensureArray),
    without: $set("without", ensureArray),
    where: $set("where", (q) => [...ensureArray(queryParams.where), ...ensureArray(q)]),
    sort: $set("sort", (sort) => [...ensureArray(queryParams.sort), ...ensureArray(sort)]),
    limit: $set("limit", (v) => parseInt(String(v), 10)),
    skip: $set("skip", (v) => parseInt(String(v), 10)),
    // find
    find: () => fetcher(query).then(resolveResult),
    findOne: () => fetcher($set("first")(true)).then(resolveResult),
    count: () => fetcher($set("count")(true)).then(resolveResult),
    // locale
    locale: (_locale) => query.where({ _locale }),
    withSurround: $set("surround", (surroundQuery, options) => ({ query: surroundQuery, ...options })),
    withDirConfig: () => $set("dirConfig")(true)
  };
  if (opts.legacy) {
    query.findSurround = (surroundQuery, options) => {
      return query.withSurround(surroundQuery, options).find().then(resolveResult);
    };
    return query;
  }
  return query;
}
const createQueryFetch = () => async (query) => {
  const { content } = (/* @__PURE__ */ useRuntimeConfig()).public;
  const params = query.params();
  const apiPath = content.experimental.stripQueryParameters ? withContentBase(`/query/${`${hash(params)}.${content.integrity}`}/${encodeQueryParams(params)}.json`) : withContentBase(`/query/${hash(params)}.${content.integrity}.json`);
  {
    addPrerenderPath(apiPath);
  }
  if (shouldUseClientDB()) {
    const db = await import("./_nuxt/client-db-D27-64pI.js").then((m) => m.useContentDatabase());
    return db.fetch(query);
  }
  const data = await $fetch(apiPath, {
    method: "GET",
    responseType: "json",
    params: content.experimental.stripQueryParameters ? void 0 : {
      _params: jsonStringify(params),
      previewToken: useContentPreview().getPreviewToken()
    }
  });
  if (typeof data === "string" && data.startsWith("<!DOCTYPE html>")) {
    throw new Error("Not found");
  }
  return data;
};
function queryContent(query, ...pathParts) {
  const { content } = (/* @__PURE__ */ useRuntimeConfig()).public;
  const queryBuilder = createQuery(createQueryFetch(), {
    initialParams: typeof query !== "string" ? query : {},
    legacy: true
  });
  let path;
  if (typeof query === "string") {
    path = withLeadingSlash(joinURL(query, ...pathParts));
  }
  const originalParamsFn = queryBuilder.params;
  queryBuilder.params = () => {
    var _a, _b, _c;
    const params = originalParamsFn();
    if (path) {
      params.where = params.where || [];
      if (params.first && (params.where || []).length === 0) {
        params.where.push({ _path: withoutTrailingSlash(path) });
      } else {
        params.where.push({ _path: new RegExp(`^${path.replace(/[-[\]{}()*+.,^$\s/]/g, "\\$&")}`) });
      }
    }
    if (!((_a = params.sort) == null ? void 0 : _a.length)) {
      params.sort = [{ _stem: 1, $numeric: true }];
    }
    if (content.locales.length) {
      const queryLocale = (_c = (_b = params.where) == null ? void 0 : _b.find((w) => w._locale)) == null ? void 0 : _c._locale;
      if (!queryLocale) {
        params.where = params.where || [];
        params.where.push({ _locale: content.defaultLocale });
      }
    }
    return params;
  };
  return queryBuilder;
}
const fetchContentNavigation = async (queryBuilder) => {
  const { content } = (/* @__PURE__ */ useRuntimeConfig()).public;
  if (typeof (queryBuilder == null ? void 0 : queryBuilder.params) !== "function") {
    queryBuilder = queryContent(queryBuilder);
  }
  const params = queryBuilder.params();
  const apiPath = content.experimental.stripQueryParameters ? withContentBase(`/navigation/${`${hash(params)}.${content.integrity}`}/${encodeQueryParams(params)}.json`) : withContentBase(`/navigation/${hash(params)}.${content.integrity}.json`);
  {
    addPrerenderPath(apiPath);
  }
  if (shouldUseClientDB()) {
    const generateNavigation = await import("./_nuxt/client-db-D27-64pI.js").then((m) => m.generateNavigation);
    return generateNavigation(params);
  }
  const data = await $fetch(apiPath, {
    method: "GET",
    responseType: "json",
    params: content.experimental.stripQueryParameters ? void 0 : {
      _params: jsonStringify(params),
      previewToken: useContentPreview().getPreviewToken()
    }
  });
  if (typeof data === "string" && data.startsWith("<!DOCTYPE html>")) {
    throw new Error("Not found");
  }
  return data;
};
const layouts = {
  card: defineAsyncComponent(() => import("./_nuxt/card-BN5-gUeX.js")),
  default: defineAsyncComponent(() => import("./_nuxt/default-Dvu1hBGx.js")),
  listing: defineAsyncComponent(() => import("./_nuxt/listing-CSksTejn.js")),
  post: defineAsyncComponent(() => import("./_nuxt/post-BWbDJqQI.js")),
  thin: defineAsyncComponent(() => import("./_nuxt/thin-Ch465PAm.js")),
  wide: defineAsyncComponent(() => import("./_nuxt/wide-CK4tXp_N.js"))
};
const documentDriven_cMiI6j6ghD = /* @__PURE__ */ defineNuxtPlugin((nuxt) => {
  var _a, _b, _c, _d;
  const moduleOptions = (_b = (_a = /* @__PURE__ */ useRuntimeConfig()) == null ? void 0 : _a.public) == null ? void 0 : _b.content.documentDriven;
  (_d = (_c = /* @__PURE__ */ useRuntimeConfig()) == null ? void 0 : _c.public) == null ? void 0 : _d.content.experimental.clientDB;
  const { navigation, pages, globals, surrounds } = useContentState();
  const findLayout = (to, page, navigation2, globals2) => {
    var _a2;
    if (page && (page == null ? void 0 : page.layout)) {
      return page.layout;
    }
    if (to.matched[0] && ((_a2 = to.matched[0].meta) == null ? void 0 : _a2.layout)) {
      return to.matched[0].meta.layout;
    }
    if (navigation2 && page) {
      const { navKeyFromPath: navKeyFromPath2 } = useContentHelpers();
      const layoutFromNav = navKeyFromPath2(page._path, "layout", navigation2);
      if (layoutFromNav) {
        return layoutFromNav;
      }
    }
    if (moduleOptions.layoutFallbacks && globals2) {
      let layoutFallback;
      for (const fallback of moduleOptions.layoutFallbacks) {
        if (globals2[fallback] && globals2[fallback].layout) {
          layoutFallback = globals2[fallback].layout;
          break;
        }
      }
      if (layoutFallback) {
        return layoutFallback;
      }
    }
    return "default";
  };
  const refresh = async (to, dedup = false) => {
    nuxt.callHook("content:document-driven:start", { route: to, dedup });
    const routeConfig = to.meta.documentDriven || {};
    if (to.meta.documentDriven === false) {
      return;
    }
    const _path = withoutTrailingSlash(to.path);
    const promises = [];
    if (moduleOptions.navigation && routeConfig.navigation !== false) {
      const navigationQuery = () => {
        const { navigation: navigation2 } = useContentState();
        if (navigation2.value && !dedup) {
          return navigation2.value;
        }
        return fetchContentNavigation().then((_navigation) => {
          navigation2.value = _navigation;
          return _navigation;
        }).catch(() => null);
      };
      promises.push(navigationQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    if (moduleOptions.globals) {
      const globalsQuery = () => {
        const { globals: globals2 } = useContentState();
        if (typeof moduleOptions.globals === "object" && Array.isArray(moduleOptions.globals)) {
          console.log("Globals must be a list of keys with QueryBuilderParams as a value.");
          return;
        }
        return Promise.all(
          Object.entries(moduleOptions.globals).map(
            ([key, query]) => {
              if (!dedup && globals2.value[key]) {
                return globals2.value[key];
              }
              let type = "findOne";
              if (query == null ? void 0 : query.type) {
                type = query.type;
              }
              return queryContent(query)[type]().catch(() => null);
            }
          )
        ).then(
          (values) => {
            return values.reduce(
              (acc, value, index2) => {
                const key = Object.keys(moduleOptions.globals)[index2];
                if (key) {
                  acc[key] = value;
                }
                return acc;
              },
              {}
            );
          }
        );
      };
      promises.push(globalsQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    if (moduleOptions.page && routeConfig.page !== false) {
      let where = { _path };
      if (typeof routeConfig.page === "string") {
        where = { _path: routeConfig.page };
      }
      if (typeof routeConfig.page === "object") {
        where = routeConfig.page;
      }
      const pageQuery = () => {
        const { pages: pages2 } = useContentState();
        if (!dedup && pages2.value[_path] && pages2.value[_path]._path === _path) {
          return pages2.value[_path];
        }
        return queryContent().where(where).findOne().catch(() => null);
      };
      promises.push(pageQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    if (moduleOptions.surround && routeConfig.surround !== false) {
      let surround = _path;
      if (["string", "object"].includes(typeof routeConfig.page)) {
        surround = routeConfig.page;
      }
      if (["string", "object"].includes(typeof routeConfig.surround)) {
        surround = routeConfig.surround;
      }
      const surroundQuery = () => {
        const { surrounds: surrounds2 } = useContentState();
        if (!dedup && surrounds2.value[_path]) {
          return surrounds2.value[_path];
        }
        return queryContent().where({
          _partial: { $not: true },
          navigation: { $not: false }
        }).without(["body"]).findSurround(surround).catch(() => null);
      };
      promises.push(surroundQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    return await Promise.all(promises.map((promise) => promise())).then(async ([
      _navigation,
      _globals,
      _page,
      _surround
    ]) => {
      var _a2, _b2;
      if (_navigation) {
        navigation.value = _navigation;
      }
      if (_globals) {
        globals.value = _globals;
      }
      if (_surround) {
        surrounds.value[_path] = _surround;
      }
      const redirectTo = (_page == null ? void 0 : _page.redirect) || ((_b2 = (_a2 = _page == null ? void 0 : _page._dir) == null ? void 0 : _a2.navigation) == null ? void 0 : _b2.redirect);
      if (redirectTo) {
        pages.value[_path] = _page;
        return redirectTo;
      }
      if (_page) {
        const layoutName = findLayout(to, _page, _navigation, _globals);
        const layout = layouts[layoutName];
        if (layout && typeof layout === "function") {
          await layout();
        }
        to.meta.layout = layoutName;
        _page.layout = layoutName;
      }
      pages.value[_path] = _page;
      await nuxt.callHook("content:document-driven:finish", { route: to, dedup, page: _page, navigation: _navigation, globals: _globals, surround: _surround });
    });
  };
  addRouteMiddleware(async (to, from) => {
    const redirect = await refresh(to, false);
    if (redirect) {
      if (hasProtocol(redirect)) {
        return callWithNuxt(nuxt, navigateTo, [redirect, { external: true }]);
      } else {
        return redirect;
      }
    }
  });
  nuxt.hook("app:data:refresh", async () => false);
});
let routes;
let _routeRulesMatcher = void 0;
const prerender_server_LXx1wM9sKF = /* @__PURE__ */ defineNuxtPlugin(async () => {
  let __temp, __restore;
  if (!import.meta.prerender || routerOptions.hashMode) {
    return;
  }
  if (routes && !routes.length) {
    return;
  }
  (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules;
  routes || (routes = Array.from(processRoutes(([__temp, __restore] = executeAsync(() => {
    var _a;
    return (_a = routerOptions.routes) == null ? void 0 : _a.call(routerOptions, _routes);
  }), __temp = await __temp, __restore(), __temp) ?? _routes)));
  const batch = routes.splice(0, 10);
  prerenderRoutes(batch);
});
const OPTIONAL_PARAM_RE = /^\/?:.*(?:\?|\(\.\*\)\*)$/;
function shouldPrerender(path) {
  return !_routeRulesMatcher;
}
function processRoutes(routes2, currentPath = "/", routesToPrerender = /* @__PURE__ */ new Set()) {
  var _a;
  for (const route of routes2) {
    if (OPTIONAL_PARAM_RE.test(route.path) && !((_a = route.children) == null ? void 0 : _a.length) && shouldPrerender()) {
      routesToPrerender.add(currentPath);
    }
    if (route.path.includes(":")) {
      continue;
    }
    const fullPath = joinURL(currentPath, route.path);
    {
      routesToPrerender.add(fullPath);
    }
    if (route.children) {
      processRoutes(route.children, fullPath, routesToPrerender);
    }
  }
  return routesToPrerender;
}
const _1_absoluteImageUrls_server_fFRzzZyk5x = /* @__PURE__ */ defineNuxtPlugin({
  enforce: "post",
  setup() {
    const head = injectHead$1();
    if (!head)
      return;
    const resolver2 = createSitePathResolver({
      withBase: true,
      absolute: true,
      canonical: true
    });
    head.use({
      hooks: {
        "tags:resolve": async ({ tags }) => {
          for (const tag of tags) {
            if (tag.tag !== "meta")
              continue;
            if (tag.props.property !== "og:image:url" && tag.props.property !== "og:image" && tag.props.name !== "twitter:image")
              continue;
            if (typeof tag.props.content !== "string" || !tag.props.content.trim() || tag.props.content.startsWith("http") || tag.props.content.startsWith("//"))
              continue;
            tag.props.content = unref(resolver2(tag.props.content));
          }
        }
      }
    });
  }
});
const _0_routeRules_server_BfMGGJG5SO = /* @__PURE__ */ defineNuxtPlugin({
  enforce: "post",
  async setup() {
    const head = injectHead$1();
    if (!head)
      return;
    const event = useRequestEvent();
    if (event.context._nitro.routeRules.head)
      head.push(event.context._nitro.routeRules.head, { mode: "server" });
    if (event.context._nitro.routeRules.seoMeta) {
      const meta = unpackMeta({ ...event.context._nitro.routeRules.seoMeta });
      head.push({
        meta
      }, { mode: "server" });
    }
  }
});
function applyDefaults(i18n) {
  const { canonicalQueryWhitelist } = (/* @__PURE__ */ useRuntimeConfig()).public["nuxt-seo"];
  const siteConfig = useSiteConfig();
  const route = useRoute();
  const resolveUrl = createSitePathResolver({ withBase: true, absolute: true });
  const canonicalUrl = computed(() => {
    const { query } = route;
    const url = resolveUrl(route.path || "/").value || route.path;
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([key]) => canonicalQueryWhitelist.includes(key))
    );
    return Object.keys(filteredQuery).length ? `${url}?${stringifyQuery(filteredQuery)}` : url;
  });
  const minimalPriority = {
    // give nuxt.config values higher priority
    tagPriority: 101
  };
  useHead({
    htmlAttrs: { lang: i18n.locale },
    templateParams: { site: siteConfig, siteName: siteConfig.name || "" },
    titleTemplate: "%s %separator %siteName",
    link: [{ rel: "canonical", href: () => canonicalUrl.value }]
  }, minimalPriority);
  const seoMeta = {
    ogType: "website",
    ogUrl: () => canonicalUrl.value,
    ogLocale: () => i18n.locale.value,
    ogSiteName: siteConfig.name
  };
  if (siteConfig.description)
    seoMeta.description = siteConfig.description;
  if (siteConfig.twitter) {
    const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter : `@${siteConfig.twitter}`;
    seoMeta.twitterCreator = id;
    seoMeta.twitterSite = id;
  }
  useSeoMeta(seoMeta, minimalPriority);
}
const defaults_aRl2YLnTcb = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-seo:defaults",
  order: 999,
  env: {
    islands: false
  },
  setup() {
    const siteConfig = useSiteConfig();
    const locale = ref(siteConfig.currentLocale || siteConfig.defaultLocale);
    applyDefaults({
      locale
    });
  }
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin,
  _0_siteConfig_MwZUzHrRNP,
  site_config_server_pnEF9VM0sY,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  titles_dw2T9lEw4h,
  siteConfig_izaWKZ8rEu,
  inferSeoMetaPlugin_Uk9bcXDHeN,
  defaults_ejC916ejE3,
  init_8zxuXEdLTw,
  og_image_canonical_urls_server_YYKCE0iokV,
  route_rule_og_image_server_xL1rf4QeLE,
  robot_meta_server_6Qhe4cPOr2,
  plugin_server_ano7jnMEqi,
  plugin_WLsn00x1qh,
  documentDriven_cMiI6j6ghD,
  prerender_server_LXx1wM9sKF,
  _1_absoluteImageUrls_server_fFRzzZyk5x,
  _0_routeRules_server_BfMGGJG5SO,
  defaults_aRl2YLnTcb
];
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$7 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    viewBox: "0 0 2 2",
    class: "mx-2 inline h-0.5 w-0.5 fill-current",
    "aria-hidden": "true"
  }, _attrs))}><circle cx="1" cy="1" r="1"></circle></svg>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/header/Dot.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$3]]);
async function loadIcon(name, timeout) {
  if (!name)
    return null;
  const _icon = getIcon(name);
  if (_icon)
    return _icon;
  let timeoutWarn;
  const load = loadIcon$1(name).catch(() => {
    console.warn(`[Icon] failed to load icon \`${name}\``);
    return null;
  });
  if (timeout > 0)
    await Promise.race([
      load,
      new Promise((resolve) => {
        timeoutWarn = setTimeout(() => {
          console.warn(`[Icon] loading icon \`${name}\` timed out after ${timeout}ms`);
          resolve();
        }, timeout);
      })
    ]).finally(() => clearTimeout(timeoutWarn));
  else
    await load;
  return getIcon(name);
}
function useResolvedName(getName) {
  const options = useAppConfig().icon;
  const collections = (options.collections || []).sort((a, b) => b.length - a.length);
  return computed(() => {
    var _a;
    const name = getName();
    const bare = name.startsWith(options.cssSelectorPrefix) ? name.slice(options.cssSelectorPrefix.length) : name;
    const resolved = ((_a = options.aliases) == null ? void 0 : _a[bare]) || bare;
    if (!resolved.includes(":")) {
      const collection = collections.find((c) => resolved.startsWith(c + "-"));
      return collection ? collection + ":" + resolved.slice(collection.length + 1) : resolved;
    }
    return resolved;
  });
}
const SYMBOL_SERVER_CSS = "NUXT_ICONS_SERVER_CSS";
function escapeCssSelector(selector) {
  return selector.replace(/([^\w-])/g, "\\$1");
}
const NuxtIconCss = /* @__PURE__ */ defineComponent({
  name: "NuxtIconCss",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: Function,
      required: false
    }
  },
  setup(props) {
    var _a;
    const nuxt = useNuxtApp();
    const options = useAppConfig().icon;
    const cssClass = computed(() => props.name ? options.cssSelectorPrefix + props.name : "");
    const selector = computed(() => "." + escapeCssSelector(cssClass.value));
    function getCSS(icon, withLayer = true) {
      let iconSelector = selector.value;
      if (options.cssWherePseudo) {
        iconSelector = `:where(${iconSelector})`;
      }
      const css = getIconCSS(icon, {
        iconSelector,
        format: "compressed",
        customise: props.customize
      });
      if (options.cssLayer && withLayer) {
        return `@layer ${options.cssLayer} { ${css} }`;
      }
      return css;
    }
    {
      const configs = (/* @__PURE__ */ useRuntimeConfig()).icon || {};
      if (!((_a = configs == null ? void 0 : configs.serverKnownCssClasses) == null ? void 0 : _a.includes(cssClass.value))) {
        onServerPrefetch(async () => {
          const icon = await loadIcon(props.name, options.fetchTimeout).catch(() => null);
          if (!icon)
            return null;
          let ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS];
          if (!ssrCSS) {
            ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS] = /* @__PURE__ */ new Map();
            nuxt.runWithContext(() => {
              useHead({
                style: [
                  () => {
                    const sep = "";
                    let css = Array.from(ssrCSS.values()).sort().join(sep);
                    if (options.cssLayer) {
                      css = `@layer ${options.cssLayer} {${sep}${css}${sep}}`;
                    }
                    return { innerHTML: css };
                  }
                ]
              }, {
                tagPriority: "low"
              });
            });
          }
          if (props.name && !ssrCSS.has(props.name)) {
            const css = getCSS(icon, false);
            ssrCSS.set(props.name, css);
          }
          return null;
        });
      }
    }
    return () => h("span", { class: ["iconify", cssClass.value] });
  }
});
const NuxtIconSvg = /* @__PURE__ */ defineComponent({
  name: "NuxtIconSvg",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots }) {
    useNuxtApp();
    const options = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const storeKey = "i-" + name.value;
    if (name.value) {
      {
        useAsyncData(
          storeKey,
          () => loadIcon(name.value, options.fetchTimeout),
          { deep: false }
        );
      }
    }
    return () => h(Icon, {
      icon: name.value,
      ssr: true,
      // Iconify uses `customise`, where we expose `customize` for consistency
      customise: props.customize
    }, slots);
  }
});
const __nuxt_component_0$1 = defineComponent({
  name: "NuxtIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: [Number, String],
      required: false,
      default: null
    },
    customize: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots }) {
    const nuxtApp = useNuxtApp();
    const runtimeOptions = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const component = computed(
      () => {
        var _a;
        return ((_a = nuxtApp.vueApp) == null ? void 0 : _a.component(name.value)) || ((props.mode || runtimeOptions.mode) === "svg" ? NuxtIconSvg : NuxtIconCss);
      }
    );
    const style = computed(() => {
      const size = props.size || runtimeOptions.size;
      return size ? { fontSize: Number.isNaN(+size) ? size : size + "px" } : null;
    });
    const customize = props.customize || runtimeOptions.customize;
    return () => h(
      component.value,
      {
        ...runtimeOptions.attrs,
        name: name.value,
        class: runtimeOptions.class,
        style: style.value,
        customize
      },
      slots
    );
  }
});
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_0$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Banner",
  __ssrInlineRender: true,
  setup(__props) {
    const bannerConfig = useAppConfig().header.banner;
    const href = computed(() => {
      const link = bannerConfig == null ? void 0 : bannerConfig.link;
      if (link) {
        return link;
      }
      return "#";
    });
    const showBanner = useState("showBanner", () => false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_AppHeaderDot = __nuxt_component_0$2;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: unref(showBanner) && ((_a = unref(bannerConfig)) == null ? void 0 : _a.show) ? null : { display: "none" },
        class: "flex items-center justify-center gap-x-6 bg-primary-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
      }, _attrs))}><p class="text-sm leading-6 text-white"><a${ssrRenderAttr("href", unref(href))} target="_blank" class="inline-flex items-center gap-1">`);
      if ((_b = unref(bannerConfig)) == null ? void 0 : _b.brandText) {
        _push(`<strong class="font-semibold hidden sm:block">${ssrInterpolate(unref(bannerConfig).brandText)}</strong>`);
      } else {
        _push(`<!---->`);
      }
      if ((_c = unref(bannerConfig)) == null ? void 0 : _c.brandText) {
        _push(ssrRenderComponent(_component_AppHeaderDot, { class: "hidden sm:block" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate((_d = unref(bannerConfig)) == null ? void 0 : _d.text)} `);
      _push(ssrRenderComponent(_component_Icon, {
        class: "hidden sm:block w-5 h-5",
        name: "tabler:arrow-right"
      }, null, _parent));
      _push(`</a></p><div class="hidden sm:flex flex-1 justify-end items-center"><button type="button" class="w-5 h-5"><span class="sr-only">Dismiss</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "tabler:x",
        class: "h-5 w-5 text-white",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</button></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/header/Banner.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _imports_1 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='38'%20height='38'%3e%3cdefs%3e%3clinearGradient%20id='b'%20x1='87.629%25'%20x2='9.97%25'%20y1='28.473%25'%20y2='86.882%25'%3e%3cstop%20offset='0%25'%20stop-color='%23F1F5F9'%20stop-opacity='0'/%3e%3cstop%20offset='100%25'%20stop-color='%23F1F5F9'/%3e%3c/linearGradient%3e%3cfilter%20id='a'%20width='141.4%25'%20height='141.4%25'%20x='-20.7%25'%20y='-20.7%25'%20filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur%20in='SourceGraphic'%20stdDeviation='2'/%3e%3c/filter%3e%3c/defs%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%23A855F7'%20d='M19%2033.5c-8.008%200-14.5-6.492-14.5-14.5S10.992%204.5%2019%204.5%2033.5%2010.992%2033.5%2019%2027.008%2033.5%2019%2033.5Zm0-5a9.5%209.5%200%201%200%200-19%209.5%209.5%200%200%200%200%2019Z'%20filter='url(%23a)'/%3e%3cpath%20fill='url(%23b)'%20d='M19%2033.5c-8.008%200-14.5-6.492-14.5-14.5S10.992%204.5%2019%204.5%2033.5%2010.992%2033.5%2019%2027.008%2033.5%2019%2033.5Zm0-5a9.5%209.5%200%201%200%200-19%209.5%209.5%200%200%200%200%2019Z'/%3e%3c/g%3e%3c/svg%3e";
const _sfc_main$5 = {
  name: "Header",
  setup() {
    const mobileNavOpen = ref(false);
    const mobileNav = ref(null);
    const hamburger = ref(null);
    return {
      mobileNavOpen,
      mobileNav,
      hamburger
    };
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "absolute w-full z-30" }, _attrs))}><div class="max-w-6xl mx-auto px-4 sm:px-6"><div class="flex items-center justify-between h-16 md:h-20"><div class="flex-1">`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "inline-flex",
    to: "/",
    "aria-label": "Cruip"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img class="max-w-none"${ssrRenderAttr("src", _imports_1)} width="38" height="38" alt="Stellar"${_scopeId}>`);
      } else {
        return [
          createVNode("img", {
            class: "max-w-none",
            src: _imports_1,
            width: "38",
            height: "38",
            alt: "Stellar"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><nav class="hidden md:flex md:grow"><ul class="flex grow justify-center flex-wrap items-center"><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out",
    to: "/about"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`About`);
      } else {
        return [
          createTextVNode("About")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out",
    to: "/integrations"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Integrations`);
      } else {
        return [
          createTextVNode("Integrations")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out",
    to: "/pricing"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Pricing`);
      } else {
        return [
          createTextVNode("Pricing")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out",
    to: "/customers"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Customers`);
      } else {
        return [
          createTextVNode("Customers")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out",
    to: "/changelog"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Changelog`);
      } else {
        return [
          createTextVNode("Changelog")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out",
    to: "/blogs"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Blog`);
      } else {
        return [
          createTextVNode("Blog")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out",
    to: "/help"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Help Centre`);
      } else {
        return [
          createTextVNode("Help Centre")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "flex font-medium text-sm text-slate-300 hover:text-white py-1.5",
    to: "/contact"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Contact Us`);
      } else {
        return [
          createTextVNode("Contact Us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></nav><ul class="flex-1 flex justify-end items-center"><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "font-medium text-sm text-slate-300 hover:text-white whitespace-nowrap transition duration-150 ease-in-out",
    to: "/signin"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Sign in`);
      } else {
        return [
          createTextVNode("Sign in")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="ml-6">`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none",
    to: "/signup"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="relative inline-flex items-center"${_scopeId}> Sign up <span class="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1"${_scopeId}>-&gt;</span></span>`);
      } else {
        return [
          createVNode("span", { class: "relative inline-flex items-center" }, [
            createTextVNode(" Sign up "),
            createVNode("span", { class: "tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" }, "->")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul><div class="md:hidden flex items-center ml-4"><button class="${ssrRenderClass([{ "active": $setup.mobileNavOpen }, "hamburger"])}" aria-controls="mobile-nav"${ssrRenderAttr("aria-expanded", $setup.mobileNavOpen)}><span class="sr-only">Menu</span><svg class="w-5 h-5 fill-current text-slate-300 hover:text-white transition duration-150 ease-in-out" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="2" width="20" height="2" rx="1"></rect><rect y="9" width="20" height="2" rx="1"></rect><rect y="16" width="20" height="2" rx="1"></rect></svg></button><nav id="mobile-nav" class="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" style="${ssrRenderStyle([$setup.mobileNavOpen ? { maxHeight: _ctx.$refs.mobileNav.scrollHeight + "px", opacity: 1 } : { maxHeight: 0, opacity: 0.8 }])}"><ul class="border border-transparent [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] rounded-lg px-4 py-1.5"><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "flex font-medium text-sm text-slate-300 hover:text-white py-1.5",
    to: "/about"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`About`);
      } else {
        return [
          createTextVNode("About")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "flex font-medium text-sm text-slate-300 hover:text-white py-1.5",
    to: "/integrations"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Integrations`);
      } else {
        return [
          createTextVNode("Integrations")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "flex font-medium text-sm text-slate-300 hover:text-white py-1.5",
    to: "/pricing"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Pricing`);
      } else {
        return [
          createTextVNode("Pricing")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "flex font-medium text-sm text-slate-300 hover:text-white py-1.5",
    to: "/customers"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Customers`);
      } else {
        return [
          createTextVNode("Customers")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "flex font-medium text-sm text-slate-300 hover:text-white py-1.5",
    to: "/changelog"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Changelog`);
      } else {
        return [
          createTextVNode("Changelog")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "flex font-medium text-sm text-slate-300 hover:text-white py-1.5",
    to: "/blogs"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Blog`);
      } else {
        return [
          createTextVNode("Blog")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "flex font-medium text-sm text-slate-300 hover:text-white py-1.5",
    to: "/help"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Help Centre`);
      } else {
        return [
          createTextVNode("Help Centre")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "flex font-medium text-sm text-slate-300 hover:text-white py-1.5",
    to: "/contact"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Contact Us`);
      } else {
        return [
          createTextVNode("Contact Us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></nav></div></div></div></header>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/Navbar.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$4 = {
  name: "Footer"
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<footer${ssrRenderAttrs(_attrs)}><div class="max-w-6xl mx-auto px-4 sm:px-6"><div class="grid sm:grid-cols-12 gap-8 py-8 md:py-12"><div class="sm:col-span-12 lg:col-span-4 order-1 lg:order-none"><div class="h-full flex flex-col sm:flex-row lg:flex-col justify-between"><div class="mb-4 sm:mb-0"><div class="mb-4">`);
  _push(ssrRenderComponent(_component_router_link, {
    class: "inline-flex",
    to: "/",
    "aria-label": "Cruip"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${ssrRenderAttr("src", _imports_1)} width="38" height="38" alt="Stellar"${_scopeId}>`);
      } else {
        return [
          createVNode("img", {
            src: _imports_1,
            width: "38",
            height: "38",
            alt: "Stellar"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="text-sm text-slate-300">© Cruip.com <span class="text-slate-500">-</span> All rights reserved.</div></div><ul class="flex"><li><a class="flex justify-center items-center text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out" href="#0" aria-label="Twitter"><svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z"></path></svg></a></li><li class="ml-2"><a class="flex justify-center items-center text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out" href="#0" aria-label="Dev.to"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path class="w-8 h-8 fill-current" d="M12.29 14.3a.69.69 0 0 0-.416-.155h-.623v3.727h.623a.689.689 0 0 0 .416-.156.543.543 0 0 0 .21-.466v-2.488a.547.547 0 0 0-.21-.462ZM22.432 8H9.568C8.704 8 8.002 8.7 8 9.564v12.872A1.568 1.568 0 0 0 9.568 24h12.864c.864 0 1.566-.7 1.568-1.564V9.564A1.568 1.568 0 0 0 22.432 8Zm-8.925 9.257a1.631 1.631 0 0 1-1.727 1.687h-1.657v-5.909h1.692a1.631 1.631 0 0 1 1.692 1.689v2.533ZM17.1 14.09h-1.9v1.372h1.163v1.057H15.2v1.371h1.9v1.056h-2.217a.72.72 0 0 1-.74-.7v-4.471a.721.721 0 0 1 .7-.739H17.1v1.054Zm3.7 4.118c-.471 1.1-1.316.88-1.694 0l-1.372-5.172H18.9l1.058 4.064 1.056-4.062h1.164l-1.378 5.17Z"></path></svg></a></li><li class="ml-2"><a class="flex justify-center items-center text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out" href="#0" aria-label="Github"><svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"></path></svg></a></li></ul></div></div><div class="sm:col-span-6 md:col-span-3 lg:col-span-2"><h6 class="text-sm text-slate-50 font-medium mb-2">Products</h6><ul class="text-sm space-y-2"><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Features</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Integrations</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Pricing &amp; Plans</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Changelog</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Our method</a></li></ul></div><div class="sm:col-span-6 md:col-span-3 lg:col-span-2"><h6 class="text-sm text-slate-50 font-medium mb-2">Company</h6><ul class="text-sm space-y-2"><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">About us</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Diversity &amp; Inclusion</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Blog</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Careers</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Financial statements</a></li></ul></div><div class="sm:col-span-6 md:col-span-3 lg:col-span-2"><h6 class="text-sm text-slate-50 font-medium mb-2">Resources</h6><ul class="text-sm space-y-2"><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Community</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Terms of service</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Report a vulnerability</a></li></ul></div><div class="sm:col-span-6 md:col-span-3 lg:col-span-2"><h6 class="text-sm text-slate-50 font-medium mb-2">Legals</h6><ul class="text-sm space-y-2"><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Refund policy</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Terms &amp; Conditions</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Privacy policy</a></li><li><a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Brand Kit</a></li></ul></div></div></div></footer>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/Footer.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeaderBanner = _sfc_main$6;
  const _component_AppNavbar = __nuxt_component_1$1;
  const _component_AppFooter = __nuxt_component_2$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-display grid min-h-screen grid-rows-[auto,auto,1fr,auto] font-inter antialiased bg-slate-900 text-slate-100 tracking-tight transition-colors" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AppHeaderBanner, null, null, _parent));
  _push(ssrRenderComponent(_component_AppNavbar, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/Layout.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const __nuxt_component_1 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_2 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: slots.default ? h(Fragment, void 0, slots.default(routeProps)) : routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray$1(prop.onAfterLeave) : void 0
  }));
  return defu$1(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index2 = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index2 < newRoute.matched.length - 1;
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const { layout } = useContent();
    const layoutName = computed(() => layout.value || "wide");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLayout = __nuxt_component_0;
      const _component_NuxtLayout = __nuxt_component_1;
      const _component_NuxtPage = __nuxt_component_2;
      _push(ssrRenderComponent(_component_AppLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLayout, { name: unref(layoutName) }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtPage, { class: "page-enter-active" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtPage, { class: "page-enter-active" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLayout, { name: unref(layoutName) }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtPage, { class: "page-enter-active" })
                ]),
                _: 1
              }, 8, ["name"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import("./_nuxt/error-404-CzGh5El0.js"));
    const _Error = defineAsyncComponent(() => import("./_nuxt/error-500-BdFYpYCc.js"));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = defineAsyncComponent(() => import("./_nuxt/island-renderer-940BulZI.js").then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);
export {
  useContentPreview as A,
  injectHead$1 as B,
  useScript as C,
  _imports_1 as D,
  fetchContentNavigation as E,
  get as F,
  assertArray as G,
  ensureArray as H,
  omit as I,
  sortList as J,
  apply as K,
  withoutKeys as L,
  withKeys as M,
  createQuery as N,
  useSiteConfig as O,
  _export_sfc as _,
  __nuxt_component_0$1 as a,
  useNuxtApp as b,
  createError as c,
  useContent as d,
  entry$1 as default,
  callWithNuxt as e,
  useSeoMeta as f,
  useRoute as g,
  useAsyncData as h,
  injectHead$2 as i,
  useHead as j,
  useRuntimeConfig as k,
  useOgImageRuntimeConfig as l,
  createOgImageMeta as m,
  normaliseOptions as n,
  getOgImagePath as o,
  useRequestEvent as p,
  queryContent as q,
  resolveUnrefHeadInput$2 as r,
  separateProps as s,
  useState as t,
  useAppConfig as u,
  useCookie as v,
  useRouter as w,
  nuxtLinkDefaults as x,
  resolveRouteObject as y,
  navigateTo as z
};
//# sourceMappingURL=server.mjs.map
