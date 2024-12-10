<template>
  <div
    class="font-display grid min-h-screen grid-rows-[auto,auto,1fr,auto] font-inter antialiased bg-slate-900 text-slate-100 tracking-tight transition-colors">
    <AppHeaderBanner />
    <AppNavbar />
    <slot />
    <AppFooter />
  </div>
</template>

<style lang="postcss"></style>