<!-- <script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

const config = useAppConfig().header;

const route = useRoute();

const routesRef = computed(() => {
  if (!config.navbar?.links) {
    return [];
  }
  return config.navbar?.links.map(
    e => {
      e['active'] = route.path.split('/')[0].includes(e.to) || route.path === e.to;
      return e;
    }
  );
});
</script> -->

<!-- <template>
  <Disclosure as="nav" class="bg-white dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
    v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
           Mobile menu button 
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Icon name="tabler:baseline-density-medium" v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <Icon name="tabler:x" v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <AppLogo />
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <template v-for="navItem in routesRef">
              <NuxtLink v-if="navItem.target !== '_blank'" :to="navItem.to"
                class="inline-flex gap-2 items-center border-b-2  px-1 pt-1 text-sm font-medium"
                :class="navItem.active ? 'border-primary-500 text-gray-900 dark:text-gray-50' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-700 text-gray-500 dark:text-gray-200'">
                {{ navItem.name }}
              </NuxtLink>
              <a v-else :href="navItem.to" target="_blank"
                class="inline-flex gap-2 items-center border-b-2  px-1 pt-1 text-sm font-medium border-transparent hover:border-gray-300 hover:text-gray-700 dark:hover:border-gray-500 text-gray-500 dark:text-gray-200">
                {{ navItem.name }}
                <Icon v-if="navItem.target === '_blank'" name="tabler:external-link" />
              </a>
            </template>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="flex gap-2 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <AppHeaderColorSelector class="hidden md:flex" v-if="config?.navbar?.colorModeSelector" />
            <NuxtLink :to="config?.actionButton?.href"
              class="hidden md:block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {{ config?.actionButton?.text }}
            </NuxtLink>
          </div>

        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-4 pt-2">
        <DisclosureButton v-for="item in routesRef" as="a" :href="item.to"
          class="block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
          :class="item.active ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'">
          {{ item.name }}
          <Icon v-if="item.target === '_blank'" name="tabler:external-link" />
        </DisclosureButton>
      </div>

      <div class="border-t border-gray-200 pb-3 pt-4">
        <div class="flex items-center px-4">
          <NuxtLink :to="config?.actionButton?.href"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {{ config?.actionButton?.text }}
          </NuxtLink>
          <AppHeaderColorSelector class="relative ml-auto" v-if="config?.navbar?.colorModeSelector" />
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template> -->
<template>
  <header class="absolute w-full z-30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16 md:h-20">

        <!-- Site branding -->
        <div class="flex-1">
          <!-- Logo -->
          <router-link class="inline-flex" to="/" aria-label="Cruip">
            <img class="max-w-none" src="../../images/logo.svg" width="38" height="38" alt="Stellar">
          </router-link>
        </div>

        <!-- Desktop navigation -->
        <nav class="hidden md:flex md:grow">

          <!-- Desktop menu links -->
          <ul class="flex grow justify-center flex-wrap items-center">
            <li>
              <router-link class="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" to="/about">About</router-link>
            </li>
            <li>
              <router-link class="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" to="/integrations">Integrations</router-link>
            </li>
            <li>
              <router-link class="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" to="/pricing">Pricing</router-link>
            </li>
            <li>
              <router-link class="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" to="/customers">Customers</router-link>
            </li>
            <li>
              <router-link class="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" to="/changelog">Changelog</router-link>
            </li>
            <li>
              <router-link class="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" to="/blogs">Blog</router-link>
            </li>
            <li>
              <router-link class="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" to="/help">Help Centre</router-link>
            </li>
            <li>
                <router-link class="flex font-medium text-sm text-slate-300 hover:text-white py-1.5" to="/contact">Contact Us</router-link>
              </li>
          </ul>

        </nav>

        <!-- Desktop sign in links -->
        <ul class="flex-1 flex justify-end items-center">
          <li>
            <router-link class="font-medium text-sm text-slate-300 hover:text-white whitespace-nowrap transition duration-150 ease-in-out" to="/signin">Sign in</router-link>
          </li>
          <li class="ml-6">
            <router-link class="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none" to="/signup">
              <span class="relative inline-flex items-center">
                Sign up <span class="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
              </span>
            </router-link>
          </li>
        </ul>

        <!-- Mobile menu -->
        <div class="md:hidden flex items-center ml-4">

          <!-- Hamburger button -->
          <button class="hamburger" ref="hamburger" :class="{ 'active': mobileNavOpen }" @click="mobileNavOpen = !mobileNavOpen" aria-controls="mobile-nav" :aria-expanded="mobileNavOpen">
            <span class="sr-only">Menu</span>
            <svg class="w-5 h-5 fill-current text-slate-300 hover:text-white transition duration-150 ease-in-out" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <rect y="2" width="20" height="2" rx="1" />
              <rect y="9" width="20" height="2" rx="1" />
              <rect y="16" width="20" height="2" rx="1" />
            </svg>
          </button>

          <!-- Mobile navigation -->
          <nav id="mobile-nav" class="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" ref="mobileNav" :style="[mobileNavOpen ? { maxHeight: $refs.mobileNav.scrollHeight + 'px', opacity: 1 } : { maxHeight: 0, opacity: .8 }]" @click.outside="expanded = false" @keydown.escape.window="expanded = false">
            <ul class="border border-transparent [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] rounded-lg px-4 py-1.5">
              <li>
                <router-link class="flex font-medium text-sm text-slate-300 hover:text-white py-1.5" to="/about">About</router-link>
              </li>
              <li>
                <router-link class="flex font-medium text-sm text-slate-300 hover:text-white py-1.5" to="/integrations">Integrations</router-link>
              </li>
              <li>
                <router-link class="flex font-medium text-sm text-slate-300 hover:text-white py-1.5" to="/pricing">Pricing</router-link>
              </li>
              <li>
                <router-link class="flex font-medium text-sm text-slate-300 hover:text-white py-1.5" to="/customers">Customers</router-link>
              </li>
              <li>
                <router-link class="flex font-medium text-sm text-slate-300 hover:text-white py-1.5" to="/changelog">Changelog</router-link>
              </li>
              <li>
                <router-link class="flex font-medium text-sm text-slate-300 hover:text-white py-1.5" to="/blogs">Blog</router-link>
              </li>
              <li>
                <router-link class="flex font-medium text-sm text-slate-300 hover:text-white py-1.5" to="/help">Help Centre</router-link>
              </li>
              <li>
                <router-link class="flex font-medium text-sm text-slate-300 hover:text-white py-1.5" to="/contact">Contact Us</router-link>
              </li>
            </ul>
          </nav>

        </div>

      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Header',
  setup() {

    const mobileNavOpen = ref(false)
    const mobileNav = ref(null)
    const hamburger = ref(null)

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!mobileNavOpen.value || mobileNav.value.contains(target) || hamburger.value.contains(target)) return
      mobileNavOpen.value = false
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen.value || keyCode !== 27) return
      mobileNavOpen.value = false
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    return {
      mobileNavOpen,
      mobileNav,
      hamburger,
    }
  }
}
</script>